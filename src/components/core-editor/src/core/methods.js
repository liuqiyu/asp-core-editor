/*
 * @Description: Methods
 * @Author: liuqiyu
 * @Date: 2019-11-11 14:27:27
 * @LastEditors  : liuqiyu
 * @LastEditTime : 2020-01-13 18:22:57
 */
import mxgraph from './mxgraph'
const {
  mxUtils,
  mxEventObject,
  mxConstants,
  mxCodec
} = mxgraph

export default function Methods (CoreEditor) {
  this.editor = CoreEditor.editor
  this.graph = this.editor.graph
}

Methods.prototype.updateStyleHandler = function (keyword, data) {
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

// 更新字体样式 bold italic underline
Methods.prototype.toggleFontStyle = function (style) {
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

// 更新 值 多选
Methods.prototype.updateValueHandler = function (value) {
  const cells = this.graph.getSelectionCells()
  cells.forEach(cell => {
    this.graph.cellLabelChanged(cell, value || '')
  })
}

// 更新 元件几何  宽高 X Y
Methods.prototype.updateGeometryHandler = function (value, func) {
  const cells = this.graph.getSelectionCells()
  this.graph.getModel().beginUpdate()
  try {
    cells.forEach(cell => {
      let geo = this.graph.getCellGeometry(cell)
      geo = geo.clone()
      func(geo, value)
      this.graph.getModel().setGeometry(cell, geo)
    })
  } finally {
    this.graph.getModel().endUpdate()
  }
}

// 返回style 对象
Methods.prototype.updateGeometryHandler = function () {
  let cells = this.graph.getSelectionCells()
  let shape = null
  for (let i = 0; i < cells.length; i++) {
    let state = this.graph.view.getState(cells[i])
    if (state !== null) {
      shape = state.style
    }
  }
  return shape
}

// 返回style 对象
Methods.prototype.getSelectionState = function () {
  let cells = this.graph.getSelectionCells()
  let shape = null
  for (let i = 0; i < cells.length; i++) {
    let state = this.graph.view.getState(cells[i])
    if (state !== null) {
      shape = state.style
    }
  }
  return shape
}

// 更新 label position
Methods.prototype.changeLabelPosition = function (value) {
  const positions = {
    'topLeft': [mxConstants.ALIGN_LEFT, mxConstants.ALIGN_TOP, mxConstants.ALIGN_RIGHT, mxConstants.ALIGN_BOTTOM],
    'top': [mxConstants.ALIGN_CENTER, mxConstants.ALIGN_TOP, mxConstants.ALIGN_CENTER, mxConstants.ALIGN_BOTTOM],
    'topRight': [mxConstants.ALIGN_RIGHT, mxConstants.ALIGN_TOP, mxConstants.ALIGN_LEFT, mxConstants.ALIGN_BOTTOM],
    'left': [mxConstants.ALIGN_LEFT, mxConstants.ALIGN_MIDDLE, mxConstants.ALIGN_RIGHT, mxConstants.ALIGN_MIDDLE],
    'center': [mxConstants.ALIGN_CENTER, mxConstants.ALIGN_MIDDLE, mxConstants.ALIGN_CENTER, mxConstants.ALIGN_MIDDLE],
    'right': [mxConstants.ALIGN_RIGHT, mxConstants.ALIGN_MIDDLE, mxConstants.ALIGN_LEFT, mxConstants.ALIGN_MIDDLE],
    'bottomLeft': [mxConstants.ALIGN_LEFT, mxConstants.ALIGN_BOTTOM, mxConstants.ALIGN_RIGHT, mxConstants.ALIGN_TOP],
    'bottom': [mxConstants.ALIGN_CENTER, mxConstants.ALIGN_BOTTOM, mxConstants.ALIGN_CENTER, mxConstants.ALIGN_TOP],
    'bottomRight': [mxConstants.ALIGN_RIGHT, mxConstants.ALIGN_BOTTOM, mxConstants.ALIGN_LEFT, mxConstants.ALIGN_TOP]
  }
  this.graph.getModel().beginUpdate()
  try {
    let vals = positions[value]

    if (vals != null) {
      this.graph.setCellStyles(mxConstants.STYLE_LABEL_POSITION, vals[0], this.graph.getSelectionCells())
      this.graph.setCellStyles(mxConstants.STYLE_VERTICAL_LABEL_POSITION, vals[1], this.graph.getSelectionCells())
      this.graph.setCellStyles(mxConstants.STYLE_ALIGN, vals[2], this.graph.getSelectionCells())
      this.graph.setCellStyles(mxConstants.STYLE_VERTICAL_ALIGN, vals[3], this.graph.getSelectionCells())
    }
  } finally {
    this.graph.getModel().endUpdate()
  }
}

// 字体
Methods.prototype.handleFontDefaults = function (value) {
  this.graph.getModel().beginUpdate()
  try {
    console.log(value)
    this.graph.setCellStyles(mxConstants.STYLE_FONTFAMILY, value, this.graph.getSelectionCells())
  } finally {
    this.graph.getModel().endUpdate()
  }
}

// -----------------------------------
// 修改线条样式
Methods.prototype.edgeStyleChange = function (keys, values) {
  this.graph.getModel().beginUpdate()
  try {
    let cells = this.graph.getSelectionCells()
    let edges = []

    for (let i = 0; i < cells.length; i++) {
      let cell = cells[i]

      if (this.graph.getModel().isEdge(cell)) {
        let geo = this.graph.getCellGeometry(cell)

        // Resets all edge points
        if (geo != null) {
          geo = geo.clone()
          geo.points = null
          this.graph.getModel().setGeometry(cell, geo)
        }

        for (let j = 0; j < keys.length; j++) {
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

// 修改线条箭头样式
Methods.prototype.edgeFillChange = function (key, value) {
  let style = (key === 'startFill' ? 'STYLE_STARTARROW' : 'STYLE_ENDARROW')

  switch (value) {
    case 'none':
      this.edgeStyleChange([mxConstants[style], key], [mxConstants.NONE, 0])
      break
    case 'default':
      this.edgeStyleChange([mxConstants[style], key], [mxConstants.ARROW_CLASSIC, 1])
      break
  }
}

// 修改线条类型 尖角 圆角 曲线
Methods.prototype.edgeTypeChange = function (key) {
  switch (key) {
    case 'sharp':
      this.edgeStyleChange([mxConstants.STYLE_ROUNDED, mxConstants.STYLE_CURVED], ['0', null])
      break
    case 'rounded':
      this.edgeStyleChange([mxConstants.STYLE_ROUNDED, mxConstants.STYLE_CURVED], ['1', null])
      break
    case 'curved':
      this.edgeStyleChange([mxConstants.STYLE_ROUNDED, mxConstants.STYLE_CURVED], [null, '1'])
      break
  }
}

//  线条样式 虚线 实线
Methods.prototype.edgeBorderStyleChange = function (key) {
  switch (key) {
    case 'solid':
      this.edgeStyleChange([mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN], [null, null])
      break
    case 'dashed':
      this.edgeStyleChange([mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN], ['1', null])
      break
  }
}

// 线条航点
Methods.prototype.edgeWaypointsChange = function (key) {
  let constant, value
  switch (key) {
    case 'none':
      constant = [mxConstants.STYLE_EDGE, mxConstants.STYLE_CURVED, mxConstants.STYLE_NOEDGESTYLE]
      value = [null, null, null]
      break
    case 'orthogonalEdgeStyle':
      constant = [mxConstants.STYLE_EDGE, mxConstants.STYLE_CURVED, mxConstants.STYLE_NOEDGESTYLE]
      value = ['orthogonalEdgeStyle', null, null]
      break
    case 'elbowEdgeStyle':
      constant = [mxConstants.STYLE_EDGE, mxConstants.STYLE_ELBOW, mxConstants.STYLE_CURVED, mxConstants.STYLE_NOEDGESTYLE]
      value = ['elbowEdgeStyle', null, null, null]
      break
    case 'elbowEdgeStyleVertical':
      constant = [mxConstants.STYLE_EDGE, mxConstants.STYLE_ELBOW, mxConstants.STYLE_CURVED, mxConstants.STYLE_NOEDGESTYLE]
      value = ['elbowEdgeStyle', 'vertical', null, null]
      break
    case 'entityRelationEdgeStyle':
      constant = [mxConstants.STYLE_EDGE, mxConstants.STYLE_CURVED, mxConstants.STYLE_NOEDGESTYLE]
      value = ['entityRelationEdgeStyle', null, null]
      break
  }
  this.edgeStyleChange(constant, value)
}

// --------------获取初始化样式------------
// 获取 文字样式 粗细 斜体 下划线
Methods.prototype.getFontStyle = function (ss) {
  let fontStyle = mxUtils.getValue(ss, mxConstants.STYLE_FONTSTYLE, 0)
  let fontStyleArr = []
  if ((fontStyle & mxConstants.FONT_BOLD) === mxConstants.FONT_BOLD) {
    fontStyleArr.push('bold')
  }
  if ((fontStyle & mxConstants.FONT_ITALIC) === mxConstants.FONT_ITALIC) {
    fontStyleArr.push('italic')
  }
  if ((fontStyle & mxConstants.FONT_UNDERLINE) === mxConstants.FONT_UNDERLINE) {
    fontStyleArr.push('underline')
  }
  return fontStyleArr
}

// 获取 文字位置
Methods.prototype.getLabelPosition = function (ss) {
  let labelPosition = null
  let pos = mxUtils.getValue(ss, mxConstants.STYLE_LABEL_POSITION, mxConstants.ALIGN_CENTER)
  let vpos = mxUtils.getValue(ss, mxConstants.STYLE_VERTICAL_LABEL_POSITION, mxConstants.ALIGN_MIDDLE)

  if (pos === mxConstants.ALIGN_LEFT && vpos === mxConstants.ALIGN_TOP) {
    labelPosition = 'topLeft'
  } else if (pos === mxConstants.ALIGN_CENTER && vpos === mxConstants.ALIGN_TOP) {
    labelPosition = 'top'
  } else if (pos === mxConstants.ALIGN_RIGHT && vpos === mxConstants.ALIGN_TOP) {
    labelPosition = 'topRight'
  } else if (pos === mxConstants.ALIGN_LEFT && vpos === mxConstants.ALIGN_BOTTOM) {
    labelPosition = 'bottomLeft'
  } else if (pos === mxConstants.ALIGN_CENTER && vpos === mxConstants.ALIGN_BOTTOM) {
    labelPosition = 'bottom'
  } else if (pos === mxConstants.ALIGN_RIGHT && vpos === mxConstants.ALIGN_BOTTOM) {
    labelPosition = 'bottomRight'
  } else if (pos === mxConstants.ALIGN_LEFT) {
    labelPosition = 'left'
  } else if (pos === mxConstants.ALIGN_RIGHT) {
    labelPosition = 'right'
  } else {
    labelPosition = 'center'
  }
  return labelPosition
}

// 获取 开始结束箭头
Methods.prototype.getEdgeFill = function (key, ss) {
  let val = null
  switch (key) {
    case 'startFill':
      val = mxUtils.getValue(ss, mxConstants.STYLE_STARTARROW, null) && mxUtils.getValue(ss, 'startFill', '1')
      break
    case 'endFill':
      val = mxUtils.getValue(ss, mxConstants.STYLE_ENDARROW, null) && mxUtils.getValue(ss, 'endFill', '1')
      break
  }
  return val
}

// 获取 开始结束箭头
Methods.prototype.getEdgeFill = function (key, ss) {
  let val = null
  switch (key) {
    case 'startFill':
      val = mxUtils.getValue(ss, mxConstants.STYLE_STARTARROW, null) && mxUtils.getValue(ss, 'startFill', '1')
      break
    case 'endFill':
      val = mxUtils.getValue(ss, mxConstants.STYLE_ENDARROW, null) && mxUtils.getValue(ss, 'endFill', '1')
      break
  }
  return val
}

// 获取 线条航点
Methods.prototype.getWaypoints = function (ss) {
  let waypoints = null
  let es = mxUtils.getValue(ss, mxConstants.STYLE_EDGE, null)
  if (mxUtils.getValue(ss, mxConstants.STYLE_NOEDGESTYLE, null) === '1') {
    es = null
  }
  if (es === 'orthogonalEdgeStyle') {
    waypoints = 'orthogonalEdgeStyle' // 正交
  } else if (es === 'straight' || es === 'none' || es == null) {
    waypoints = 'none' // 直线
  } else if (es === 'entityRelationEdgeStyle') {
    waypoints = 'entityRelationEdgeStyle' // 实体关系
  } else if (es === 'elbowEdgeStyle') {
    if (mxUtils.getValue(ss, mxConstants.STYLE_ELBOW, null) === 'vertical') {
      waypoints = 'elbowEdgeStyleVertical' // 等尺寸
    } else {
      waypoints = 'elbowEdgeStyle' // 简单
    }
  } else if (es === 'isometricEdgeStyle') {
    waypoints = 'isometricEdgeStyle'
  } else {
    waypoints = 'none'
  }
  return waypoints
}

// 线条类型 曲线 圆角 尖角
Methods.prototype.getEdgeType = function (ss) {
  let edgeType
  const curved = mxUtils.getValue(ss, mxConstants.STYLE_CURVED, null)
  const rounded = mxUtils.getValue(ss, mxConstants.STYLE_ROUNDED, null)
  if (!curved && rounded === 1) {
    edgeType = 'rounded'
  } else if (curved === 1 && rounded === 1) {
    edgeType = 'curved'
  } else {
    edgeType = 'sharp'
  }
  return edgeType
}

// 线条样式 虚线 实线
Methods.prototype.getEdgeStyle = function (ss) {
  const dashed = mxUtils.getValue(ss, mxConstants.STYLE_DASHED, null)

  return dashed === 1 ? 'dashed' : 'solid'
}

// 统一的actions执行函数
Methods.prototype.actions = function (name, args) {
  this.editor.editor.actions.actions[name].funct(args)
}

// 打包XML文件
Methods.prototype.showXml = function () {
  // let encoder = new MxCodec()
  // let xx = encoder.encode(this.graph.getModel())
  // // 保存到getXml参数中
  // xx.setAttribute('backgroundImage', this.graph.backgroundImage.src)
  // const getXml = mxUtils.getXml(xx)
  // console.log(getXml)
  let encoder = new mxCodec()
  let node = encoder.encode(this.graph.getModel())
  // node.setAttribute('backgroundImage', this.graph.backgroundImage.src)
  mxUtils.popup(mxUtils.getPrettyXml(node), true)
}

// 保存xml数据
Methods.prototype.save = function (func) {
  let encoder = new mxCodec()
  let xx = encoder.encode(this.graph.getModel())
  // 保存到getXml参数中
  // xx.setAttribute('backgroundImage', this.graph.backgroundImage.src || '')
  const getXml = mxUtils.getXml(xx)
  if (typeof func === 'function') {
    func(getXml, this.graph)
  }
}
