import mxgraph from '@/utils/mxgraph'

const {
  mxGraph,
  mxImage,
  mxRectangle,
  mxConstants,
  mxPerimeter,
  mxUtils,
  mxCodec,
  mxRubberband,
  mxEvent
} = mxgraph

let MxGraph = mxGraph
let MxImage = mxImage
let MxRectangle = mxRectangle
let MxCodec = mxCodec
let MxRubberband = mxRubberband

class Editor {
  static graph = null;

  static init (container) {
    this.graph = new MxGraph(container)
    // 设置
    this.graph.setEnabled(true) // 是否可以交互
    this.graph.setPanning(true) // 指定是否应启用平移
    this.graph.setTooltips(true) // 指定是否应启用工具提示
    this.graph.panningHandler.useLeftButtonForPanning = true // 指定是否应为鼠标左键激活平移。将此设置为true可能与mxRubberband冲突。默认为false。

    // 设置背景
    this.graph.setBackgroundImage(new MxImage('http://10.12.70.60:8280/zutai/stencils/editor/simulationDiya/byq_S.svg', 600, 600))

    this.graph.maximumGraphBounds = new MxRectangle(0, 0, 600, 600)

    // Resizes the container but never make it bigger than the background
    this.graph.minimumContainerSize = new MxRectangle(0, 0, 600, 600)

    // Changes the default vertex style in-place
    var style = this.graph.getStylesheet().getDefaultVertexStyle()
    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_ROUNDED
    style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter
    style[mxConstants.STYLE_GRADIENTCOLOR] = 'red'
    style[mxConstants.STYLE_PERIMETER_SPACING] = 4
    style[mxConstants.STYLE_SHADOW] = true

    style = this.graph.getStylesheet().getDefaultEdgeStyle()
    style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = 'white'

    style = mxUtils.clone(style)
    style[mxConstants.STYLE_STARTARROW] = mxConstants.ARROW_CLASSIC
    this.graph.getStylesheet().putCellStyle('2way', style)

    this.graph.isHtmlLabel = (cell) => {
      return true
    }

    this.graph.gridSize = 20

    var parent = this.graph.getDefaultParent()
    this.graph.getModel().beginUpdate()
    try {
      var v1 = this.graph.insertVertex(parent, null, 'Hello,', 20, 200, 80, 30)
      var v2 = this.graph.insertVertex(parent, null, 'World', 200, 150, 80, 30)
      var v3 = this.graph.insertVertex(parent, null, 'everyBody!', 300, 350, 60, 60)
      this.graph.insertEdge(parent, null, '', v1, v2)
      this.graph.insertEdge(parent, null, '', v2, v3)
      this.graph.insertEdge(parent, null, '', v1, v3)
    } finally {
      // Updates the display
      this.graph.getModel().endUpdate()
    }

    // 鼠标拖拽选中
    /* eslint-disable no-new */
    new MxRubberband(this.graph)

    // 打包XML文件
    let encoder = new MxCodec()
    let xx = encoder.encode(this.graph.getModel())
    // 保存到getXml参数中
    this.getXml = mxUtils.getXml(xx)
  }

  dropGraph (evt) {
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

  dropSuccessCb (graph, evt, target, x, y) {
    // const cell = new MxCell('什么层', new MxGeometry(0, 0, 120, 40))
    // cell.vertex = true
    // console.log(ele.getAttribute('src'))
    // const cell = new MxCell('鼠标双击输入1', new MxGeometry(0, 0, 100, 135), `node;image=${ele.getAttribute('src')}`)

    // console.log(`node;image=${ele.getAttribute('src')}`)

    // const cell = new MxCell('鼠标双击输入1', new MxGeometry(0, 0, 100, 135), `node;image=${ele.getAttribute('src')}`)
    // cell.vertex = true

    // const title = ele.getAttribute('alt')
    // const titleVertex = this.graph.insertVertex(cell, null, title,
    //   0.1, 0.65, 80, 16,
    //   'constituent=1;whiteSpace=wrap;strokeColor=none;fillColor=none;fontColor=#e6a23c',
    //   true)
    // titleVertex.setConnectable(false)

    // const normalTypeVertex = this.graph.insertVertex(cell, null, null,
    //   0.05, 0.05, 19, 14,
    //   `normalType;constituent=1;fillColor=none;node:image=${ele.getAttribute('src')}`,
    //   true)

    // normalTypeVertex.setConnectable(false)

    // const cells = graph.importCells([cell], x, y, target)
    // if (cells != null && cells.length > 0) {
    //   this.graph.setSelectionCells(cells)
    // }
  }
}

export default Editor
