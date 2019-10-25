<template>
  <div class="graph-tool">
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
    <el-button @click="handleGetXml"
               type="text"
               icon="iconfont iconredo"></el-button>
  </div>
</template>

<script>
import Tool from '@/utils/tool'
export default {
  methods: {
    zoomIn () {
      Tool.zoomIn()
    },
    zoomOut () {
      Tool.zoomOut()
    },
    handleUndo () {
      Tool.undo()
    },
    handleRedo () {
      Tool.redo()
    },
    handleGetXml () {
      Tool.getXml()
    }
  }
}
</script>

<style lang="scss"></style>
