/*
 * @Description: format
 * @Author: liuqiyu
 * @Date: 2019-11-11 14:27:27
 * @LastEditors: liuqiyu
 * @LastEditTime: 2019-12-09 09:31:39
 */
import mxgraph from './mxgraph'
// import editor from './editor'
const {
  // mxUtils,
  mxEventObject,
  mxConstants
} = mxgraph
class Format {
  static editor = null;
  static graph = null;

  // Tool 初始化
  static init (editor) {
    this.editor = editor
    this.graph = editor.editor.graph
  }

  // 更新元件样式
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

  // 修改线条样式
  static edgeStyleChange (keys, values) {
    this.graph.getModel().beginUpdate()
    try {
      var cells = this.graph.getSelectionCells()
      var edges = []

      for (var i = 0; i < cells.length; i++) {
        var cell = cells[i]

        if (this.graph.getModel().isEdge(cell)) {
          var geo = this.graph.getCellGeometry(cell)

          // Resets all edge points
          if (geo != null) {
            geo = geo.clone()
            geo.points = null
            this.graph.getModel().setGeometry(cell, geo)
          }

          for (var j = 0; j < keys.length; j++) {
            console.log(keys[j], values[j])
            this.graph.setCellStyles(keys[j], values[j], [cell])
          }

          edges.push(cell)
        }
      }
      // todo 未能改变线条样式
      this.graph.fireEvent(new mxEventObject('styleChanged', 'keys', keys,
        'values', values, 'cells', edges))
    } finally {
      this.graph.getModel().endUpdate()
    }
  }

  // 更新字体样式 bold italic underline
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

  // 更新 值
  static updateValueHandler (value) {
    // 多选修改
    var cells = this.graph.getSelectionCells()
    cells.forEach(cell => {
      this.graph.cellLabelChanged(cell, value || '')
    })
  }

  // 更新 元件几何  宽高 X Y
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
    if (boolean) {
      this.editor.actions.actions['horizontal'].funct() // 等距分布 水平
    } else {
      this.editor.actions.actions['vertical'].funct() // 等距分布 垂直
    }
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

  // 移至最前
  static toFront () {
    this.editor.actions.actions['toFront'].funct() // 移至最前
  }

  // 移至最后
  static toBack () {
    this.editor.actions.actions['toBack'].funct() // 移至最后
  }
}

export default Format
