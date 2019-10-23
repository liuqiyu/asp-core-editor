<template>
  <div id="graph-wrapper">
    <div id="graph-sidebar">
      <img src="./../images/bhd_D.svg"
           alt="哈哈哈"
           class="drap">
    </div>
    <div id="graph-map">
      <div id="graph-tool">
        <el-button @click="zoomIn">in</el-button>
        <el-button @click="zoomOut">out</el-button>
      </div>
      <div id="graph-content">
        <div id="graph-container">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mxgraph from './../utils/mxgraph'
const { mxGraph, mxClient, mxCodec, mxUtils, mxEvent, mxCell, mxGeometry, mxRubberband, mxImage } = mxgraph

Object.assign(mxEvent, {
  NORMAL_TYPE_CLICKED: 'NORMAL_TYPE_CLICKED'
})
let MxCell = mxCell
let MxGeometry = mxGeometry
let MxRubberband = mxRubberband
let MxImage = mxImage

export default {
  data () {
    return {
      graph: null
    }
  },
  mounted () {
    if (!mxClient.isBrowserSupported()) {
      // 判断是否支持mxgraph
      mxUtils.error('Browser is not supported!', 200, false)
    } else {
      // 再容器中创建图表
      let container = document.getElementById('graph-container')
      let MxGraph = mxGraph
      let MxCodec = mxCodec
      this.graph = new MxGraph(container)

      this.graph.setBackgroundImage(new MxImage('~@/images/bg.svg', 600, 600))

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

      // Changes the zoom on mouseWheel events
      mxEvent.addMouseWheelListener((evt, up) => {
        if (!mxEvent.isConsumed(evt)) {
          if (up) {
            this.graph.zoomIn()
          } else {
            this.graph.zoomOut()
          }

          mxEvent.consume(evt)
        }
      })
    }
  },
  methods: {
    zoomIn () {
      this.graph.zoomIn()
    },
    zoomOut () {
      this.graph.zoomOut()
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
      flex: 1;
      #graph-container {
        width: 100%;
        // height: 100%;
        cursor: default;
        touch-action: none;
        overflow: auto;
        background: url("~@/images/grid.gif");
      }
    }
  }
}
</style>

<style lang="scss">
</style>
