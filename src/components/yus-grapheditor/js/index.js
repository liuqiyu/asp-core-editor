/*
 * @Description:
 * @Author: liuqiyu
 * @Date: 2019-12-04 15:00:15
 * @LastEditors: liuqiyu
 * @LastEditTime: 2019-12-06 13:49:18
 */

import mxgraph from './mxgraph'
import { Editor } from './editor'
import Actions from './actions'
import initKeyHandler from './keyHandler'
import Tool from './toolbar'
import Format from './format'

const {
  mxUtils,
  mxClient
} = mxgraph

function CoreEditor (container, setEnabled) {
  if (!mxClient.isBrowserSupported()) {
    // 判断是否支持mxgraph
    mxUtils.error('Browser is not supported!', 200, false)
  } else {
    // this._init(container, setEnabled)
    /* eslint-disable no-new */
    this.editor = new Editor(this, container, setEnabled)
    this.actions = new Actions(this)
    this.initKeyHandler = new initKeyHandler(this)
    Tool.init(this)
    Format.init(this)
  }
}

export default CoreEditor
