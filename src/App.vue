<!--
 * @Description: App
 * @Author: liuqiyu
 * @Date: 2019-12-30 14:35:07
 * @LastEditors  : liuqiyu
 * @LastEditTime : 2019-12-30 15:37:11
 -->
<template>
  <div id="app">
    <div class="topbar">
      <div class="logo">拓扑编辑器</div>
      <div class="nav">
        <router-link to="/">Editor</router-link> |
        <router-link to="/preview">Preview</router-link>
      </div>
    </div>
    <div class="router-wrapper">
      <router-view />
    </div>
    <p class="copyright">Copyright © 1993 - 2019 Liuqiyu. All Rights Reserved. Liuqiyu 版权所有</p>
  </div>
</template>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
}

.topbar {
  height: 50px;
  text-align: center;
  line-height: 50px;
  background-image: linear-gradient(-179deg, #225dde 0%, #4a86f0 100%);
  display: flex;
  justify-content: space-between;
  padding: 0 20px;

  .logo {
    font-size: 18px;
    color: #fff;
    font-weight: bold;
  }

  .nav {
    a {
      font-weight: bold;
      color: #fff;
      font-size: 16px;

      &.router-link-exact-active {
        color: yellow;
      }
    }
  }
}

.router-wrapper {
  width: 100%;
  height: calc(100% - 80px);
}
.copyright {
  text-align: center;
  line-height: 30px;
  color: #5f6464;
}
</style>
