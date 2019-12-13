/*
 * @Description:
 * @Author: liuqiyu
 * @Date: 2019-12-04 15:00:15
 * @LastEditors: liuqiyu
 * @LastEditTime: 2019-12-13 14:25:17
 */

import mxgraph from './mxgraph'
import { Editor } from './editor'
import Actions from './actions'
import initKeyHandler from './keyHandler'
import Tool from './toolbar'
import Format from './format'
import Sidebar from './sidebar'

export {
  Tool,
  Format
}

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
    this.initKeyHandler = new initKeyHandler(this)
    Tool.init(this)
    Format.init(this)
    Sidebar.init(this)
  }
}

export default CoreEditor