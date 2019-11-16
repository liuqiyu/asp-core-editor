/*
 * @Description:
 * @Author: liuqiyu
 * @Date: 2019-11-11 14:27:27
 * @LastEditors: liuqiyu
 * @LastEditTime: 2019-11-11 17:46:49
 */
// import mxgraph from '@/utils/mxgraph'
// const { mxUtils, mxConstants } = mxgraph
class Format {
  static editor = null
  static graph = null

  // Tool 初始化
  static init (editor, graph) {
    this.editor = editor
    this.graph = graph
  }

  static update (keyword, data) {
    const cells = this.editor.graph.getSelectionCells()
    cells.forEach(cell => {
      this._updateSelectionCell(cell, cells, keyword, data)
    })
  }
  static _updateSelectionCell (cell, cells, keyword, data) {
    console.log(cell)
    console.log(cells)
    // const state = this.graph.view.getState(cell)
    console.log(this.graph)
    this.graph.setCellStyles(
      keyword,
      data[keyword],
      this.graph.getSelectionCells()
    )
    // this.graph.selectVertices('width', '1000', this.graph.getSelectionCells())
  }

  static initFormatField (cell) {
    console.log(cell)
  }

  // static setCellStyles (keyword, style) {}

  static getSelectionState () {
    var cells = this.graph.getSelectionCells()
    var shape = null
    console.log(cells)

    for (var i = 0; i < cells.length; i++) {
      var state = this.graph.view.getState(cells[i])
      console.log(state)

      if (state !== null) {
        // var tmp = mxUtils.getValue(state.style, mxConstants.STYLE_SHAPE, null)
        // console.log(tmp)

        // if (tmp != null) {
        //   if (shape == null) {
        //     shape = tmp
        //   } else if (shape !== tmp) {
        //     return null
        //   }
        // }
        shape = state.style
      }
    }

    return shape
  }
}

export default Format
