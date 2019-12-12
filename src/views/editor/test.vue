<!--
 * @Description: 运行工具
 * @Author: liuqiyu
 * @Date: 2019-11-28 15:49:56
 * @LastEditors: liuqiyu
 * @LastEditTime: 2019-12-12 14:19:54
 -->

<template>
  <yus-content-page style="height: 100%">
    <div class="id"
         ref="id"></div>
  </yus-content-page>
</template>

<script>
import mxgraph from './index'
const { mxGraph, mxUtils, mxCodec } = mxgraph
export default {
  mounted () {
    const container = this.$refs.id
    const graph = new mxGraph(container)
    let value = localStorage.getItem('xml')
    graph.model.beginUpdate()
    try {
      var doc = mxUtils.parseXml(value)
      var codec = new mxCodec(doc)
      codec.decode(doc.documentElement, graph.getModel())
    } finally {
      graph.model.endUpdate()
    }
  }
}
</script>

<style lang="scss" scoped>
.id {
  width: 400px;
  height: 400px;
  background: red;
}
</style>
