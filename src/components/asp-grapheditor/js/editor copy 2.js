import mxgraph from './mxgraph'
import Toolbar from './toolbar'
import Format from './format'
import Actions from './actions'
import PopupMenu from './popupMenu'
import MxEvents from './mxEvents'

const {
  mxEditor,
  // mxImage,
  mxUtils,
  mxRubberband,
  mxEvent,
  mxClient,
  mxCell,
  mxGeometry,
  mxGraphHandler,
  mxConstants,
  mxEdgeHandler,
  mxCodec,
  mxConnectionConstraint,
  mxPoint,
  mxCellState
  // mxPerimeter,
  // mxEdgeStyle
} = mxgraph

function Editor (container) {
  this.editor = null
  this.graph = null
  this.init()
}

Editor.prototype.init = function (container) {
  var self = this
  if (!mxClient.isBrowserSupported()) {
    // 判断是否支持mxgraph
    mxUtils.error('Browser is not supported!', 200, false)
  } else {
    // 功能：指南
    // 启用指南
    mxGraphHandler.prototype.guidesEnabled = true
    // Alt禁用参考线
    mxGraphHandler.prototype.useGuidesForEvent = function (me) {
      return !mxEvent.isAltDown(me.getEvent())
    }
    // 将参考线定义为红色（默认）
    mxConstants.GUIDE_COLOR = '#46BAFE'
    // 将参考线定义为1像素（默认值）
    mxConstants.GUIDE_STROKEWIDTH = 1
    // 启用将航路点捕捉到终端
    mxEdgeHandler.prototype.snapToTerminals = true

    // 初始化
    this.editor = new mxEditor()
    this.graph = this.editor.graph
    this.editor.setGraphContainer(container)

    // this.graph.setConnectable(true) // 指定图是否应允许新连接
    this.graph.setMultigraph(true) // 指定图是否应允许同一对顶点之间存在多个连接

    // 键盘快捷键
    const config = mxUtils
      .load('static/keyhandler-commons.xml')
      .getDocumentElement()
    this.editor.configure(config)

    const node = mxUtils.load('static/default.xml').getDocumentElement()
    if (node != null) {
      var dec = new mxCodec(node.ownerDocument)
      dec.decode(node, this.graph.getStylesheet())
    }

    // 初始化
    Toolbar.init(this.editor, this.graph)
    Format.init(this.editor, this.graph)
    Actions.init(this.editor, this.graph)
    PopupMenu.init(this.editor, this.graph, container)
    MxEvents.init()

    // hover 锚点
    this.graph.getAllConnectionConstraints = function (terminal) {
      if (terminal != null && this.model.isVertex(terminal.cell)) {
        return [
          new mxConnectionConstraint(new mxPoint(0, 0), true),
          new mxConnectionConstraint(new mxPoint(0.5, 0), true),
          new mxConnectionConstraint(new mxPoint(1, 0), true),
          new mxConnectionConstraint(new mxPoint(0, 0.5), true),
          new mxConnectionConstraint(new mxPoint(1, 0.5), true),
          new mxConnectionConstraint(new mxPoint(0, 1), true),
          new mxConnectionConstraint(new mxPoint(0.5, 1), true),
          new mxConnectionConstraint(new mxPoint(1, 1), true)
        ]
      }

      return null
    }

    // 连线类型
    // Connect preview
    this.graph.connectionHandler.createEdgeState = function (me) {
      var edge = self.graph.createEdge(
        null,
        null,
        null,
        null,
        null,
        'edgeStyle=orthogonalEdgeStyle'
      )
      return new mxCellState(
        this.graph.view,
        edge,
        this.graph.getCellStyle(edge)
      )
    }

    var parent = this.graph.getDefaultParent()
    this.graph.getModel().beginUpdate()
    try {
      // 创建空的画布
      // this.graph.insertVertex(parent, null)
      var v1 = this.graph.insertVertex(
        parent,
        null,
        'World',
        200,
        150,
        80,
        30
      )
      v1.lod = 3
      // 设置背景
      // this.graph.setBackgroundImage(
      //   new mxImage('' + 'static/level-1.svg', 1024, 769)
      // )
      this.graph.view.validateBackgroundImage()
    } finally {
      // Updates the display
      this.graph.getModel().endUpdate()
    }

    // 鼠标拖拽选中
    /* eslint-disable no-new */
    new mxRubberband(this.graph)
    return this.graph
  }
}

