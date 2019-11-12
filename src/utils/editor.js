import mxgraph from '@/utils/mxgraph'
import Tool from './tool'
import Format from './format'
import PopupMenu from './popupMenu'
import MxEvents from './mxEvents'

const {
  mxEditor,
  // mxImage,
  mxUtils,
  mxRubberband,
  mxEvent,
  mxClient,
  // mxCell,
  // mxGeometry,
  mxGraphHandler,
  mxConstants,
  mxEdgeHandler,
  mxPerimeter,
  mxEdgeStyle
} = mxgraph

class Editor {
  static editor = null
  static graph = null

  static init (container) {
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

      this.graph.setConnectable(true) // 指定图是否应允许新连接
      this.graph.setMultigraph(false) // 指定图是否应允许同一对顶点之间存在多个连接

      // pan 拖动
      // this.graph.panningHandler.isForcePanningEvent = me => {
      //   this.graph.container.style.cursor = 'move'
      //   return true
      // }

      // 键盘快捷键
      const config = mxUtils.load('static/keyhandler-commons.xml').getDocumentElement()
      this.editor.configure(config)

      // 初始化 tool
      Tool.init(this.editor, this.graph)
      Format.init(this.editor, this.graph)
      PopupMenu.init(this.editor, this.graph, container)
      MxEvents.init()

      // 设置
      // this.graph.setEnabled(true) // 是否可以交互
      // this.graph.setPanning(true) // 指定是否应启用平移
      // this.graph.setTooltips(true) // 指定是否应启用工具提示
      // this.graph.centerZoom = false
      // this.graph.panningHandler.useLeftButtonForPanning = false // 指定是否应为鼠标左键激活平移。将此设置为true可能与mxRubberband冲突。默认为false。

      // this.graph.maximumGraphBounds = new mxRectangle(0, 0, 1720, 929)

      // // Resizes the container but never make it bigger than the background
      // this.graph.minimumContainerSize = new MxRectangle(0, 0, 1720, 929)
      // this.graph.setResizeContainer(true)

      // this.graph.gridSize = 20

      // this.graph.isCellVisible = cell => {
      //   return cell.lod == null || cell.lod / 2 < this.graph.view.scale
      // }
      var style = []
      style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RECTANGLE
      style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter
      style[mxConstants.STYLE_STROKECOLOR] = 'gray'
      style[mxConstants.STYLE_ROUNDED] = true
      style[mxConstants.STYLE_FILLCOLOR] = '#EEEEEE'
      style[mxConstants.STYLE_GRADIENTCOLOR] = 'white'
      style[mxConstants.STYLE_FONTCOLOR] = '#774400'
      style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER
      style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE
      style[mxConstants.STYLE_FONTSIZE] = '28'
      style[mxConstants.STYLE_FONTSTYLE] = 1
      this.graph.getStylesheet().putDefaultVertexStyle(style)

      // Creates the default style for edges
      style = []
      style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_CONNECTOR
      style[mxConstants.STYLE_STROKECOLOR] = '#6482B9'
      style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER
      style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE
      style[mxConstants.STYLE_EDGE] = mxEdgeStyle.ElbowConnector
      style[mxConstants.STYLE_ENDARROW] = mxConstants.ARROW_CLASSIC
      style[mxConstants.STYLE_FONTSIZE] = '120'
      this.graph.getStylesheet().putDefaultEdgeStyle(style)

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
        // this.graph.view.validateBackgroundImage()
      } finally {
        // Updates the display
        this.graph.getModel().endUpdate()
      }

      // 鼠标拖拽选中
      /* eslint-disable no-new */
      new mxRubberband(this.graph)

      // this.graph.getSelectionModel().addListener(mxEvent.CHANGE, (sender, evt) => {
      //   this.selectionChanged()
      // })

      // this.selectionChanged()

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
    const width = dataset.width
    const height = dataset.height
    const style = dataset.style

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

    const _dropSuccessCb = (graph, evt, cell, x, y) => {
      if (graph.canImportCell(cell)) {
        var parent = graph.getDefaultParent()
        var vertex = null

        graph.getModel().beginUpdate()
        try {
          vertex = graph.insertVertex(
            parent,
            null,
            '123',
            x,
            y,
            width,
            height,
            style
          )
          // vertex = new mxCell('Test', new mxGeometry(0, 0, 120, 40))
          vertex.vertex = true
          // graph.importCells([vertex], x, y, cell)
          // vertex = graph.insertVertex(parent, null, 'World', 200, 150, 80, 30)
        } finally {
          graph.getModel().endUpdate()
        }

        // graph.setSelectionCell(vertex)
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
}

export default Editor
