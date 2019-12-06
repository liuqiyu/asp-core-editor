<template>
  <div id="graph-wrapper">
    <Sidebar :graph="graph"
             v-if="setEnabled"
             id="graph-sidebar">
    </Sidebar>
    <div id="graph-map">
      <Toolbar :graph="graph"
               id="graph-tool">
      </Toolbar>

      <div id="graph-content">
        <div :id="timeStamp"
             class="graph-container">
        </div>
        <div v-if="setEnabled"
             id="outlineContainer"
             ref="outlineContainer"
             style="z-index:1;position:absolute;overflow:hidden;top:0px;right:0px;width:220px;height:160px;background:#fff;border: 3px solid black;">
        </div>
      </div>
    </div>
    <div id="graph-sidebar"
         v-if="setEnabled">
      <components :is="currentFormat"
                  ref="format"></components>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import Toolbar from './components/Toolbar'
import Format from './components/Format'
import FormatShape from './components/FormatShape'
import Sidebar from './components/Sidebar'
import mxgraph from './core/mxgraph'
import CoreEditor from './core'
import OutLine from './core/outLine'
import Tool from './core/toolbar'

const { mxEvent, mxUtils } = mxgraph

Object.assign(mxEvent, {
  NORMAL_TYPE_CLICKED: 'NORMAL_TYPE_CLICKED'
})

export default {
  props: {
    setEnabled: {
      type: Boolean,
      default: () => true
    }
  },
  name: 'yus-grapheditor',
  data () {
    return {
      graph: null,
      currentFormat: 'Format',
      timeStamp: ''
    }
  },
  components: {
    Toolbar,
    Sidebar,
    Format,
    FormatShape
  },
  async mounted () {
    this.timeStamp = `graph${moment(new Date()).valueOf()}`
    await this.$nextTick()
    let container = document.getElementById(this.timeStamp)

    let outlineContainer = this.$refs.outlineContainer
    var editor = new CoreEditor(container, this.setEnabled)
    console.log(editor)

    var graph = editor.editor.graph
    this.graph = graph
    OutLine.init(graph, outlineContainer) //

    // 选中元件
    graph.getSelectionModel().addListener(mxEvent.CHANGE, async (sender, evt) => {
      var cell = graph.getSelectionCell()
      if (cell) {
        this.currentFormat = 'FormatShape'
        await this.$nextTick()
        this.$refs.format.selectionChanged(graph)
      } else {
        this.currentFormat = 'Format'
      }
    })

    // 单击事件
    graph.addListener(mxEvent.CLICK, (sender, evt) => {
      var cell = evt.getProperty('cell') // 元件
      this.$emit('click', { graph, cell })
    })

    // 双击事件
    graph.addListener(mxEvent.DOUBLE_CLICK, (sender, evt) => {
      var cell = evt.getProperty('cell') // 元件
      this.$emit('dblClick', { graph, cell })
    })

    // 鼠标移动事件
    graph.addMouseListener({
      // 鼠标按下
      mouseDown: function (sender, evt) {
        graph.container.style.cursor = 'grabbing'
        this.$emit('mouseDown', { graph, evt })
      },
      // 鼠标拿开
      mouseUp: function (sender, evt) {
        graph.container.style.cursor = 'pointer'
        this.$emit('mouseUp', { graph, evt })
      },
      // 鼠标移动
      mouseMove: mxUtils.bind(this, function (sender, evt) {
        this.$emit('mouseMove', { graph, evt })
      })
    })

    // 安装菜单 => 右键
    graph.popupMenuHandler.factoryMethod = (menu, cell, evt) => {
      // graph.isEnabled() 判断是否启用编辑
      if (graph.isEnabled() && !graph.isCellLocked(graph.getDefaultParent())) {
        if (cell) {
          menu.addItem('删除', null, () => {
            Tool.delete()
          })
          // menu.addItem('绑定', null, () => {
          //   alert('绑定')
          // })
          // menu.addItem('绑定子图层', null, () => {
          //   alert('绑定')
          // })
        }
        this.$emit('popupMenuHandler', { menu, cell, evt })
      }
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
@import "./styles/main.scss";
@import "./styles/common.css";
@import "./styles/grapheditor.css";

#graph-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  background: #ffffff;
  border: 1px solid #dee8f8;
  #graph-map {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    #graph-tool {
      flex: none;
      width: 100%;
      height: 40px;
    }
    #graph-content {
      position: relative;
      flex: 1;
      width: 100%;
      height: 100%;
      background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2UwZTBlMCIgb3BhY2l0eT0iMC4yIiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZTBlMGUwIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=");
      .graph-container {
        position: absolute;
        width: 100%;
        height: 100%;
        cursor: default;
        touch-action: none;
        overflow: hidden;
      }
    }
  }
}
</style>
