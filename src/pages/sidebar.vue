<template>
  <div class="graph-sidebar">
    <header class="title">元件库</header>
    <el-collapse v-model="activeNames">
      <el-collapse-item v-for="(item, index) in sideList"
                        :title="item.title || ''"
                        :name="index"
                        :key="index">
        <div class="collapse-wrapper">
          <div class="collapse-item drap"
               :data-width="cell.width"
               :data-height="cell.height"
               :data-src="cell.src"
               v-for="(cell, key) in item.children"
               :key="key">
            <img ref="ele"
                 :src="cell.src"
                 :alt="cell.name"
                 class="img">
            <p class="name">{{cell.name}}</p>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import editor from '@/utils/editor'
export default {
  name: 'Sidebar',
  mounted () {
    const ele = document.querySelectorAll('.drap')
    ele.forEach(item => {
      editor.addToolbarItem(item)
    })
  },
  data () {
    return {
      activeNames: [0],
      sideList: [
        {
          title: '元件1',
          children: [
            {
              name: '你好',
              src: require('./../images/mark-red.svg'),
              width: 48,
              height: 48,
              type: 'image'
            },
            {
              name: '你好1',
              src: require('./../images/mark.svg'),
              width: 48,
              height: 48,
              type: 'image'
            },
            {
              name: '你好',
              src: require('./../images/mark-red.svg'),
              width: 48,
              height: 48,
              type: 'image'
            },
            {
              name: '你好1',
              src: require('./../images/mark.svg'),
              width: 48,
              height: 48,
              type: 'image'
            },
            {
              name: '你好',
              src: require('./../images/mark-red.svg'),
              width: 48,
              height: 48,
              type: 'image'
            },
            {
              name: '你好1',
              src: require('./../images/mark.svg'),
              width: 48,
              height: 48,
              type: 'image'
            }
          ]
        },
        {
          title: '元件2',
          children: [
            {
              name: '你好1',
              src: require('./../images/mark.svg'),
              width: 48,
              height: 48,
              type: 'image'
            },
            {
              name: '你好4',
              src: require('./../images/mark.svg'),
              width: 48,
              height: 48,
              type: 'image'
            }
          ]
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.graph-sidebar {
  flex: none;
  height: 100%;
  background: #fff;
  border-right: 1px solid #e1e1e1;
  width: 251px;
  .title {
    height: 40px;
    background: #f6f6f6;
    line-height: 40px;
    text-indent: 12px;
    font-size: 14px;
  }
  .collapse-wrapper {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    // 不可选中
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    .collapse-item {
      width: 60px;
      height: 60px;
      text-align: center;
      cursor: move;
      border: 1px solid #fff;
      border-radius: 4px;
      &:hover {
        border: 1px solid rgba(0, 0, 0, 0.4);
      }
      img {
        margin-top: 4px;
        width: 30px;
        height: 30px;
        vertical-align: middle;
      }
      .name {
        text-align: center;
        margin-top: 3px;
        font-size: 12px;
      }
    }
  }
  ::v-deep .el-collapse-item {
    .el-collapse-item__header {
      text-indent: 14px;
    }
  }
}
</style>
