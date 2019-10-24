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
  </div>
</template>

<script>
export default {
  props: ['graph'],
  methods: {
    zoomIn () {
      console.log(this.graph.view.scale, 1)
      this.graph.zoomIn()
    },
    zoomOut () {
      console.log(this.graph.view.scale)
      this.graph.zoomOut()
    },
    handleUndo () {
      this.undoManager.undo()
    },
    handleRedo () {
      this.undoManager.redo()
    }
  }
}
</script>

<style lang="scss"></style>
