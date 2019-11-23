<!--
 * @Descripttion:
 * @Author: liuqiyu
 * @Date: 2019-10-21 16:21:03
 * @LastEditors: liuqiyu
 * @LastEditTime: 2019-11-06 14:01:36
 -->
<template>
  <div id="app">
    <mains></mains>
  </div>
</template>

<script>
import mains from "./pages/index";
export default {
  components: {
    mains
  },
  mounted() {}
};
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
}
</style>
