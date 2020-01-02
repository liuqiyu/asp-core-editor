/*
 * @Description:
 * @Author: liuqiyu
 * @Date: 2019-12-04 16:54:03
 * @LastEditors: liuqiyu
 * @LastEditTime: 2019-12-17 15:14:59
 */
import mxgraph from './mxgraph'
const {
  mxUtils,
  mxEvent,
  mxCell,
  mxGeometry,
  mxPoint
} = mxgraph

class Sidebar {
  static graph = null;

  static init (editor) {
    this.editor = editor
    this.graph = editor.editor.graph
  }

  // 创建拖拽资源
  static createDragSource (ele) {
    const dataset = ele.dataset
    const src = dataset.src
    const width = Number(dataset.width)
    const height = Number(dataset.height)
    const style = dataset.style
    const value = dataset.value || ''
    const type = dataset.type

    const _dropGraph = evt => {
      const x = mxEvent.getClientX(evt)
      const y = mxEvent.getClientY(evt)
      // 获取 x,y 所在的元素
      const elt = document.elementFromPoint(x, y)
      // 如果鼠标落在graph容器
      if (mxUtils.isAncestorNode(this.graph.container, elt)) {
        return this.graph
      }
      // 鼠标落在其他地方
      return null
    }

    const _dropSuccessCb = (graph, evt, target, x, y) => {
      var cell = null
      if (type === 'edge') {
        cell = new mxCell('', new mxGeometry(0, 0, width, height), style)
        cell.geometry.setTerminalPoint(new mxPoint(0, height), true)
        cell.geometry.setTerminalPoint(new mxPoint(width, 0), false)
        cell.geometry.relative = true
        cell.edge = true
      } else if (type === 'curve') {
        cell = new mxCell('', new mxGeometry(0, 0, 50, 50), 'curved=1;endArrow=classic;html=1;')
        cell.geometry.setTerminalPoint(new mxPoint(0, 50), true)
        cell.geometry.setTerminalPoint(new mxPoint(50, 0), false)
        cell.geometry.points = [new mxPoint(50, 50), new mxPoint(0, 0)]
        cell.geometry.relative = true
        cell.edge = true
      } else if (type === 'image') {
        cell = new mxCell(value, new mxGeometry(0, 0, width, height), `shape=image;image=${src};`)
        cell.vertex = true
      } else {
        cell = new mxCell(value, new mxGeometry(0, 0, width, height), style)
        cell.vertex = true
      }
      var cells = graph.importCells([cell], x, y, target)

      if (cells != null && cells.length > 0) {
        graph.scrollCellToVisible(cells[0])
        graph.setSelectionCells(cells)
      }
    }

    const dragElt = document.createElement('div')
    dragElt.style.border = 'dashed black 1px'
    dragElt.style.width = width + 'px'
    dragElt.style.height = height + 'px'

    mxUtils.makeDraggable(
      ele,
      _dropGraph,
      _dropSuccessCb,
      dragElt,
      null,
      null,
      null,
      true
    )
  }
}

export default Sidebar
