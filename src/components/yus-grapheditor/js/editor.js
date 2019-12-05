import mxgraph from './mxgraph'
// import Toolbar from './toolbar'
import Sidebar from './sidebar'
import Format from './format'
// import Actions from './actions'
import PopupMenu from './popupMenu'
// import MxEvents from './mxEvents'
import Graph from './graph'

const {
  // mxEditor,
  mxGraph,
  // mxImage,
  mxUtils,
  mxRubberband,
  // mxEvent,
  // mxClient,
  // mxCell,
  // mxGeometry,
  // mxConstants,
  // mxEdgeStyle,
  // mxGraphHandler,
  // mxConstants,
  // mxEdgeHandler,
  mxCodec
  // mxPoint
  // mxVertexHandler
  // mxPerimeter,
  // mxEdgeStyle
} = mxgraph

export function Editor (editor, container, setEnabled) {
  this.editor = editor
  // this.container = container
  // this.setEnabled = setEnabled
  // 初始化
  this.init(container, setEnabled)
}

Editor.prototype.init = function (container, setEnabled) {
  this.graph = new mxGraph(container)
  this.graph.setEnabled(setEnabled) // 编辑与运行状态
  this.graph.setConnectable(true) // 指定图是否应允许新连接
  this.graph.setMultigraph(true) // 指定图是否应允许同一对顶点之间存在多个连接
  this.graph.setGridEnabled(false)

  const node = mxUtils.load('static/default.xml').getDocumentElement()
  if (node != null) {
    var dec = new mxCodec(node.ownerDocument)
    dec.decode(node, this.graph.getStylesheet())
  }

  Sidebar.init(this.graph)
  // Toolbar.init(this.editor, this.graph)
  Format.init(this.editor, this.graph)
  // Actions.init(this.editor, this.graph)
  PopupMenu.init(this.editor, this.graph, container)
  // MxEvents.init()
  this.graphInit = new Graph(this.graph)

  // 鼠标拖拽选中
  /* eslint-disable no-new */
  new mxRubberband(this.graph)

  const xml = sessionStorage.getItem('xml')
  if (xml) {
    var doc = mxUtils.parseXml(xml)
    var codec = new mxCodec(doc)
    codec.decode(doc.documentElement, this.graph.getModel())
  }
}

// export function initEditor (Editor) {
//   console.log(this)
//   // 初始化
//   Editor.prototype._init = function (container, setEnabled) {
//     this.graph = new mxGraph(container)
//     this.graph.setEnabled(setEnabled) // 编辑与运行状态
//     this.graph.setConnectable(true) // 指定图是否应允许新连接
//     this.graph.setMultigraph(true) // 指定图是否应允许同一对顶点之间存在多个连接
//     this.graph.setGridEnabled(false)

//     const node = mxUtils.load('static/default.xml').getDocumentElement()
//     if (node != null) {
//       var dec = new mxCodec(node.ownerDocument)
//       dec.decode(node, this.graph.getStylesheet())
//     }

//     Sidebar.init(this.graph)
//     Toolbar.init(this.editor, this.graph)
//     Format.init(this.editor, this.graph)
//     Actions.init(this.editor, this.graph)
//     PopupMenu.init(this.editor, this.graph, container)
//     // MxEvents.init()
//     this.graphInit = new Graph(this.graph)

//     // 鼠标拖拽选中
//     /* eslint-disable no-new */
//     new mxRubberband(this.graph)

//     const xml = sessionStorage.getItem('xml')
//     if (xml) {
//       var doc = mxUtils.parseXml(xml)
//       var codec = new mxCodec(doc)
//       codec.decode(doc.documentElement, this.graph.getModel())
//     }
//   }
// }

// class Editor {
//   static editor = null;
//   static graph = null;
//   static graphInit = null;

