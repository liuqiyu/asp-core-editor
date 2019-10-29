import mxgraph from '@/utils/mxgraph'
import Tool from './tool'
import MxEvents from './mxEvents'

const {
  mxEditor,
  // mxGraph,
  mxImage,
  // mxRectangle,
  mxUtils,
  mxRubberband,
  mxEvent,
  mxClient,
  mxCell,
  mxGeometry
} = mxgraph

let MxEditor = mxEditor
// let MxGraph = mxGraph
let MxImage = mxImage
// let MxRectangle = mxRectangle
let MxRubberband = mxRubberband
let MxCell = mxCell
let MxGeometry = mxGeometry

class Editor {
  static editor = null
  static graph = null

  static init (container) {
    if (!mxClient.isBrowserSupported()) {
      // 判断是否支持mxgraph
      mxUtils.error('Browser is not supported!', 200, false)
    } else {
      this.editor = new MxEditor()
      this.graph = this.editor.graph
      this.editor.setGraphContainer(container)
      console.log(this.editor)
      // 初始化 tool
      Tool.init(this.editor, this.graph)
      MxEvents.init()

      // 设置
      this.graph.setEnabled(true) // 是否可以交互
      this.graph.setPanning(true) // 指定是否应启用平移
      this.graph.setTooltips(true) // 指定是否应启用工具提示
      this.graph.centerZoom = false
      this.graph.panningHandler.useLeftButtonForPanning = false // 指定是否应为鼠标左键激活平移。将此设置为true可能与mxRubberband冲突。默认为false。

      // this.graph.maximumGraphBounds = new MxRectangle(0, 0, 1720, 929)

      // // Resizes the container but never make it bigger than the background
      // this.graph.minimumContainerSize = new MxRectangle(0, 0, 1720, 929)
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

      return this.graph
    }
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
      const src = 'http://10.12.70.60:8280/zutai/stencils/editor/simulationDiya/byq_S.svg'

      const nodeRootVertex = new MxCell(
        '鼠标双击输入1',
        new MxGeometry(0, 0, 100, 135),
        `symbol;image=${src}`
      )
      nodeRootVertex.vertex = true

      const cells = graph.importCells([nodeRootVertex], x, y, target)
      if (cells != null && cells.length > 0) {
        graph.setSelectionCells(cells)
      }
    }

    mxUtils.makeDraggable(ele, _dropGraph, _dropSuccessCb)
  }
}

export default Editor
