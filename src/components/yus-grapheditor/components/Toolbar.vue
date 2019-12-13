<template>
  <div class="graph-tool">
    <el-button @click="actions('zoomIn')"
               type="text"
               title="放大"
               icon="iconfont iconiconset0158"></el-button>

    <el-button @click="actions('zoomOut')"
               type="text"
               title="缩小"
               icon="iconfont iconsuoxiao"></el-button>

    <el-button @click="actions('resetView')"
               type="text"
               title="1:1"
               icon="iconfont iconhuanyuan"></el-button>

    <el-button @click="actions('undo')"
               type="text"
               title="取消操作（Ctrl+Z）"
               icon="iconfont iconundo"></el-button>

    <el-button @click="actions('redo')"
               type="text"
               title="重做（Ctrl+Y）"
               icon="iconfont iconredo"></el-button>

    <el-button @click="handlePan"
               type="text"
               title="拖动"
               :class="this.panStatus ? 'finger-select': null "
               icon="iconfont icontuodong1"></el-button>

    <el-button @click="actions('copy')"
               type="text"
               title="复制（Ctrl+C）"
               icon="iconfont iconfuzhi"></el-button>

    <el-button @click="actions('paste')"
               type="text"
               title="粘贴（Ctrl+V）"
               icon="iconfont iconniantie"></el-button>

    <el-button @click="handleGetXml"
               type="text"
               title="数据预览"
               icon="iconfont iconXML"></el-button>

    <el-button @click="actions('delete')"
               type="text"
               title="删除（Delete）"
               icon="iconfont iconshanchu"></el-button>

    <el-button @click="handleExport"
               type="text"
               title="导出XML"
               icon="iconfont iconexport-xml"></el-button>

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
    actions (name) {
      Tool.actions(name)
    },
    // 拖动
    handlePan () {
      this.panStatus = !this.panStatus
      Tool.pan(this.panStatus)
    },
    handleGetXml () {
      Tool.getXml()
    },
    handleSave () {
      Tool.save()
    },
    handleExport () {
      Tool.exportXml()
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
