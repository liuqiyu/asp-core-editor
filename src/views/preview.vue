<!--
 * @Description: 运行工具
 * @Author: liuqiyu
 * @Date: 2019-11-28 15:49:56
 * @LastEditors  : liuqiyu
 * @LastEditTime : 2019-12-30 15:38:46
 -->

<template>
  <div class="editor">
    <core-editor :data="data"
                 :setEnabled="false"
                 @click="click"
                 @dblClick="dblClick">
    </core-editor>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: ''
    }
  },
  mounted () {
    this.data = localStorage.getItem('xml')
  },
  methods: {
    click ({ graph, cell }) {
      graph.cellLabelChanged(cell, 123)
    },
    dblClick ({ graph, cell }) {
      console.log(graph)
      console.log(cell)
    }
  }
}
</script>
<style lang="scss" scoped>
.editor {
  height: 100%;
}
</style>
