/*
 * @Description: actions
 * @Author: liuqiyu
 * @Date: 2019-11-11 14:27:27
 * @LastEditors: liuqiyu
 * @LastEditTime: 2019-11-18 18:11:45
 */
import mxgraph from '@/utils/mxgraph'
const {
  mxResources,
  mxEventSource,
  mxConstants
} = mxgraph
class Actions {
  static editor = null
  static graph = null
  static actions = {}

  // Tool 初始化
  static init (editor, graph) {
    this.editor = editor
    this.graph = graph
    console.log(mxConstants)
    // this.addAction('toFront', () => {
    //   this.graph.orderCells(false)
    // }, null, null, 'Ctrl+Shift+F')
  }

  static get (name) {
    return this.actions[name]
  }

  static addAction (key, funct, enabled, iconCls, shortcut) {
    let title

    if (key.substring(key.length - 3) === '...') {
      key = key.substring(0, key.length - 3)
      title = mxResources.get(key) + '...'
    } else {
      title = mxResources.get(key)
    }

    return this.put(key, new Action(title, funct, enabled, iconCls, shortcut))
  }

  static createFunction (funct) {
    return funct
  }
}

function Action (label, funct, enabled, iconCls, shortcut) {
  mxEventSource.call(this)
  console.log(this)
  this.label = label
  this.funct = this.createFunction(funct)
  this.enabled = (enabled != null) ? enabled : true
  this.iconCls = iconCls
  this.shortcut = shortcut
  this.visible = true
};

export default Actions
