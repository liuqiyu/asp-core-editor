import mxgraph from '@/utils/mxgraph'

const {
  mxGraph,
  mxImage,
  mxRectangle,
  mxUtils,
  mxCodec,
  mxRubberband,
  mxEvent,
  mxClient,
  mxOutline,
  mxUndoManager,
  mxCell,
  mxGeometry
} = mxgraph

let MxGraph = mxGraph
let MxImage = mxImage
let MxRectangle = mxRectangle
let MxCodec = mxCodec
let MxRubberband = mxRubberband
let MxOutline = mxOutline
let MxUndoManager = mxUndoManager
let MxCell = mxCell
let MxGeometry = mxGeometry

class Editor {
  static graph = null;
  static undoManager = null

  static init (container) {
    if (!mxClient.isBrowserSupported()) {
      // 判断是否支持mxgraph
      mxUtils.error('Browser is not supported!', 200, false)
    } else {
      this.graph = new MxGraph(container)
      // 设置
      this.graph.setEnabled(true) // 是否可以交互
      this.graph.setPanning(true) // 指定是否应启用平移
      this.graph.setTooltips(true) // 指定是否应启用工具提示
      this.graph.panningHandler.useLeftButtonForPanning = false // 指定是否应为鼠标左键激活平移。将此设置为true可能与mxRubberband冲突。默认为false。

      this.graph.maximumGraphBounds = new MxRectangle(0, 0, 600, 600)

      // Resizes the container but never make it bigger than the background
      this.graph.minimumContainerSize = new MxRectangle(0, 0, 600, 600)
      // this.graph.setResizeContainer(true)

      // this.graph.gridSize = 20

      var parent = this.graph.getDefaultParent()
      this.graph.getModel().beginUpdate()
      try {
        // 创建空的画布
        this.graph.insertVertex(parent, null)
        this.graph.insertVertex(parent, null, 'World', 200, 150, 80, 30)
        // 设置背景
        this.graph.setBackgroundImage(new MxImage('http://10.12.70.60:8280/zutai/stencils/editor/simulationDiya/byq_S.svg', 600, 600))
        // this.graph.view.validateBackgroundImage()
      } finally {
        // Updates the display
        this.graph.getModel().endUpdate()
      }

      // 鼠标拖拽选中
      /* eslint-disable no-new */
      new MxRubberband(this.graph)

      this.undoManager = new MxUndoManager()

      // this.graph.getModel().addListener(mxEvent.UNDO, this._listener)
      // this.graph.getView().addListener(mxEvent.UNDO, this._listener)

      // 监听鼠标滚动事件
      mxEvent.addMouseWheelListener((evt, up) => {
        if (!mxEvent.isConsumed(evt)) {
          if (up) {
            this.zoomIn()
          } else {
            this.zoomOut()
          }

          mxEvent.consume(evt, false, false) // 消耗给定的事件
        }
      })
    }
  }

  _listener (sender, evt) {
    this.undoManager.undoableEditHappened(evt.getProperty('edit'))
  }

  // 打包XML文件
  static getXml () {
    let encoder = new MxCodec()
    let xx = encoder.encode(this.graph.getModel())
    // 保存到getXml参数中
    xx.setAttribute('backgroundImage', this.graph.backgroundImage.src)
    const getXml = mxUtils.getXml(xx)
    console.log(getXml)
  }

  // 缩略图
  static outLine (outlineContainer) {
    new MxOutline(this.graph, outlineContainer)
  }

  // 放大
  static zoomIn () {
    console.log(this.graph.view.scale)
    this.graph.zoomIn()
  }

  // 缩小
  static zoomOut () {
    console.log(this.graph.view.scale)
    this.graph.zoomOut()
  }

  // 撤销
  static undo () {
    this.undoManager.undo()
  }

  // 重做
  static redo () {
    this.undoManager.redo()
  }

  static addToolbarItem (ele) {
    const _dropGraph = (evt) => {
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
      // const cell = new MxCell('什么层', new MxGeometry(0, 0, 120, 40))
      // cell.vertex = true
      console.log(ele.getAttribute('src'))
      // const cell = new MxCell('鼠标双击输入1', new MxGeometry(0, 0, 100, 135), `node;image=${ele.getAttribute('src')}`)

      console.log(`node;image=${ele.getAttribute('src')}`)

      const cell = new MxCell('鼠标双击输入1', new MxGeometry(0, 0, 100, 135), `node;image=${ele.getAttribute('src')}`)
      cell.vertex = true

      const title = ele.getAttribute('alt')
      const titleVertex = this.graph.insertVertex(cell, null, title,
        0.1, 0.65, 80, 16,
        'constituent=1;whiteSpace=wrap;strokeColor=none;fillColor=none;fontColor=#e6a23c',
        true)
      titleVertex.setConnectable(false)

      const normalTypeVertex = this.graph.insertVertex(cell, null, null,
        0.05, 0.05, 19, 14,
        `normalType;constituent=1;fillColor=none;node:image=${ele.getAttribute('src')}`,
        true)

      normalTypeVertex.setConnectable(false)

      const cells = graph.importCells([cell], x, y, target)
      if (cells != null && cells.length > 0) {
        this.graph.setSelectionCells(cells)
      }
    }

    mxUtils.makeDraggable(ele, _dropGraph, _dropSuccessCb)
  }
}

export default Editor
