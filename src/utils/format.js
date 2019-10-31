// import mxgraph from '@/utils/mxgraph'

// const {
// } = mxgraph

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
    this.graph.setCellStyles(keyword, data[keyword], this.graph.getSelectionCells())
    // this.graph.selectVertices('width', '1000', this.graph.getSelectionCells())
  }
}

export default Format
