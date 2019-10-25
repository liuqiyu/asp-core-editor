<template>
  <div id="graph-wrapper">
    <div id="graph-sidebar">
      <img src="./../images/bhd_D.svg"
           alt="哈哈哈"
           class="drap">
    </div>
    <div :graph="graph"
         id="graph-map">
      <!-- <div id="graph-tool">
        <el-button @click="zoomIn"
                   type="text"
                   icon="iconfont iconiconset0158"></el-button>
        <el-button @click="zoomOut"
                   type="text"
                   icon="iconfont iconsuoxiao"></el-button>
        <el-button @click="handleUndo"
                   type="text"
                   icon="iconfont iconundo"></el-button>
        <el-button @click="handleRedo"
                   type="text"
                   icon="iconfont iconredo"></el-button>
      </div> -->

      <Tool :graph="graph"
            id="graph-tool"></Tool>

      <div id="graph-content">
        <div id="graph-container">
        </div>
        <div id="outlineContainer"
             ref="outlineContainer"
             style="z-index:1;position:absolute;overflow:hidden;top:0px;right:0px;width:220px;height:160px;background:transparent;border: 3px solid black;">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tool from './tool'
import mxgraph from './../utils/mxgraph'
import editor from '@/utils/init'

const { mxGraph, mxClient, mxCodec, mxUtils, mxEvent, mxCell, mxGeometry,
  mxRubberband, mxImage, mxRectangle, mxConstants,
  mxPerimeter, mxOutline, mxDivResizer, mxUndoManager } = mxgraph

Object.assign(mxEvent, {
  NORMAL_TYPE_CLICKED: 'NORMAL_TYPE_CLICKED'
})

let MxCell = mxCell
let MxGeometry = mxGeometry
let MxRubberband = mxRubberband
let MxImage = mxImage
let MxRectangle = mxRectangle
let MxGraph = mxGraph
let MxCodec = mxCodec
let MxOutline = mxOutline
let MxDivResizer = mxDivResizer
let MxUndoManager = mxUndoManager
export default {
  data () {
    return {
      graph: null
    }
  },
  components: {
    Tool
  },
  mounted () {
    if (!mxClient.isBrowserSupported()) {
      // 判断是否支持mxgraph
      mxUtils.error('Browser is not supported!', 200, false)
    } else {
      // 再容器中创建图表
      let container = document.getElementById('graph-container')

      this.graph = new MxGraph(container)
      editor.init(container)

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
      // this.graph.setResizeContainer(true) // 取消自适应屏幕

      const outlineContainer = this.$refs.outlineContainer

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

      // 生成 Hello world!
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

      const ele = document.querySelector('.drap')
      const dragElt = document.createElement('img')
      console.log(dragElt)
      dragElt.setAttribute('src', ele.getAttribute('src'))
      dragElt.setAttribute('style', 'width:120px;height:120px;')

      // 判断drop是否有效
      const dropGraph = (evt) => {
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
      // drop成功后新建一个节点
      const dropSuccessCb = (graph, evt, target, x, y) => {
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

      mxUtils.makeDraggable(ele, dropGraph, dropSuccessCb, dragElt,
        null, null, null, true)

      // j监听鼠标滚动事件
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

      if (mxClient.IS_QUIRKS) {
        document.body.style.overflow = 'hidden'
        /* eslint-disable no-new */
        new MxDivResizer(outlineContainer)
      }
      /* eslint-disable no-new */
      new MxOutline(this.graph, outlineContainer)

      this.undoManager = new MxUndoManager()

      var listener = (sender, evt) => {
        this.undoManager.undoableEditHappened(evt.getProperty('edit'))
      }
      this.graph.getModel().addListener(mxEvent.UNDO, listener)
      this.graph.getView().addListener(mxEvent.UNDO, listener)
    }
  },
  methods: {
    read (filename) {
      var req = mxUtils.load(filename)
      var root = req.getDocumentElement()
      var dec = new MxCodec(root.ownerDocument)
      console.log(req)
      console.log(root)
      console.log(dec)
      dec.decode(root, this.graph.getModel())
    }
  }
}
</script>

<style lang="scss">
#graph-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  #graph-sidebar {
    flex: none;
    width: 200px;
    height: 100%;
    background: #f1f1f1;
    border-right: 1px solid #e1e1e1;
    .drap {
      width: 50px;
      height: 50px;
    }
  }
  #graph-map {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    #graph-tool {
      flex: none;
      width: 100%;
      height: 40px;
    }
    #graph-content {
      position: relative;
      flex: 999;
      width: 100%;
      height: 100%;
      background: url("~@/images/grid.gif");
      #graph-container {
        width: 100%;
        height: 100%;
        // height: 100%;
        cursor: default;
        touch-action: none;
        overflow: hidden;
      }
    }
  }
}
</style>
