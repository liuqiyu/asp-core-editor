<!--
 * @Description:
 * @Author: liuqiyu
 * @Date: 2019-11-28 15:43:13
 * @LastEditors: liuqiyu
 * @LastEditTime: 2019-11-28 16:06:38
 -->
<template>
  <div class="top-bar">
    <div class="logo">
      <div class="iconfont icon-NMStubiao-"
           style="font-size: 22px; margin-right: 14px"></div>
      <h1 class="title">
        拓扑编辑器
      </h1>
    </div>
    <right-bar></right-bar>
  </div>
</template>

<script>
import rightBar from './right-bar'

export default {
  name: 'index',
  components: {
    rightBar
  }
}
</script>

<style scoped lang="scss">
@import "./../../../style/variable";
.top-bar {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 0 20px;
  .logo {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #fff;
    font-size: 16px;
    // font-family: "幼圆";
    img {
      width: 30px;
      height: 30px;
      vertical-align: middle;
      margin-right: 13px;
    }
    .title {
      display: inline-block;
      // line-height: 54px;
      white-space: nowrap;
      font-size: 18px;
    }
  }
}
</style>
