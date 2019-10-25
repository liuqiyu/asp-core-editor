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
import editor from '@/utils/editor'
export default {
  methods: {
    zoomIn () {
      editor.zoomIn()
    },
    zoomOut () {
      editor.zoomOut()
    },
    handleUndo () {
      editor.undo()
    },
    handleRedo () {
      editor.redo()
    },
    handleGetXml () {
      editor.getXml()
    }
  }
}
</script>

<style lang="scss"></style>
