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
import editor from '@/utils/editor'

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
    Tool
  },
  mounted () {
    let container = document.getElementById('graph-container')
    let outlineContainer = this.$refs.outlineContainer

    editor.init(container) // 初始化
    editor.outLine(outlineContainer) // 缩略框

    // if (mxClient.IS_QUIRKS) {
    //   document.body.style.overflow = 'hidden'
    //   /* eslint-disable no-new */
    //   new MxDivResizer(outlineContainer)
    // }
    // /* eslint-disable no-new */
    // new MxOutline(this.graph, outlineContainer)

    // this.undoManager = new MxUndoManager()

    // var listener = (sender, evt) => {
    //   this.undoManager.undoableEditHappened(evt.getProperty('edit'))
    // }
    // this.graph.getModel().addListener(mxEvent.UNDO, listener)
    // this.graph.getView().addListener(mxEvent.UNDO, listener)
  },
  methods: {
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
