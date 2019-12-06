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
               :data-style="cell.style"
               :data-value="cell.name"
               :data-type="cell.type"
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
import Sidebar from './../core/sidebar'
export default {
  name: 'Sidebar',
  props: ['graph'],
  mounted () {
    const ele = document.querySelectorAll('.drap')
    ele.forEach(item => {
      Sidebar.createDragSource(item)
    })
  },
  data () {
    return {
      activeNames: [0],
      sideList: [
        {
          title: '基础元件',
          children: [
            {
              name: 'rectangle',
              src: require('./../images/sidebar/24gl-rectangle.svg'),
              width: 120,
              height: 60,
              type: 'image',
              style: 'rounded=0;whiteSpace=wrap;html=1;'
            },
            {
              name: 'rectangle',
              src: require('./../images/sidebar/rectangle.svg'),
              width: 120,
              height: 60,
              type: 'image',
              style: 'rounded=1;whiteSpace=wrap;html=1;'
            },
            {
              name: 'Text',
              src: require('./../images/sidebar/text.svg'),
              width: 40,
              height: 20,
              type: 'Text',
              style: 'text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;'
            },
            {
              name: 'Ellipse',
              src: require('./../images/sidebar/ellipse.svg'),
              width: 120,
              height: 80,
              type: 'Ellipse',
              style: 'ellipse;whiteSpace=wrap;html=1;'
            },
            {
              name: 'Line',
              src: require('./../images/sidebar/line.svg'),
              width: 50,
              height: 50,
              type: 'edge',
              style: 'endArrow=none;html=1;'
            },
            {
              name: 'curve',
              src: require('./../images/sidebar/curve.svg'),
              width: 50,
              height: 50,
              type: 'curve',
              style: 'endArrow=none;html=1;'
            }
          ]
        },
        {
          title: '元件2',
          children: [
            {
              name: '你好1',
              src: require('./../images/mark.svg'),
              width: 120,
              height: 60,
              type: 'image',
              style: {
                rounded: 0,
                whiteSpace: 'wrap',
                html: 1
              }
            }
          ]
        }
      ]
    }
  },
  methods: {
    // 对象转化为字符串
    setString (style) {
      if (!style) {
        return ''
      }
      let str = ''
      Object.keys(style).forEach(item => {
        console.log(item)
        str += `${item}=${style[item]};`
      })
      return str
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
