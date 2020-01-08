/*
 * @Description: event
 * @Author: liuqiyu
 * @Date: 2019-11-11 14:27:27
 * @LastEditors  : liuqiyu
 * @LastEditTime : 2020-01-08 15:22:47
 */
import mxgraph from './mxgraph'
import Tool from './toolbar'

const {
  mxEvent
} = mxgraph

// let MxOutline = mxOutline

class MxEvents {
  static init () {
    this.addMouseWheelListener()
  }
  static addMouseWheelListener () {
    // 监听鼠标滚动事件
    mxEvent.addMouseWheelListener((evt, up) => {
      if (!mxEvent.isConsumed(evt)) {
        if (up) {
          Tool.actions('zoomIn')
        } else {
          Tool.actions('zoomOut')
        }

        mxEvent.consume(evt, false, false) // 消耗给定的事件
      }
    })
  }
}

export default MxEvents
