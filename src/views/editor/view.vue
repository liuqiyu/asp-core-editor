<!--
 * @Description: 运行工具
 * @Author: liuqiyu
 * @Date: 2019-11-28 15:49:56
 * @LastEditors: liuqiyu
 * @LastEditTime: 2019-12-16 14:10:03
 -->

<template>
  <yus-content-page style="height: 100%">
    <yus-grapheditor :data="data"
                     :setEnabled="false"
                     @click="click"
                     @dblClick="dblClick"></yus-grapheditor>
  </yus-content-page>
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
</style>
