/*
 * @Description:
 * @Author: liuqiyu
 * @Date: 2019-11-11 14:27:27
 * @LastEditors: liuqiyu
 * @LastEditTime: 2019-12-02 16:20:56
 */
import mxgraph from './mxgraph'

const {
  mxUtils,
  mxCodec
} = mxgraph

class Tool {
  static editor = null
  static graph = null
  static undoManager = null
  static textInput = null

  // Tool 初始化
  static init (editor, graph) {
    this.editor = editor
    this.graph = graph
  }
  // 撤销
  static undo () {
    Tool.editor.execute('undo')
  }

  // 重做
  static redo () {
    Tool.editor.execute('redo')
  }

  // 放大
  static zoomIn () {
    // console.log(this.graph.view.scale)
    Tool.editor.execute('zoomIn')
  }

  // 缩小
  static zoomOut () {
    // console.log(this.graph.view.scale)
    Tool.editor.execute('zoomOut')
  }

  // 1:1还原
  static zoomActual () {
    // console.log(this.graph.view.scale)
    Tool.graph.zoomActual()
  }

  static pan (status) {
    // pan 拖动
    Tool.graph.panningHandler.isForcePanningEvent = me => {
      Tool.graph.container.style.cursor = status ? 'move' : null
      return status
    }
  }

  // 打包XML文件
  static getXml () {
    // let encoder = new MxCodec()
    // let xx = encoder.encode(this.graph.getModel())
    // // 保存到getXml参数中
    // xx.setAttribute('backgroundImage', this.graph.backgroundImage.src)
    // const getXml = mxUtils.getXml(xx)
    // console.log(getXml)
    var encoder = new mxCodec()
    var node = encoder.encode(this.graph.getModel())
    // node.setAttribute('backgroundImage', this.graph.backgroundImage.src)
    mxUtils.popup(mxUtils.getPrettyXml(node), true)
  }

  static save () {
    let encoder = new mxCodec()
    let xx = encoder.encode(this.graph.getModel())
    // 保存到getXml参数中
    // xx.setAttribute('backgroundImage', this.graph.backgroundImage.src || '')
    const getXml = mxUtils.getXml(xx)
    sessionStorage.setItem('xml', getXml)
  }

  // 删除
  static delete () {
    // var cells = Tool.graph.getDeletableCells(Tool.graph.getSelectionCells())
    // console.log(cells)
    // Tool.graph.removeCells(cells)
    Tool.editor.execute('delete')
  }

  // 复制
  static copy () {
    Tool.editor.execute('copy')
  }

  // 粘贴
  static paste () {
    Tool.editor.execute('paste')
  }
}

export default Tool
