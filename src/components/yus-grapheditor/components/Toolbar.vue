<template>
  <div class="graph-tool">
    <el-tooltip class="item"
                effect="dark"
                content="放大"
                placement="top">
      <el-button @click="zoomIn"
                 type="text"
                 icon="iconfont iconiconset0158"></el-button>
    </el-tooltip>

    <el-tooltip class="item"
                effect="dark"
                content="缩小"
                placement="top">
      <el-button @click="zoomOut"
                 type="text"
                 icon="iconfont iconsuoxiao"></el-button>
    </el-tooltip>

    <el-tooltip class="item"
                effect="dark"
                content="1:1"
                placement="top">
      <el-button @click="handleInit"
                 type="text"
                 icon="iconfont iconhuanyuan"></el-button>
    </el-tooltip>

    <el-tooltip class="item"
                effect="dark"
                content="还原"
                placement="top">
      <el-button @click="handleUndo"
                 type="text"
                 icon="iconfont iconundo"></el-button>
    </el-tooltip>

    <el-tooltip class="item"
                effect="dark"
                content="重做"
                placement="top">
      <el-button @click="handleRedo"
                 type="text"
                 icon="iconfont iconredo"></el-button>
    </el-tooltip>

    <el-tooltip class="item"
                effect="dark"
                content="拖动"
                placement="top">
      <el-button @click="handlePan"
                 type="text"
                 :class="this.panStatus ? 'finger-select': null "
                 icon="iconfont icontuodong1"></el-button>
    </el-tooltip>

    <el-tooltip class="item"
                effect="dark"
                content="复制"
                placement="top">
      <el-button @click="handleCopy"
                 type="text"
                 icon="iconfont iconfuzhi"></el-button>
    </el-tooltip>

    <el-tooltip class="item"
                effect="dark"
                content="粘贴"
                placement="top">
      <el-button @click="handleParse"
                 type="text"
                 icon="iconfont iconniantie"></el-button>
    </el-tooltip>

    <el-tooltip class="item"
                effect="dark"
                content="获取XML"
                placement="top">
      <el-button @click="handleGetXml"
                 type="text"
                 icon="iconfont iconXML"></el-button>
    </el-tooltip>

    <el-tooltip class="item"
                effect="dark"
                content="删除"
                placement="top">
      <el-button @click="hanleDelete"
                 type="text"
                 icon="iconfont iconshanchu"></el-button>
    </el-tooltip>

    <el-tooltip class="item"
                effect="dark"
                content="保存"
                placement="top">
      <el-button @click="handleSave"
                 type="text"
                 icon="iconfont iconbaocun"></el-button>
    </el-tooltip>
  </div>
</template>

<script>
import Tool from './../js/toolbar'
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
      Tool.zoomActual()
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
