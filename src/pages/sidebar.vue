<template>
  <div class="graph-sidebar">
    <img ref="ele"
         src="./../images/bhd_D.svg"
         alt="哈哈哈"
         class="drap">
  </div>
</template>

<script>
import editor from '@/utils/editor'
export default {
  mounted () {
    editor.addToolbarItem(this.$refs.ele)
  }
}
</script>

<style lang="scss"></style>
