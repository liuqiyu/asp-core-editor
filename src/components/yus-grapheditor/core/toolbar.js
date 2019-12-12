/*
 * @Description:
 * @Author: liuqiyu
 * @Date: 2019-11-11 14:27:27
 * @LastEditors: liuqiyu
 * @LastEditTime: 2019-12-12 11:39:29
 */
import mxgraph from './mxgraph'

const {
  mxUtils,
  mxCodec
} = mxgraph

class Tool {
  static editor = null
  static graph = null

  // Tool 初始化
  static init (editor) {
    console.log(editor)
    this.editor = editor
    this.graph = editor.editor.graph
    console.log(this.graph)
  }

  // 撤销
  static undo () {
    this.editor.actions.actions['undo'].funct()
  }

  // 重做
  static redo () {
    this.editor.actions.actions['redo'].funct()
  }

  // 放大
  static zoomIn () {
    // console.log(this.graph.view.scale)
    this.editor.actions.actions['zoomIn'].funct()
  }

  // 缩小
  static zoomOut () {
    // console.log(this.graph.view.scale)
    this.editor.actions.actions['zoomOut'].funct()
  }

  // 1:1还原
  static resetView () {
    // console.log(this.graph.view.scale)
    this.editor.actions.actions['resetView'].funct()
  }

  static pan (status) {
    // pan 拖动
    // Tool.graph.panningHandler.isForcePanningEvent = me => {
    //   Tool.graph.container.style.cursor = status ? 'move' : null
    //   return status
    // }
    this.editor.actions.actions['pan'].funct(status)
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
    console.log(getXml)
    localStorage.setItem('xml', getXml)
  }

  static exportXml () {
    this.editor.actions.actions['saveXml'].funct()
  }

  // 删除
  static delete () {
    this.editor.actions.actions['delete'].funct()
  }

  // 复制
  static copy () {
    this.editor.actions.actions['copy'].funct()
  }

  // 粘贴
  static paste () {
    this.editor.actions.actions['paste'].funct()
  }

  // 粘贴到此处
  static pasteHere () {
    this.editor.actions.actions['pasteHere'].funct()
  }
}

export default Tool
