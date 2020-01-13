<!--
 * @Description: App
 * @Author: liuqiyu
 * @Date: 2019-12-30 14:35:07
 * @LastEditors  : liuqiyu
 * @LastEditTime : 2020-01-13 17:00:43
 -->
<template>
  <div id="app">
    <div class="topbar">
      <div class="logo">ASP-CORE-EDITOR 拓扑编辑器</div>
      <div class="nav">
        <router-link to="/">开发</router-link> |
        <router-link to="/production">生产</router-link> |
        <router-link to="/preview">预览</router-link>
      </div>
    </div>
    <div class="router-wrapper">
      <router-view />
    </div>
    <p class="copyright">Copyright © 2019 - 2020 Aspire. All Rights Reserved. Aspire 版权所有</p>
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
