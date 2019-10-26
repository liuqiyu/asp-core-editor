import mxgraph from '@/utils/mxgraph'

const { mxUtils, mxCodec } = mxgraph

let MxCodec = mxCodec

class Tool {
  static graph = null

  // Tool 初始化
  static init (graph) {
    this.graph = graph
  }
  // 放大
  static zoomIn () {
    console.log(this.graph.view.scale)
    this.graph.zoomIn()
  }

  // 缩小
  static zoomOut () {
    console.log(this.graph.view.scale)
    this.graph.zoomOut()
  }

  // 1:1还原
  static zoomActual () {
    console.log(this.graph.view.scale)
    this.graph.zoomActual()
  }

  // 撤销
  static undo () {
    this.undoManager.undo()
  }

  // 重做
  static redo () {
    this.undoManager.redo()
  }

  // 打包XML文件
  static getXml () {
    let encoder = new MxCodec()
    let xx = encoder.encode(this.graph.getModel())
    // 保存到getXml参数中
    xx.setAttribute('backgroundImage', this.graph.backgroundImage.src)
    const getXml = mxUtils.getXml(xx)
    console.log(getXml)
  }

  // 打包XML文件
  static delete () {
    var cells = this.graph.getDeletableCells(this.graph.getSelectionCells())
    this.graph.removeCells(cells)
  }
}

export default Tool
