/*
 * @Description:
 * @Author: liuqiyu
 * @Date: 2019-11-11 14:27:27
 * @LastEditors: liuqiyu
 * @LastEditTime: 2019-12-03 19:02:16
 */
import mxgraph from './mxgraph'

const {
  mxUtils,
  mxCodec,
  mxEvent,
  mxUndoManager,
  mxGraphModel,
  mxClipboard,
  mxClient
} = mxgraph

class Tool {
  static editor = null
  static graph = null
  static undoManager = null
  static textInput = null

  // Tool 初始化
  static init (editor, graph) {
    this.editor = editor
    this.graph = graph

    // Undo/Redo
    this.undoManager = new mxUndoManager()
    graph.getModel().addListener(mxEvent.UNDO, this._listener)
    graph.getView().addListener(mxEvent.UNDO, this._listener)

    this._initCopyParse()
  }

  static _listener (sender, evt) {
    Tool.undoManager.undoableEditHappened(evt.getProperty('edit'))
  }

  // 撤销
  static undo () {
    this.undoManager.undo()
  }

  // 重做
  static redo () {
    this.undoManager.redo()
  }

  // 放大
  static zoomIn () {
    // console.log(this.graph.view.scale)
    // Tool.editor.execute('zoomIn')
    this.graph.zoomIn()
  }

  // 缩小
  static zoomOut () {
    // console.log(this.graph.view.scale)
    // Tool.editor.execute('zoomOut')
    this.graph.zoomOut()
  }

  // 1:1还原
  static zoomActual () {
    // console.log(this.graph.view.scale)
    this.graph.zoomActual()
  }

  static pan (status) {
    // pan 拖动
    Tool.graph.panningHandler.isForcePanningEvent = me => {
      Tool.graph.container.style.cursor = status ? 'move' : null
      return status
    }
  }

  // 打包XML文件
  static getXml () {
    // let encoder = new MxCodec()
    // let xx = encoder.encode(this.graph.getModel())
    // // 保存到getXml参数中
    // xx.setAttribute('backgroundImage', this.graph.backgroundImage.src)
    // const getXml = mxUtils.getXml(xx)
    // console.log(getXml)
    var encoder = new mxCodec()
    var node = encoder.encode(this.graph.getModel())
    // node.setAttribute('backgroundImage', this.graph.backgroundImage.src)
    mxUtils.popup(mxUtils.getPrettyXml(node), true)
  }

  static save () {
    let encoder = new mxCodec()
    let xx = encoder.encode(this.graph.getModel())
    // 保存到getXml参数中
    // xx.setAttribute('backgroundImage', this.graph.backgroundImage.src || '')
    const getXml = mxUtils.getXml(xx)
    sessionStorage.setItem('xml', getXml)
  }

  // 删除
  static delete () {
    var cells = Tool.graph.getDeletableCells(Tool.graph.getSelectionCells())
    this.graph.removeCells(cells)
  }

  // 复制
  static copy () {
    mxClipboard.copy(this.graph)
  }

  // 粘贴
  static paste () {
    if (this.graph.isEnabled() && !this.graph.isCellLocked(this.graph.getDefaultParent())) {
      mxClipboard.paste(this.graph)
    }
  }

  // 粘贴到此处
  static pasteHere () {
    var graph = this.graph
    if (graph.isEnabled() && !graph.isCellLocked(graph.getDefaultParent())) {
      graph.getModel().beginUpdate()
      try {
        var cells = mxClipboard.paste(graph)

        if (cells != null) {
          var includeEdges = true

          for (var i = 0; i < cells.length && includeEdges; i++) {
            includeEdges = includeEdges && graph.model.isEdge(cells[i])
          }

          var t = graph.view.translate
          var s = graph.view.scale
          var dx = t.x
          var dy = t.y
          var bb = null

          if (cells.length === 1 && includeEdges) {
            var geo = graph.getCellGeometry(cells[0])

            if (geo != null) {
              bb = geo.getTerminalPoint(true)
            }
          }

          bb = (bb !== null) ? bb : graph.getBoundingBoxFromGeometry(cells, includeEdges)

          if (bb !== null) {
            var x = Math.round(graph.snap(graph.popupMenuHandler.triggerX / s - dx))
            var y = Math.round(graph.snap(graph.popupMenuHandler.triggerY / s - dy))

            graph.cellsMoved(cells, x - bb.x, y - bb.y)
          }
        }
      } finally {
        graph.getModel().endUpdate()
      }
    }
  }

