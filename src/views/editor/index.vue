<!--
 * @Description: 编辑工具
 * @Author: liuqiyu
 * @Date: 2019-11-28 15:49:56
 * @LastEditors: liuqiyu
 * @LastEditTime: 2019-12-16 14:59:10
 -->

<template>
  <yus-content-page style="height: 100%">
    <yus-grapheditor :data="data"
                     :setEnabled="true"
                     @click="click"
                     @dblClick="dblClick"
                     @mouseDown="mouseDown"
                     @mouseUp="mouseUp"
                     @mouseMove="mouseMove"
                     @popupMenuHandler="popupMenuHandler"></yus-grapheditor>
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
      // alert('单击')
    },
    dblClick ({ graph, cell }) {
      // alert('双击')
    },
    mouseDown ({ graph, evt }) {

    },
    mouseUp ({ graph, evt }) {

    },
    mouseMove ({ graph, evt }) {

    },
    popupMenuHandler ({ menu, cell, evt }) {
      menu.addItem('绑定', null, () => {
        alert('绑定')
      })
      menu.addItem('绑定子图层', null, () => {
        alert('绑定')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