//   // static init (Editor) {
//   //   // var _this = this
//   //   if (!mxClient.isBrowserSupported()) {
//   //     // 判断是否支持mxgraph
//   //     mxUtils.error('Browser is not supported!', 200, false)
//   //   } else {
//   //     // 初始化
//   //     // Toolbar.init(this.editor, this.graph)
//   //     // Format.init(this.editor, this.graph)
//   //     // Actions.init(this.editor, this.graph)
//   //     // PopupMenu.init(this.editor, this.graph, container)
//   //     // MxEvents.init()
//   //     // this.graphInit = new Graph(this.graph)

//   //     // var parent = this.graph.getDefaultParent()
//   //     // this.graph.getModel().beginUpdate()
//   //     // try {
//   //     //   // 创建空的画布
//   //     //   // this.graph.insertVertex(parent, null)
//   //     //   // var v1 = this.graph.insertVertex(
//   //     //   //   parent,
//   //     //   //   null,
//   //     //   //   'World',
//   //     //   //   200,
//   //     //   //   150,
//   //     //   //   80,
//   //     //   //   30
//   //     //   // )
//   //     //   // v1.lod = 3
//   //     //   // // 设置背景
//   //     //   // // this.graph.setBackgroundImage(
//   //     //   // //   new mxImage('' + 'static/level-1.svg', 1024, 769)
//   //     //   // // )
//   //     //   this.graph.view.validateBackgroundImage()
//   //     // } finally {
//   //     //   // Updates the display
//   //     //   this.graph.getModel().endUpdate()
//   //     // }

//   //     // const xml = sessionStorage.getItem('xml')
//   //     // if (xml) {
//   //     //   var doc = mxUtils.parseXml(xml)
//   //     //   var codec = new mxCodec(doc)
//   //     //   codec.decode(doc.documentElement, this.graph.getModel())
//   //     // }

//   //     return this.graph
//   //   }
//   // }

//   static getGraph () {
//     return this.graph
//   }

//   // 元件选中
//   static selectionChanged () {
//     var cell = this.graph.getSelectionCell()
//     if (cell) {
//       Format.initFormatField(cell)
//     }
//   }

//   // 等距分布
//   static distributeCells (horizontal, cells) {
//     if (cells == null) {
//       cells = this.graph.getSelectionCells()
//     }

//     if (cells != null && cells.length > 1) {
//       var vertices = []
//       var max = null
//       var min = null

//       for (var i = 0; i < cells.length; i++) {
//         if (this.graph.getModel().isVertex(cells[i])) {
//           var state = this.graph.view.getState(cells[i])

//           if (state != null) {
//             var tmp = horizontal ? state.getCenterX() : state.getCenterY()
//             max = max != null ? Math.max(max, tmp) : tmp
//             min = min != null ? Math.min(min, tmp) : tmp

//             vertices.push(state)
//           }
//         }
//       }

//       if (vertices.length > 2) {
//         vertices.sort(function (a, b) {
//           return horizontal ? a.x - b.x : a.y - b.y
//         })

//         var t = this.graph.view.translate
//         var s = this.graph.view.scale

//         min = min / s - (horizontal ? t.x : t.y)
//         max = max / s - (horizontal ? t.x : t.y)

//         this.graph.getModel().beginUpdate()
//         try {
//           var dt = (max - min) / (vertices.length - 1)
//           var t0 = min

//           for (let i = 1; i < vertices.length - 1; i++) {
//             var pstate = this.graph.view.getState(
//               this.graph.model.getParent(vertices[i].cell)
//             )
//             var geo = this.graph.getCellGeometry(vertices[i].cell)
//             t0 += dt

//             if (geo != null && pstate != null) {
//               geo = geo.clone()

//               if (horizontal) {
//                 geo.x = Math.round(t0 - geo.width / 2) - pstate.origin.x
//               } else {
//                 geo.y = Math.round(t0 - geo.height / 2) - pstate.origin.y
//               }

//               this.graph.getModel().setGeometry(vertices[i].cell, geo)
//             }
//           }
//         } finally {
//           this.graph.getModel().endUpdate()
//         }
//       }
//     }

//     return cells
//   }
// }

// export default Editor