  // 复制剪切粘贴
  static _initCopyParse () {
    mxClipboard.cellsToString = (cells) => {
      var codec = new mxCodec()
      var model = new mxGraphModel()
      var parent = model.getChildAt(model.getRoot(), 0)

      for (var i = 0; i < cells.length; i++) {
        model.add(parent, cells[i])
      }

      return mxUtils.getXml(codec.encode(model))
    }

    // 控件或元键事件期间有焦点但不可见的文本区域
    var textInput = document.createElement('textarea')
    mxUtils.setOpacity(textInput, 0)
    textInput.style.width = '1px'
    textInput.style.height = '1px'
    var restoreFocus = false
    var gs = this.graph.gridSize
    var lastPaste = null
    var dx = 0
    var dy = 0

    // 如果为空，则解决IE/FF中的“无副本”事件
    textInput.value = ''
    var graph = this.graph

    // Shows a textare when control/cmd is pressed to handle native clipboard actions
    mxEvent.addListener(document, 'keydown', function (evt) {
      // No dialog visible
      var source = mxEvent.getSource(evt)

      if (graph.isEnabled() && !graph.isMouseDown && !graph.isEditing() && source.nodeName !== 'INPUT') {
        if (evt.keyCode === 224 /* FF */ || (!mxClient.IS_MAC && evt.keyCode === 17 /* Control */) || (mxClient
          .IS_MAC && evt.keyCode === 91 /* Meta */)) {
          // Cannot use parentNode for check in IE
          if (!restoreFocus) {
            // Avoid autoscroll but allow handling of events
            textInput.style.position = 'absolute'
            textInput.style.left = (graph.container.scrollLeft + 10) + 'px'
            textInput.style.top = (graph.container.scrollTop + 10) + 'px'
            graph.container.appendChild(textInput)

            restoreFocus = true
            textInput.focus()
            textInput.select()
          }
        }
      }
    })

    // Restores focus on graph container and removes text input from DOM
    mxEvent.addListener(document, 'keyup', function (evt) {
      if (restoreFocus && (evt.keyCode === 224 /* FF */ || evt.keyCode === 17 /* Control */ ||
        evt.keyCode === 91 /* Meta */)) {
        restoreFocus = false

        if (!graph.isEditing()) {
          graph.container.focus()
        }

        textInput.parentNode.removeChild(textInput)
      }
    })

    var copyCells = function (graph, cells) {
      if (cells.length > 0) {
        var clones = graph.cloneCells(cells)

        // Checks for orphaned relative children and makes absolute
        for (var i = 0; i < clones.length; i++) {
          var state = graph.view.getState(cells[i])

          if (state !== null) {
            var geo = graph.getCellGeometry(clones[i])

            if (geo !== null && geo.relative) {
              geo.relative = false
              geo.x = state.x / state.view.scale - state.view.translate.x
              geo.y = state.y / state.view.scale - state.view.translate.y
            }
          }
        }

        textInput.value = mxClipboard.cellsToString(clones)
      }

      textInput.select()
      lastPaste = textInput.value
    }

    // Handles copy event by putting XML for current selection into text input
    mxEvent.addListener(textInput, 'copy', mxUtils.bind(this, function (evt) {
      if (graph.isEnabled() && !graph.isSelectionEmpty()) {
        copyCells(graph, mxUtils.sortCells(graph.model.getTopmostCells(graph.getSelectionCells())))
        dx = 0
        dy = 0
      }
    }))

    // Handles cut event by removing cells putting XML into text input
    mxEvent.addListener(textInput, 'cut', mxUtils.bind(this, function (evt) {
      if (graph.isEnabled() && !graph.isSelectionEmpty()) {
        copyCells(graph, graph.removeCells())
        dx = -gs
        dy = -gs
      }
    }))

    // Merges XML into existing graph and layers
    var importXml = function (xml, dx, dy) {
      dx = (dx != null) ? dx : 0
      dy = (dy != null) ? dy : 0
      var cells = []

      try {
        var doc = mxUtils.parseXml(xml)
        var node = doc.documentElement

        if (node != null) {
          var model = new mxGraphModel()
          var codec = new mxCodec(node.ownerDocument)
          codec.decode(node, model)

          var childCount = model.getChildCount(model.getRoot())
          var targetChildCount = graph.model.getChildCount(graph.model.getRoot())

          // Merges existing layers and adds new layers
          graph.model.beginUpdate()
          var children
          try {
            for (var i = 0; i < childCount; i++) {
              var parent = model.getChildAt(model.getRoot(), i)

              // Adds cells to existing layers if not locked
              if (targetChildCount > i) {
                // Inserts into active layer if only one layer is being pasted
                var target = (childCount === 1) ? graph.getDefaultParent() : graph.model.getChildAt(graph.model
                  .getRoot(), i)

                if (!graph.isCellLocked(target)) {
                  children = model.getChildren(parent)
                  cells = cells.concat(graph.importCells(children, dx, dy, target))
                }
              } else {
                // Delta is non cascading, needs separate move for layers
                parent = graph.importCells([parent], 0, 0, graph.model.getRoot())[0]
                children = graph.model.getChildren(parent)
                graph.moveCells(children, dx, dy)
                cells = cells.concat(children)
              }
            }
          } finally {
            graph.model.endUpdate()
          }
        }
      } catch (e) {
        alert(e)
        throw e
      }

      return cells
    }

    // Parses and inserts XML into graph
    var pasteText = function (text) {
      var xml = mxUtils.trim(text)
      // var x = graph.container.scrollLeft / graph.view.scale - graph.view.translate.x
      // var y = graph.container.scrollTop / graph.view.scale - graph.view.translate.y

      if (xml.length > 0) {
        if (lastPaste !== xml) {
          lastPaste = xml
          dx = 0
          dy = 0
        } else {
          dx += gs
          dy += gs
        }

        // Standard paste via control-v
        if (xml.substring(0, 14) === '<mxGraphModel>') {
          graph.setSelectionCells(importXml(xml, dx, dy))
          graph.scrollCellToVisible(graph.getSelectionCell())
        }
      }
    }

    // Cross-browser function to fetch text from paste events
    var extractGraphModelFromEvent = function (evt) {
      var data = null

      if (evt != null) {
        var provider = (evt.dataTransfer != null) ? evt.dataTransfer : evt.clipboardData
        console.log(evt)
        if (provider != null) {
          if (document.documentMode === 10 || document.documentMode === 11) {
            data = provider.getData('Text')
          } else {
            data = (mxUtils.indexOf(provider.types, 'text/html') >= 0) ? provider.getData('text/html') : null

            if (mxUtils.indexOf(provider.types, 'text/plain' && (data == null || data.length === 0))) {
              data = provider.getData('text/plain')
            }
          }
        }
      }

      return data
    }

    // Handles paste event by parsing and inserting XML
    mxEvent.addListener(textInput, 'paste', function (evt) {
      // Clears existing contents before paste - should not be needed
      // because all text is selected, but doesn't hurt since the
      // actual pasting of the new text is delayed in all cases.
      textInput.value = ''

      if (graph.isEnabled()) {
        var xml = extractGraphModelFromEvent(evt)

        if (xml != null && xml.length > 0) {
          pasteText(xml)
        } else {
          // Timeout for new value to appear
          window.setTimeout(mxUtils.bind(this, function () {
            pasteText(textInput.value)
          }), 0)
        }
      }

      textInput.select()
    })
  }
}

export default Tool
