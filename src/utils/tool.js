/*
 * @Description:
 * @Author: liuqiyu
 * @Date: 2019-11-11 14:27:27
 * @LastEditors: liuqiyu
 * @LastEditTime: 2019-11-12 17:11:59
 */
import mxgraph from '@/utils/mxgraph'

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
    mxUtils.popup(mxUtils.getPrettyXml(node), true)
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
