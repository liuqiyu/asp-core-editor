import mxgraph from './mxgraph'
import Toolbar from './toolbar'
import Format from './format'
import Actions from './actions'
import PopupMenu from './popupMenu'
import MxEvents from './mxEvents'
import Graph from './graph'

const {
  mxEditor,
  // mxImage,
  mxUtils,
  mxRubberband,
  mxEvent,
  mxClient,
  mxCell,
  mxGeometry,
  // mxConstants,
  // mxEdgeStyle,
  // mxGraphHandler,
  // mxConstants,
  // mxEdgeHandler,
  mxCodec,
  mxPoint
  // mxVertexHandler
  // mxPerimeter,
  // mxEdgeStyle
} = mxgraph

class Editor {
  static editor = null;
  static graph = null;
  static graphInit = null;

  static init (container) {
    // var _this = this
    if (!mxClient.isBrowserSupported()) {
      // 判断是否支持mxgraph
      mxUtils.error('Browser is not supported!', 200, false)
    } else {
      // 初始化
      this.editor = new mxEditor()
      this.graph = this.editor.graph
      this.editor.setGraphContainer(container)

      this.graph.setConnectable(true) // 指定图是否应允许新连接
      this.graph.setMultigraph(true) // 指定图是否应允许同一对顶点之间存在多个连接
      this.graph.setGridEnabled(false)

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
      this.graphInit = new Graph(this.graph)
      console.log(this.graphInit)

      // 设置默认连线样式
      // this.graph.getStylesheet().getDefaultEdgeStyle()['edgeStyle'] = 'orthogonalEdgeStyle'
      // this.graph.getStylesheet().getDefaultEdgeStyle()['rounded'] = '0'
      // this.graph.getStylesheet().getDefaultEdgeStyle()['jettySize'] = 'auto'
      // this.graph.getStylesheet().getDefaultEdgeStyle()['orthogonalLoop'] = '1'

      // this.graph.alternateEdgeStyle = this.graph.currentEdgeStyle

      // var parent = this.graph.getDefaultParent()
      // this.graph.getModel().beginUpdate()
      // try {
      //   // 创建空的画布
      //   // this.graph.insertVertex(parent, null)
      //   // var v1 = this.graph.insertVertex(
      //   //   parent,
      //   //   null,
      //   //   'World',
      //   //   200,
      //   //   150,
      //   //   80,
      //   //   30
      //   // )
      //   // v1.lod = 3
      //   // // 设置背景
      //   // // this.graph.setBackgroundImage(
      //   // //   new mxImage('' + 'static/level-1.svg', 1024, 769)
      //   // // )
      //   this.graph.view.validateBackgroundImage()
      // } finally {
      //   // Updates the display
      //   this.graph.getModel().endUpdate()
      // }

      // 鼠标拖拽选中
      /* eslint-disable no-new */
      new mxRubberband(this.graph)
      return this.graph
    }
  }

  static getGraph () {
    return this.graph
  }

  // 元件初始化
  static addToolbarItem (ele) {
    const dataset = ele.dataset
    const src = dataset.src
    const width = Number(dataset.width)
    const height = Number(dataset.height)
    const style = dataset.style
    const value = dataset.value || ''
    const type = dataset.type

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
      var cell = null
      if (type === 'edge') {
        cell = new mxCell('', new mxGeometry(0, 0, width, height), style)
        cell.geometry.setTerminalPoint(new mxPoint(0, height), true)
        cell.geometry.setTerminalPoint(new mxPoint(width, 0), false)
        cell.geometry.relative = true
        cell.edge = true
      } else if (type === 'curve') {
        cell = new mxCell('', new mxGeometry(0, 0, 50, 50), 'curved=1;endArrow=classic;html=1;')
        cell.geometry.setTerminalPoint(new mxPoint(0, 50), true)
        cell.geometry.setTerminalPoint(new mxPoint(50, 0), false)
        cell.geometry.points = [new mxPoint(50, 50), new mxPoint(0, 0)]
        cell.geometry.relative = true
        cell.edge = true
      } else {
        cell = new mxCell(value, new mxGeometry(0, 0, width, height), style)
        cell.vertex = true
      }
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
  static selectionChanged () {
    var cell = this.graph.getSelectionCell()
    if (cell) {
      Format.initFormatField(cell)
    }
  }

  // 等距分布
  static distributeCells (horizontal, cells) {
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
            var tmp = horizontal ? state.getCenterX() : state.getCenterY()
            max = max != null ? Math.max(max, tmp) : tmp
            min = min != null ? Math.min(min, tmp) : tmp

            vertices.push(state)
          }
        }
      }

      if (vertices.length > 2) {
        vertices.sort(function (a, b) {
          return horizontal ? a.x - b.x : a.y - b.y
        })

        var t = this.graph.view.translate
        var s = this.graph.view.scale

        min = min / s - (horizontal ? t.x : t.y)
        max = max / s - (horizontal ? t.x : t.y)

        this.graph.getModel().beginUpdate()
        try {
          var dt = (max - min) / (vertices.length - 1)
          var t0 = min

          for (let i = 1; i < vertices.length - 1; i++) {
            var pstate = this.graph.view.getState(
              this.graph.model.getParent(vertices[i].cell)
            )
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
}

export default Editor
