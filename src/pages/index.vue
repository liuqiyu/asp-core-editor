<template>
  <div id="graph-wrapper">
    <Sidebar id="graph-sidebar">
    </Sidebar>
    <div id="graph-map">
      <AspTool :graph="graph"
               id="graph-tool"></AspTool>

      <div id="graph-content">
        <div id="graph-container">
        </div>
        <div id="outlineContainer"
             ref="outlineContainer"
             style="z-index:1;position:absolute;overflow:hidden;top:0px;right:0px;width:220px;height:160px;background:transparent;border: 3px solid black;">
        </div>
      </div>
    </div>
    <Format id="graph-sidebar"
            ref="format"></Format>
  </div>
</template>

<script>
import AspTool from './AspTool'
import Format from './Format'
import Sidebar from './Sidebar'
import mxgraph from '@/utils/mxgraph'
import editor from '@/utils/editor'
import OutLine from '@/utils/outLine'
import Tool from '@/utils/tool'

const { mxEvent } = mxgraph

Object.assign(mxEvent, {
  NORMAL_TYPE_CLICKED: 'NORMAL_TYPE_CLICKED'
})

export default {
  data () {
    return {
      graph: null
    }
  },
  components: {
    AspTool,
    Sidebar,
    Format
  },
  mounted () {
    let container = document.getElementById('graph-container')
    let outlineContainer = this.$refs.outlineContainer

    const graph = editor.init(container) // 初始化
    OutLine.init(graph, outlineContainer) //

    // 选中元件
    graph.getSelectionModel().addListener(mxEvent.CHANGE, (sender, evt) => {
      this.$refs.format.selectionChanged(graph)
    })

    // 单击事件
    graph.addListener(mxEvent.CLICK, (sender, evt) => {
      var cell = evt.getProperty('cell') // 元件
      // console.log(cell)
      if (cell) {
        console.log(123)
        console.log(cell)
        graph.getModel().beginUpdate()
        try {
          // graph.setCellStyles('fillColor', 'red', graph.getSelectionCells())
          // graph.getModel().setStyle(cell, 'fillColor=red')
          // graph.getModel().setValue(cell, 3333333333333333)
        } finally {
          graph.getModel().endUpdate()
        }
      }
    })

    // 双击事件
    graph.addListener(mxEvent.DOUBLE_CLICK, (sender, evt) => {
      var cell = evt.getProperty('cell') // 元件
      // console.log(cell)
      if (cell) { }
    })

    // 安装菜单 => 右键
    graph.popupMenuHandler.factoryMethod = (menu, cell, evt) => {
      console.log(cell)
      if (cell) {
        menu.addItem('删除', null, () => {
          Tool.delete()
        })
        menu.addItem('绑定', null, () => {
          alert('绑定')
        })
        menu.addItem('绑定子图层', null, () => {
          alert('绑定')
        })
      }
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
#graph-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
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
      #graph-container {
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
