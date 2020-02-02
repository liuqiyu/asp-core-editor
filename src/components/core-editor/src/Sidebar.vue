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
               :data-value="cell.label"
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
export default {
  name: 'Sidebar',
  props: ['coreEditor'],
  watch: {
    coreEditor (val) {
      if (val) {
        this.createDragSource()
      }
    }
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
              src: require('./images/sidebar/24gl-rectangle.svg'),
              width: 120,
              height: 60,
              style: 'rounded=0;whiteSpace=wrap;html=1;',
              label: '正方形'
            },
            {
              name: 'rectangle',
              src: require('./images/sidebar/rectangle.svg'),
              width: 120,
              height: 60,
              style: 'rounded=1;whiteSpace=wrap;html=1;'
            },
            {
              name: 'Text',
              src: require('./images/sidebar/text.svg'),
              width: 40,
              height: 20,
              style: 'text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;',
              label: 'Text'
            },
            {
              name: '图片',
              src: require('./images/sidebar/image.svg'),
              width: 48,
              height: 48,
              type: 'image'
            },
            {
              name: 'Ellipse',
              src: require('./images/sidebar/ellipse.svg'),
              width: 120,
              height: 80,
              style: 'ellipse;whiteSpace=wrap;html=1;'
            },
            {
              name: 'Ellipse',
              src: require('./images/sidebar/ellipse.svg'),
              width: 120,
              height: 80,
              style: 'rhombus;whiteSpace=wrap;html=1'
            },
            {
              name: 'Line',
              src: require('./images/sidebar/line.svg'),
              width: 50,
              height: 50,
              type: 'edge',
              style: 'endArrow=none;html=1;'
            },
            {
              name: 'curve',
              src: require('./images/sidebar/curve.svg'),
              width: 50,
              height: 50,
              type: 'curve',
              style: 'curved=1;endArrow=classic;html=1;'
            }
          ]
        },
        {
          title: '办公',
          children: [
            {
              name: '地球',
              src: require('./images/work/Earth_globe_128x128.png'),
              width: 60,
              height: 60,
              type: 'image'
            },
            {
              name: '邮箱',
              src: require('./images/work/Email_128x128.png'),
              width: 60,
              height: 60,
              type: 'image'
            },
            {
              name: '文件夹',
              src: require('./images/work/Empty_Folder_128x128.png'),
              width: 60,
              height: 60,
              type: 'image'
            },
            {
              name: '文件夹2',
              src: require('./images/work/Full_Folder_128x128.png'),
              width: 60,
              height: 60,
              type: 'image'
            },
            {
              name: '齿轮',
              src: require('./images/work/Gear_128x128.png'),
              width: 60,
              height: 60,
              type: 'image'
            },
            {
              name: '图表',
              src: require('./images/work/Graph_128x128.png'),
              width: 60,
              height: 60,
              type: 'image'
            },
            {
              name: 'iMac',
              src: require('./images/work/iMac_128x128.png'),
              width: 60,
              height: 60,
              type: 'image'
            },
            {
              name: 'iPad',
              src: require('./images/work/iPad_128x128.png'),
              width: 60,
              height: 60,
              type: 'image'
            },
            {
              name: '笔记本',
              src: require('./images/work/Laptop_128x128.png'),
              width: 60,
              height: 60,
              type: 'image'
            },
            {
              name: '钟表',
              src: require('./images/work/Lock_128x128.png'),
              width: 60,
              height: 60,
              type: 'image'
            },
            {
              name: 'MacBook',
              src: require('./images/work/MacBook_128x128.png'),
              width: 60,
              height: 60,
              type: 'image'
            },
            {
              name: '主机',
              src: require('./images/work/Monitor_Tower_128x128.png'),
              width: 60,
              height: 60,
              type: 'image'
            },
            {
              name: '打印机',
              src: require('./images/work/Printer_128x128.png'),
              width: 60,
              height: 60,
              type: 'image'
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
    },
    createDragSource () {
      const ele = document.querySelectorAll('.drap')
      ele.forEach(item => {
        const dataset = item.dataset
        const src = dataset.src
        const width = Number(dataset.width)
        const height = Number(dataset.height)
        const style = dataset.style
        const value = dataset.value || ''
        const type = dataset.type
        this.coreEditor.sidebar.createDragSource(item, type, width, height, value, style, src)
      })
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
    height: 34px;
    background: #f6f6f6;
    line-height: 34px;
    text-indent: 12px;
    font-size: 14px;
    color: #333333;
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
