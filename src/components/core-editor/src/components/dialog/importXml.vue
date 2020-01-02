<!--
 * @Description:
 * @Author: liuqiyu
 * @Date: 2019-12-19 16:11:18
 * @LastEditors  : liuqiyu
 * @LastEditTime : 2019-12-30 15:48:53
 -->
<template>
  <div>
    <div class="yus-dialog__body">
      <el-upload class="upload-demo"
                 action=""
                 :http-request="handleBeforeUpload"
                 :on-remove="handleRemove"
                 :file-list="fileList">
        <el-button size="small"
                   type="primary">点击上传</el-button>
        <div slot="tip"
             class="el-upload__tip">只能上传.xml文件</div>
      </el-upload>
    </div>
    <div slot="footer"
         class="yus-dialog__footer">
      <el-button @click="save"
                 type="primary"
                 :disabled="disabled">保存</el-button>
      <el-button @click="$emit('close')">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      fileList: [],
      xml: '',
      disabled: true
    }
  },
  watch: {
    xml (val) {
      if (val.length > 0) {
        this.disabled = false
      } else {
        this.disabled = true
      }
    }
  },
  methods: {
    save () {
      this.$emit('importXml', this.xml)
      this.$emit('close')
    },
    handleBeforeUpload (params) {
      var self = this
      const flie = params.file
      var x = new FileReader()
      x.readAsText(flie, 'UTF-8')
      x.onloadend = function (ev) {
        self.xml = x.result
      }
    },
    handleRemove (file, fileList) {
      this.xml = ''
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