Editor.prototype.getGraph = function () {
  return this.graph
}

// 元件初始化
Editor.prototype.addToolbarItem = function (ele) {
  const dataset = ele.dataset
  const src = dataset.src
  const width = Number(dataset.width)
  const height = Number(dataset.height)
  const style = dataset.style
  const value = dataset.value

  const _dropGraph = evt => {
    const x = mxEvent.getClientX(evt)
    const y = mxEvent.getClientY(evt)
    // 获取 x,y 所在的元素
    const elt = document.elementFromPoint(x, y)
    // 如果鼠标落在graph容器
    if (mxUtils.isAncestorNode(this.graph.container, elt)) {
      return this.graph
    }
    // 鼠标落在其他地方
    return null
  }

  const _dropSuccessCb = (graph, evt, target, x, y) => {
    var cell = new mxCell(value, new mxGeometry(0, 0, width, height), style)
    cell.vertex = true
    var cells = graph.importCells([cell], x, y, target)

    if (cells != null && cells.length > 0) {
      graph.scrollCellToVisible(cells[0])
      graph.setSelectionCells(cells)
    }
  }

  const dragElt = document.createElement('img')
  dragElt.setAttribute('src', src)
  dragElt.setAttribute('style', `width:${width}px;height:${height}px;`)

  mxUtils.makeDraggable(
    ele,
    _dropGraph,
    _dropSuccessCb,
    dragElt,
    null,
    null,
    null,
    true
  )
}

// 元件选中
Editor.prototype.addToolbarItem = function () {
  var cell = this.graph.getSelectionCell()
  if (cell) {
    Format.initFormatField(cell)
  }
}

// 等距分布
Editor.prototype.distributeCells = function (horizontal, cells) {
  if (cells == null) {
    cells = this.graph.getSelectionCells()
  }

  if (cells != null && cells.length > 1) {
    var vertices = []
    var max = null
    var min = null

    for (var i = 0; i < cells.length; i++) {
      if (this.graph.getModel().isVertex(cells[i])) {
        var state = this.graph.view.getState(cells[i])

        if (state != null) {
          var tmp = (horizontal) ? state.getCenterX() : state.getCenterY()
          max = (max != null) ? Math.max(max, tmp) : tmp
          min = (min != null) ? Math.min(min, tmp) : tmp

          vertices.push(state)
        }
      }
    }

    if (vertices.length > 2) {
      vertices.sort(function (a, b) {
        return (horizontal) ? a.x - b.x : a.y - b.y
      })

      var t = this.graph.view.translate
      var s = this.graph.view.scale

      min = min / s - ((horizontal) ? t.x : t.y)
      max = max / s - ((horizontal) ? t.x : t.y)

      this.graph.getModel().beginUpdate()
      try {
        var dt = (max - min) / (vertices.length - 1)
        var t0 = min

        for (let i = 1; i < vertices.length - 1; i++) {
          var pstate = this.graph.view.getState(this.graph.model.getParent(vertices[i].cell))
          var geo = this.graph.getCellGeometry(vertices[i].cell)
          t0 += dt

          if (geo != null && pstate != null) {
            geo = geo.clone()

            if (horizontal) {
              geo.x = Math.round(t0 - geo.width / 2) - pstate.origin.x
            } else {
              geo.y = Math.round(t0 - geo.height / 2) - pstate.origin.y
            }

            this.graph.getModel().setGeometry(vertices[i].cell, geo)
          }
        }
      } finally {
        this.graph.getModel().endUpdate()
      }
    }
  }

  return cells
}

export default Editor
