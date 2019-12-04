<!--
 * @Description: 运行工具
 * @Author: liuqiyu
 * @Date: 2019-11-28 15:49:56
 * @LastEditors: liuqiyu
 * @LastEditTime: 2019-12-04 19:02:29
 -->

<template>
  <yus-content-page style="height: 100%">
    <yus-grapheditor type="show"
                     @click="click"
                     @dblClick="dblClick"></yus-grapheditor>
  </yus-content-page>
</template>

<script>
export default {
  methods: {
    click ({ graph, cell }) {
      console.log(graph)
      console.log(cell)
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
