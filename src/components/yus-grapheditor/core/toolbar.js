/*
 * @Description: toobar
 * @Author: liuqiyu
 * @Date: 2019-11-11 14:27:27
 * @LastEditors: liuqiyu
 * @LastEditTime: 2019-12-17 14:57:07
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
    this.editor = editor
    this.graph = editor.editor.graph
    console.log(this.graph)
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

  // 粘贴到此处
  static pasteHere () {
    this.editor.actions.actions['pasteHere'].funct()
  }

  // 统一的actions执行函数
  static actions (name, args) {
    this.editor.actions.actions[name].funct(args)
  }
}

export default Tool
