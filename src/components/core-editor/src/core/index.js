/*
 * @Description:
 * @Author: liuqiyu
 * @Date: 2019-12-04 15:00:15
 * @LastEditors  : liuqiyu
 * @LastEditTime : 2020-01-13 18:36:21
 */

import mxgraph from './mxgraph'
import { Editor } from './editor'
import Actions from './actions'
import KeyHandler from './keyHandler'
import Command from './command'
import Sidebar from './sidebar'
import OutLine from './outLine'
import Utils from './utils'

const {
  mxUtils,
  mxClient
} = mxgraph

function CoreEditor (container, setEnabled) {
  if (!mxClient.isBrowserSupported()) {
    // 判断是否支持mxgraph
    mxUtils.error('Browser is not supported!', 200, false)
  } else {
    /* eslint-disable no-new */
    this.editor = new Editor(this, container, setEnabled)
    this.actions = new Actions(this)
    this.KeyHandler = new KeyHandler(this)
    this.sidebar = new Sidebar(this)
    this.command = new Command(this)
  }
}

export {
  CoreEditor,
  OutLine,
  Utils,
  mxgraph
}
