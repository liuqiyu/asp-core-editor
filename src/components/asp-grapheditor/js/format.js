/*
 * @Description: format
 * @Author: liuqiyu
 * @Date: 2019-11-11 14:27:27
 * @LastEditors: liuqiyu
 * @LastEditTime: 2019-11-25 18:48:42
 */
import mxgraph from './mxgraph'
import editor from './editor'
const {
  // mxUtils,
  mxConstants
} = mxgraph
class Format {
  static editor = null;
  static graph = null;

  // Tool 初始化
  static init (editor, graph) {
    this.editor = editor
    this.graph = graph
  }

  // update style
  static updateStyleHandler (keyword, data) {
    this.graph.getModel().beginUpdate()
    try {
      this.graph.setCellStyles(
        keyword,
        data,
        this.graph.getSelectionCells()
      )
    } finally {
      this.graph.getModel().endUpdate()
    }
  }

  // update edge type style
  static updateEdgeTypeStyleHandler (keyword, data) {
    const keys = [mxConstants.STYLE_ROUNDED, mxConstants.STYLE_CURVED]

    var values = ['0', null]

    if (keyword === 'rounded') {
      values = ['1', null]
    } else if (keyword === 'curved') {
      values = [null, '1']
    }

    for (var i = 0; i < keys.length; i++) {
      this.graph.setCellStyles(keys[i], values[i], this.graph.getSelectionCells())
    }
  }

  // update fontStyle
  static toggleFontStyle (style) {
    let fontStyle
    switch (style) {
      case 'bold':
        fontStyle = mxConstants.FONT_BOLD
        break
      case 'italic':
        fontStyle = mxConstants.FONT_ITALIC
        break
      case 'underline':
        fontStyle = mxConstants.FONT_UNDERLINE
        break
      default:
        break
    }
    this.graph.getModel().beginUpdate()
    try {
      this.graph.toggleCellStyleFlags(mxConstants.STYLE_FONTSTYLE, fontStyle)
    } finally {
      this.graph.getModel().endUpdate()
    }
  }

  // update value
  static updateValueHandler (value) {
    // 多选修改
    var cells = this.graph.getSelectionCells()
    cells.forEach(cell => {
      this.graph.cellLabelChanged(cell, value || '')
    })
  }

  // update Geometry  width height x y
  static updateGeometryHandler (value, func) {
    const cells = this.graph.getSelectionCells()
    this.graph.getModel().beginUpdate()
    try {
      cells.forEach(cell => {
        var geo = this.graph.getCellGeometry(cell)
        geo = geo.clone()
        func(geo, value)
        this.graph.getModel().setGeometry(cell, geo)
      })
    } finally {
      this.graph.getModel().endUpdate()
    }
  }

  static FlipCells (style) {
    this.graph.toggleCellStyles(style, false)
  }

  // 对齐
  static align (align) {
    this.graph.alignCells(align)
  }

  // 等距分布
  static distributeCells (boolean) {
    editor.distributeCells(boolean)
  }

  static initFormatField (cell) {
    console.log(cell)
  }

  // 返回style 对象
  static getSelectionState () {
    var cells = this.graph.getSelectionCells()
    var shape = null

    for (var i = 0; i < cells.length; i++) {
      var state = this.graph.view.getState(cells[i])
      // console.log(state)

      if (state !== null) {
        shape = state.style
      }
    }

    return shape
  }
}

export default Format
