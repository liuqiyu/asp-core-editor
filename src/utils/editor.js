import mxgraph from '@/utils/mxgraph'
import Tool from './tool'
import Format from './format'
import MxEvents from './mxEvents'

const {
  mxEditor,
  // mxGraph,
  mxImage,
  // mxRectangle,
  mxUtils,
  mxRubberband,
  mxEvent,
  mxClient
  // mxCell,
  // mxGeometry
} = mxgraph

let MxEditor = mxEditor
// let MxGraph = mxGraph
let MxImage = mxImage
// let MxRectangle = mxRectangle
let MxRubberband = mxRubberband
// let MxCell = mxCell
// let MxGeometry = mxGeometry

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

      // pan 拖动
      this.graph.panningHandler.isForcePanningEvent = (me) => {
        this.graph.container.style.cursor = 'move'
        return true
      }

      // 键盘快捷键
      const config = mxUtils.load('' +
          'static/keyhandler-commons.xml')
        .getDocumentElement()
      this.editor.configure(config)
      console.log(config)

      // 初始化 tool
      Tool.init(this.editor, this.graph)
      Format.init(this.editor, this.graph)
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
        this.graph.setBackgroundImage(
          new MxImage(
            '' + 'static/level-1.svg',
            1024,
            769
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

  // 元件初始化
  static addToolbarItem (ele) {
    const dataset = ele.dataset
    const src = dataset.src
    const width = dataset.width
    const height = dataset.height

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
          vertex = graph.insertVertex(parent, null, '', x, y, width, height, 'shape=image;image=' + src + ';')
        } finally {
          graph.getModel().endUpdate()
        }

        graph.setSelectionCell(vertex)
      }
    }

    const dragElt = document.createElement('img')
    dragElt.setAttribute('src', src)
    dragElt.setAttribute('style', `width:${width}px;height:${height}px;`)

    mxUtils.makeDraggable(ele, _dropGraph, _dropSuccessCb, dragElt,
      null, null, null, true)
  }
}

export default Editor
