<template>
  <div class="graph-tool">
    <el-button @click="zoomIn"
               type="text"
               title="放大"
               icon="iconfont iconiconset0158"></el-button>

    <el-button @click="zoomOut"
               type="text"
               title="缩小"
               icon="iconfont iconsuoxiao"></el-button>

    <el-button @click="handleInit"
               type="text"
               title="1:1"
               icon="iconfont iconhuanyuan"></el-button>

    <el-button @click="handleUndo"
               type="text"
               title="取消操作（Ctrl+Z）"
               icon="iconfont iconundo"></el-button>

    <el-button @click="handleRedo"
               type="text"
               title="重做（Ctrl+Y）"
               icon="iconfont iconredo"></el-button>

    <el-button @click="handlePan"
               type="text"
               title="拖动"
               :class="this.panStatus ? 'finger-select': null "
               icon="iconfont icontuodong1"></el-button>

    <el-button @click="handleCopy"
               type="text"
               title="复制（Ctrl+C）"
               icon="iconfont iconfuzhi"></el-button>

    <el-button @click="handleParse"
               type="text"
               title="粘贴（Ctrl+V）"
               icon="iconfont iconniantie"></el-button>

    <el-button @click="handleGetXml"
               type="text"
               title="数据预览"
               icon="iconfont iconXML"></el-button>

    <el-button @click="hanleDelete"
               type="text"
               title="删除（Delete）"
               icon="iconfont iconshanchu"></el-button>

    <el-button @click="handleSave"
               type="text"
               title="保存"
               icon="iconfont iconbaocun"></el-button>
  </div>
</template>

<script>

import Tool from './../core/toolbar'
export default {
  name: 'AspTool',
  data () {
    return {
      panStatus: false
    }
  },
  methods: {
    zoomIn () {
      Tool.zoomIn()
    },
    zoomOut () {
      Tool.zoomOut()
    },
    handleInit () {
      Tool.resetView()
    },
    handleUndo () {
      Tool.undo()
    },
    handleRedo () {
      Tool.redo()
    },
    // 拖动
    handlePan () {
      this.panStatus = !this.panStatus
      Tool.pan(this.panStatus)
    },
    handleGetXml () {
      Tool.getXml()
    },
    hanleDelete () {
      Tool.delete()
    },
    handleCopy () {
      Tool.copy()
    },
    handleParse () {
      Tool.paste()
    },
    handleSave () {
      Tool.save()
    }
  }
}
</script>

<style lang="scss">
.graph-tool {
  display: flex;
  align-items: center;
  padding-left: 12px;
  .finger-select {
    opacity: 0.5;
  }
}
</style>
