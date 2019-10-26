import mxgraph from '@/utils/mxgraph'
import Tool from './tool'

const { mxEvent } = mxgraph

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
          Tool.zoomIn()
        } else {
          Tool.zoomOut()
        }

        mxEvent.consume(evt, false, false) // 消耗给定的事件
      }
    })
  }
}

export default MxEvents
