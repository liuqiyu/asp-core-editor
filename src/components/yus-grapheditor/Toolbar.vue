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

    <!-- <el-button @click="actions('group')"
               type="text"
               title="组合"
               icon="iconfont iconzuhe"></el-button>

    <el-button @click="actions('ungroup')"
               type="text"
               title="取消组合"
               icon="iconfont iconquxiaozuhe"></el-button> -->

    <el-button @click="handleGetXml"
               type="text"
               title="数据预览"
               icon="iconfont iconXML"></el-button>

    <el-button @click="actions('delete')"
               type="text"
               title="删除（Delete）"
               icon="iconfont iconshanchu"></el-button>

    <el-button @click="importXml"
               type="text"
               title="导出XML"
               icon="iconfont icondaoru1"></el-button>

    <el-button @click="actions('saveXml')"
               type="text"
               title="导出XML"
               icon="iconfont iconexport-xml"></el-button>

    <el-button @click="handleSave"
               type="text"
               title="保存"
               icon="iconfont iconbaocun"></el-button>

    <!--弹出框-->
    <core-dialog v-bind="dialogOption"
                 @close="closeDynamicDialog"
                 :view.sync="dialogOption.view"
                 :visible.sync="dialogOption.show">
      <component :is="dialogOption.view"
                 :dialog-data="dialogData"
                 @close="closeDynamicDialog"
                 @importXml="renderXml">
      </component>
    </core-dialog>
  </div>
</template>

<script>
import Tool from './core/toolbar'
import coreDialog from './components/core-dialog'
import importXml from './components/dialog/importXml'

export default {
  name: 'AspTool',
  components: {
    coreDialog,
    importXml
  },
  data () {
    return {
      panStatus: false,
      dialogOption: {
        show: false,
        view: null,
        title: '',
        width: '1200px'
      },
      dialogData: {}
    }
  },
  methods: {
    actions (name) {
      Tool.actions(name)
    },
    // 拖动
    handlePan () {
      this.panStatus = !this.panStatus
      Tool.actions('pan', this.panStatus)
    },
    handleGetXml () {
      Tool.getXml()
    },
    handleSave () {
      Tool.save()
    },
    importXml () {
      this.showDynamicDialog('importXml', '导入', '450px')
    },
    renderXml (xml) {
      this.$emit('renderXml', xml)
    },
    showDynamicDialog (view, title, width = '1200px') {
      this.dialogOption.show = true
      this.dialogOption.view = view
      this.dialogOption.title = title
      this.dialogOption.width = width
    },
    closeDynamicDialog (boolean) {
      if (boolean) {
        // 关闭弹窗后刷新列表
        // this.fetchData()
      }
      this.dialogOption = {
        show: false,
        view: null,
        title: '',
        width: '0px'
      }
    }
  }
}
</script>

<style lang="scss">
.graph-tool {
  display: flex;
  align-items: center;
  padding-left: 12px;
  background: #f6f6f6;
  .finger-select {
    opacity: 0.5;
  }
}
</style>
