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
  </div>
</template>

<script>
import Tool from '@/utils/tool'
export default {
  name: 'Tool',
  data () {
    return {
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
    }
  }
}
</script>

<style lang="scss"></style>
