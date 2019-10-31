<template>
  <div id="graph-wrapper">
    <Sidebar id="graph-sidebar">
    </Sidebar>
    <div id="graph-map">
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
    <Format id="graph-sidebar"></Format>
  </div>
</template>

<script>
import Tool from './Tool'
import Format from './Format'
import Sidebar from './Sidebar'
import mxgraph from '@/utils/mxgraph'
import editor from '@/utils/editor'
import OutLine from '@/utils/outLine'

const { mxEvent } = mxgraph

Object.assign(mxEvent, {
  NORMAL_TYPE_CLICKED: 'NORMAL_TYPE_CLICKED'
})

export default {
  data () {
    return {
      graph: null
    }
  },
  components: {
    Tool,
    Sidebar,
    Format
  },
  mounted () {
    let container = document.getElementById('graph-container')
    let outlineContainer = this.$refs.outlineContainer

    const graph = editor.init(container) // 初始化
    OutLine.init(graph, outlineContainer) // 缩略框

    // 单击事件
    graph.addListener(mxEvent.CLICK, (sender, evt) => {
      var cell = evt.getProperty('cell') // 元件
      // console.log(cell)
      if (cell) { }
    })

    // 双击事件
    graph.addListener(mxEvent.DOUBLE_CLICK, (sender, evt) => {
      var cell = evt.getProperty('cell') // 元件
      // console.log(cell)
      if (cell) { }
    })
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
#graph-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
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
      flex: 1;
      width: 100%;
      height: 100%;
      background: url("~@/images/grid.gif");
      #graph-container {
        position: absolute;
        width: 100%;
        height: 100%;
        cursor: default;
        touch-action: none;
        overflow: hidden;
      }
    }
  }
}
</style>
