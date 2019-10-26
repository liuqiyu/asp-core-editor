import mxgraph from '@/utils/mxgraph'
import Tool from './tool'
import MxEvents from './mxEvents'

const {
  mxGraph,
  mxImage,
  mxRectangle,
  mxUtils,
  mxRubberband,
  mxEvent,
  mxClient,
  mxUndoManager,
  mxCell,
  mxGeometry
} = mxgraph

let MxGraph = mxGraph
let MxImage = mxImage
let MxRectangle = mxRectangle
let MxRubberband = mxRubberband
let MxUndoManager = mxUndoManager
let MxCell = mxCell
let MxGeometry = mxGeometry

class Editor {
  static graph = null
  static undoManager = null

  static init (container) {
    if (!mxClient.isBrowserSupported()) {
      // 判断是否支持mxgraph
      mxUtils.error('Browser is not supported!', 200, false)
    } else {
      this.graph = new MxGraph(container)

      // 初始化 tool
      Tool.init(this.graph)
      MxEvents.init()

      // 设置
      this.graph.setEnabled(true) // 是否可以交互
      this.graph.setPanning(true) // 指定是否应启用平移
      this.graph.setTooltips(true) // 指定是否应启用工具提示
      this.graph.centerZoom = false
      this.graph.panningHandler.useLeftButtonForPanning = false // 指定是否应为鼠标左键激活平移。将此设置为true可能与mxRubberband冲突。默认为false。

      this.graph.maximumGraphBounds = new MxRectangle(0, 0, 600, 600)

      // Resizes the container but never make it bigger than the background
      this.graph.minimumContainerSize = new MxRectangle(0, 0, 600, 600)
      // this.graph.setResizeContainer(true)

      // this.graph.gridSize = 20

      this.graph.isCellVisible = cell => {
        return cell.lod == null || cell.lod / 2 < this.graph.view.scale
      }

      var parent = this.graph.getDefaultParent()
      this.graph.getModel().beginUpdate()
      try {
        // 创建空的画布
        this.graph.insertVertex(parent, null)
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
        this.graph.setBackgroundImage(
          new MxImage(
            'http://10.12.70.60:8280/zutai/stencils/editor/simulationDiya/byq_S.svg',
            600,
            600
          )
        )
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

      return this.graph
    }
  }

  _listener (sender, evt) {
    this.undoManager.undoableEditHappened(evt.getProperty('edit'))
  }

  static addToolbarItem (ele) {
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
      // const cell = new MxCell('什么层', new MxGeometry(0, 0, 120, 40))
      // cell.vertex = true
      console.log(ele.getAttribute('src'))
      // const cell = new MxCell('鼠标双击输入1', new MxGeometry(0, 0, 100, 135), `node;image=${ele.getAttribute('src')}`)

      console.log(`node;image=${ele.getAttribute('src')}`)

      const cell = new MxCell(
        '鼠标双击输入1',
        new MxGeometry(0, 0, 100, 135),
        `node;image=${ele.getAttribute('src')}`
      )
      cell.vertex = true

      const title = ele.getAttribute('alt')
      const titleVertex = this.graph.insertVertex(
        cell,
        null,
        title,
        0.1,
        0.65,
        80,
        16,
        'constituent=1;whiteSpace=wrap;strokeColor=none;fillColor=none;fontColor=#e6a23c',
        true
      )
      titleVertex.setConnectable(false)

      const normalTypeVertex = this.graph.insertVertex(
        cell,
        null,
        null,
        0.05,
        0.05,
        19,
        14,
        `normalType;constituent=1;fillColor=none;node:image=${ele.getAttribute(
          'src'
        )}`,
        true
      )

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
