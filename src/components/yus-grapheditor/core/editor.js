/*
 * @Description: editor
 * @Author: liuqiyu
 * @Date: 2019-12-04 15:00:15
 * @LastEditors: liuqiyu
 * @LastEditTime: 2019-12-13 10:48:01
 */
import mxgraph from './mxgraph'
import Sidebar from './sidebar'
import PopupMenu from './popupMenu'
import MxEvents from './mxEvents'
import Graph from './graph'

const {
  mxGraph,
  mxUtils,
  mxRubberband,
  mxCodec
} = mxgraph

export function Editor (editor, container, setEnabled) {
  this.editor = editor
  // 初始化
  this.init(container, setEnabled)
}

Editor.prototype.init = function (container, setEnabled) {
  this.graph = new mxGraph(container)
  this.graph.setEnabled(setEnabled) // 编辑与运行状态
  this.graph.setConnectable(true) // 指定图是否应允许新连接
  this.graph.setMultigraph(true) // 指定图是否应允许同一对顶点之间存在多个连接
  this.graph.setGridEnabled(false)

  // 初始化样式
  const node = mxUtils.load('static/default.xml').getDocumentElement()
  if (node != null) {
    var dec = new mxCodec(node.ownerDocument)
    dec.decode(node, this.graph.getStylesheet())
  }

  Sidebar.init(this.graph)
  PopupMenu.init(this.editor, this.graph, container)
  MxEvents.init()
  this.graphInit = new Graph(this.graph)

  // 鼠标拖拽选中
  /* eslint-disable no-new */
  new mxRubberband(this.graph)
}
