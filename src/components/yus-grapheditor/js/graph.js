/*
 * @Description: graph init
 * @Author: liuqiyu
 * @Date: 2019-11-25 09:43:50
 * @LastEditors: liuqiyu
 * @LastEditTime: 2019-12-02 18:06:50
 */

import Base64 from './../utils/base64'
import mxgraph from './mxgraph'
import { IMAGE_PATH } from './path'

const {
  mxImage,
  mxClient,
  mxUtils,
  mxConstants,
  mxEdgeHandler,
  mxGraphHandler,
  mxRubberband,
  mxGuide,
  mxPoint,
  mxEvent,
  mxConnectionHandler,
  mxVertexHandler,
  mxCellHighlight,
  mxGraphView,
  // mxCellEditor,
  mxConstraintHandler,
  mxConnectionConstraint,
  // mxEllipse,
  mxPolyline,
  mxCellState
} = mxgraph

var defaultEdgeStyle = {
  'edgeStyle': 'orthogonalEdgeStyle',
  'rounded': '0',
  'jettySize': 'auto',
  'orthogonalLoop': '1'
}

function Graph (graph) {
  // Graph.call(graph)
  this.currentEdgeStyle = mxUtils.clone(defaultEdgeStyle)
  graph.defaultEdgeStyle = this.currentEdgeStyle
  graph.currentEdgeStyle = this.currentEdgeStyle
  graph.createCurrentEdgeStyle = function () {
    var style = 'edgeStyle=' + (this.currentEdgeStyle['edgeStyle'] || 'none') + ';'

    if (!(this.currentEdgeStyle['shape'] === null || this.currentEdgeStyle['shape'] === undefined)) {
      style += 'shape=' + this.currentEdgeStyle['shape'] + ';'
    }

    if (!(this.currentEdgeStyle['curved'] === null || this.currentEdgeStyle['curved'] === undefined)) {
      style += 'curved=' + this.currentEdgeStyle['curved'] + ';'
    }

    if (!(this.currentEdgeStyle['rounded'] === null || this.currentEdgeStyle['rounded'] === undefined)) {
      style += 'rounded=' + this.currentEdgeStyle['rounded'] + ';'
    }

    if (!(this.currentEdgeStyle['comic'] === null || this.currentEdgeStyle['comic'] === undefined)) {
      style += 'comic=' + this.currentEdgeStyle['comic'] + ';'
    }

    if (!(this.currentEdgeStyle['jumpStyle'] === null || this.currentEdgeStyle['jumpStyle'] === undefined)) {
      style += 'jumpStyle=' + this.currentEdgeStyle['jumpStyle'] + ';'
    }

    if (!(this.currentEdgeStyle['jumpSize'] === null || this.currentEdgeStyle['jumpSize'] === undefined)) {
      style += 'jumpSize=' + this.currentEdgeStyle['jumpSize'] + ';'
    }

    // Special logic for custom property of elbowEdgeStyle
    if (this.currentEdgeStyle['edgeStyle'] === 'elbowEdgeStyle' && !(this.currentEdgeStyle['elbow'] === null || this.currentEdgeStyle['elbow'] === undefined)) {
      style += 'elbow=' + this.currentEdgeStyle['elbow'] + ';'
    }

    if (!(this.currentEdgeStyle['html'] === null || this.currentEdgeStyle['html'] === undefined)) {
      style += 'html=' + this.currentEdgeStyle['html'] + ';'
    } else {
      style += 'html=1;'
    }

    return style
  }

  if (typeof mxVertexHandler !== 'undefined') {
    // 禁用内置连接启动
    graph.connectionHandler.isValidSource = function (cell, me) {
      return false
    }
  }

  // hover 锚点
  graph.getAllConnectionConstraints = function (terminal) {
    if (terminal != null && this.model.isVertex(terminal.cell)) {
      return [new mxConnectionConstraint(new mxPoint(0.25, 0), true),
        new mxConnectionConstraint(new mxPoint(0.5, 0), true),
        new mxConnectionConstraint(new mxPoint(0.75, 0), true),
        new mxConnectionConstraint(new mxPoint(0, 0.25), true),
        new mxConnectionConstraint(new mxPoint(0, 0.5), true),
        new mxConnectionConstraint(new mxPoint(0, 0.75), true),
        new mxConnectionConstraint(new mxPoint(1, 0.25), true),
        new mxConnectionConstraint(new mxPoint(1, 0.5), true),
        new mxConnectionConstraint(new mxPoint(1, 0.75), true),
        new mxConnectionConstraint(new mxPoint(0.25, 1), true),
        new mxConnectionConstraint(new mxPoint(0.5, 1), true),
        new mxConnectionConstraint(new mxPoint(0.75, 1), true)
      ]
    }
    return null
  }
}

// Helper function (requires atob).
Graph.createSvgImage = function (w, h, data) {
  var tmp = unescape(encodeURIComponent(
    '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">' +
    '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="' + w + 'px" height="' + h + 'px" ' +
    'version="1.1">' + data + '</svg>'))

  return new mxImage('data:image/svg+xml;base64,' + ((window.btoa) ? btoa(tmp) : Base64.encode(tmp, true)), w, h)
}

function HoverIcons () { }

HoverIcons.prototype.mainHandle = (!mxClient.IS_SVG) ? new mxImage(IMAGE_PATH + '/handle-main.png', 17, 17)
  : Graph.createSvgImage(18, 18, '<circle cx="9" cy="9" r="5" stroke="#fff" fill="#007dfc" stroke-width="1"/>')
HoverIcons.prototype.secondaryHandle = (!mxClient.IS_SVG) ? new mxImage(IMAGE_PATH + '/handle-secondary.png', 17, 17)
  : Graph.createSvgImage(16, 16, '<path d="m 8 3 L 13 8 L 8 13 L 3 8 z" stroke="#fff" fill="#fca000"/>')
HoverIcons.prototype.fixedHandle = (!mxClient.IS_SVG) ? new mxImage(IMAGE_PATH + '/handle-fixed.png', 17, 17)
  : Graph.createSvgImage(18, 18, '<circle cx="9" cy="9" r="5" stroke="#fff" fill="#007dfc" stroke-width="1"/><path d="m 7 7 L 11 11 M 7 11 L 11 7" stroke="#fff"/>')
HoverIcons.prototype.terminalHandle = (!mxClient.IS_SVG) ? new mxImage(IMAGE_PATH + '/handle-terminal.png', 17, 17)
  : Graph.createSvgImage(18, 18, '<circle cx="9" cy="9" r="5" stroke="#fff" fill="#007dfc" stroke-width="1"/><circle cx="9" cy="9" r="2" stroke="#fff" fill="transparent"/>')
HoverIcons.prototype.rotationHandle = new mxImage((mxClient.IS_SVG) ? 'data:image/png;base64,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'
  : IMAGE_PATH + '/handle-rotate.png', 19, 21)

if (mxClient.IS_SVG) {
  mxConstraintHandler.prototype.pointImage = Graph.createSvgImage(5, 5, '<path d="m 0 0 L 5 5 M 0 5 L 5 0" stroke="#007dfc"/>')
}

export default Graph;

(function () {
  // 设置句柄的颜色
  mxConstants.HANDLE_FILLCOLOR = '#99ccff'
  mxConstants.HANDLE_STROKECOLOR = '#0088cf'
  mxConstants.VERTEX_SELECTION_COLOR = '#00a8ff'
  mxConstants.OUTLINE_COLOR = '#00a8ff'
  mxConstants.OUTLINE_HANDLE_FILLCOLOR = '#99ccff'
  mxConstants.OUTLINE_HANDLE_STROKECOLOR = '#00a8ff'
  mxConstants.CONNECT_HANDLE_FILLCOLOR = '#cee7ff'
  mxConstants.EDGE_SELECTION_COLOR = '#00a8ff'
  mxConstants.DEFAULT_VALID_COLOR = '#00a8ff'
  mxConstants.LABEL_HANDLE_FILLCOLOR = '#cee7ff'
  mxConstants.GUIDE_COLOR = '#0088cf' // 将参考线定义为红色（默认）
  mxConstants.GUIDE_STROKEWIDTH = 1
  mxConstants.HIGHLIGHT_OPACITY = 30
  mxConstants.HIGHLIGHT_SIZE = 4

  // Enables snapping to off-grid terminals for edge waypoints 启用对边缘航路点的离网终端的捕捉
  mxEdgeHandler.prototype.snapToTerminals = true

  // Enables guides 启用指南
  mxGraphHandler.prototype.guidesEnabled = true

  // Enables fading of rubberband 使橡胶带褪色
  mxRubberband.prototype.fadeOut = true

  // Alt-move disables guides Alt move禁用辅助线
  mxGuide.prototype.isEnabledForEvent = function (evt) {
    return !mxEvent.isAltDown(evt)
  }
  // 选中元件锚点
  var mxGraphViewUpdateFloatingTerminalPoint = mxGraphView.prototype.updateFloatingTerminalPoint

  mxGraphView.prototype.updateFloatingTerminalPoint = function (edge, start, end, source) {
    if (start != null && edge != null &&
      (start.style['snapToPoint'] === '1' ||
        edge.style['snapToPoint'] === '1')) {
      start = this.getTerminalPort(edge, start, source)
      var next = this.getNextPoint(edge, end, source)

      var orth = this.graph.isOrthogonal(edge)
      var alpha = mxUtils.toRadians(Number(start.style[mxConstants.STYLE_ROTATION] || '0'))
      var center = new mxPoint(start.getCenterX(), start.getCenterY())

      if (alpha !== 0) {
        var cos = Math.cos(-alpha)
        var sin = Math.sin(-alpha)
        next = mxUtils.getRotatedPoint(next, cos, sin, center)
      }

      var border = parseFloat(edge.style[mxConstants.STYLE_PERIMETER_SPACING] || 0)
      border += parseFloat(edge.style[(source) ? mxConstants.STYLE_SOURCE_PERIMETER_SPACING : mxConstants.STYLE_TARGET_PERIMETER_SPACING] || 0)
      var pt = this.getPerimeterPoint(start, next, alpha === 0 && orth, border)

      if (alpha !== 0) {
        cos = Math.cos(alpha)
        sin = Math.sin(alpha)
        pt = mxUtils.getRotatedPoint(pt, cos, sin, center)
      }

      edge.setAbsoluteTerminalPoint(this.snapToAnchorPoint(edge, start, end, source, pt), source)
    } else {
      mxGraphViewUpdateFloatingTerminalPoint.apply(this, arguments)
    }
  }
  mxGraphView.prototype.snapToAnchorPoint = function (edge, start, end, source, pt) {
    if (start !== null && edge !== null) {
      var constraints = this.graph.getAllConnectionConstraints(start)
      var nearest = null
      var dist = null

      if (constraints !== null) {
        for (var i = 0; i < constraints.length; i++) {
          var cp = this.graph.getConnectionPoint(start, constraints[i])

          if (cp != null) {
            var tmp = (cp.x - pt.x) * (cp.x - pt.x) + (cp.y - pt.y) * (cp.y - pt.y)

            if (dist === null || tmp < dist) {
              nearest = cp
              dist = tmp
            }
          }
        }
      }

      if (nearest != null) {
        pt = nearest
      }
    }

    return pt
  }

  // Extends connection handler to enable ctrl+drag for cloning source cell
  // since copyOnConnect is now disabled by default
  // const mxConnectionHandlerCreateTarget = mxConnectionHandler.prototype.isCreateTarget;
  // mxConnectionHandler.prototype.isCreateTarget = function (evt) {
  //   return mxEvent.isControlDown(evt) || mxConnectionHandlerCreateTarget.apply(this, arguments);
  // };

  // Overrides highlight shape for connection points 替代连接点的亮显形状
  // mxConstraintHandler.prototype.createHighlightShape = function () {
  //   var hl = new mxEllipse(null, this.highlightColor, this.highlightColor, 0);
  //   hl.opacity = mxConstants.HIGHLIGHT_OPACITY;

  //   return hl;
  // };

  // No dashed shapes.
  mxGuide.prototype.createGuideShape = function (horizontal) {
    var guide = new mxPolyline([], mxConstants.GUIDE_COLOR, mxConstants.GUIDE_STROKEWIDTH)

    return guide
  }

  // 替代边预览以使用当前边形状和默认样式
  mxConnectionHandler.prototype.livePreview = true
  mxConnectionHandler.prototype.cursor = 'crosshair'

  //  使用当前边样式进行连接预览
  mxConnectionHandler.prototype.createEdgeState = function (me) {
    let style = this.graph.createCurrentEdgeStyle()
    let edge = this.graph.createEdge(null, null, null, null, null, style)
    let state = new mxCellState(this.graph.view, edge, this.graph.getCellStyle(edge))

    for (var key in this.graph.currentEdgeStyle) {
      state.style[key] = this.graph.currentEdgeStyle[key]
    }
    return state
  }

  //  使用当前边样式替代虚线状态
  var connectionHandlerCreateShape = mxConnectionHandler.prototype.createShape
  mxConnectionHandler.prototype.createShape = function () {
    var shape = connectionHandlerCreateShape.apply(this, arguments)

    shape.isDashed = this.graph.currentEdgeStyle[mxConstants.STYLE_DASHED] === '1'

    return shape
  }

  // 覆盖实时预览以保持当前样式
  mxConnectionHandler.prototype.updatePreview = function (valid) {
    // do not change color of preview
  }

  //  重写连接处理程序以忽略边，而不是不允许连接
  var mxConnectionHandlerCreateMarker = mxConnectionHandler.prototype.createMarker
  mxConnectionHandler.prototype.createMarker = function () {
    var marker = mxConnectionHandlerCreateMarker.apply(this, arguments)

    var markerGetCell = marker.getCell
    marker.getCell = mxUtils.bind(this, function (me) {
      var result = markerGetCell.apply(this, arguments)

      this.error = null

      return result
    })

    return marker
  }

  /**
   * 功能：解除锁定
   *
   * 如果给定单元格不允许创建新连接，则返回true。
   * 此实现返回false。
   */
  mxConnectionHandler.prototype.isCellEnabled = function (cell) {
    return !this.graph.isCellLocked(cell)
  }

  mxVertexHandler.prototype.handleImage = HoverIcons.prototype.mainHandle
  mxVertexHandler.prototype.secondaryHandleImage = HoverIcons.prototype.secondaryHandle
  mxEdgeHandler.prototype.handleImage = HoverIcons.prototype.mainHandle
  mxEdgeHandler.prototype.terminalHandleImage = HoverIcons.prototype.terminalHandle
  mxEdgeHandler.prototype.fixedHandleImage = HoverIcons.prototype.fixedHandle
  mxEdgeHandler.prototype.labelHandleImage = HoverIcons.prototype.secondaryHandle
  // mxOutline.prototype.sizerImage = HoverIcons.prototype.mainHandle

  //  添加旋转控制柄和实时预览
  mxVertexHandler.prototype.rotationEnabled = true
  mxVertexHandler.prototype.manageSizers = true
  mxVertexHandler.prototype.livePreview = true

  // 增加默认的rubberband不透明度（默认值为20）
  mxRubberband.prototype.defaultOpacity = 30

  // 启用沿轮廓、虚拟航路点、父高光等的连接
  mxConnectionHandler.prototype.outlineConnect = true
  mxCellHighlight.prototype.keepOnTop = true
  mxVertexHandler.prototype.parentHighlightEnabled = true
  mxVertexHandler.prototype.rotationHandleVSpacing = -20

  mxEdgeHandler.prototype.parentHighlightEnabled = true
  mxEdgeHandler.prototype.dblClickRemoveEnabled = true
  mxEdgeHandler.prototype.straightRemoveEnabled = true
  mxEdgeHandler.prototype.virtualBendsEnabled = true
  mxEdgeHandler.prototype.mergeRemoveEnabled = true
  mxEdgeHandler.prototype.manageLabelHandle = true
  mxEdgeHandler.prototype.outlineConnect = true

  // 如果按下shift键，则禁用添加航路点
  mxEdgeHandler.prototype.isAddVirtualBendEvent = function (me) {
    return !mxEvent.isShiftDown(me.getEvent())
  }

  // 如果按下shift键，则禁用自定义句柄
  mxEdgeHandler.prototype.isCustomHandleEvent = function (me) {
    return !mxEvent.isShiftDown(me.getEvent())
  }

  // 翻转
  var vertexHandlerCreateSizerShape = mxVertexHandler.prototype.createSizerShape
  mxVertexHandler.prototype.createSizerShape = function (bounds, index, fillColor) {
    this.handleImage = (index === mxEvent.ROTATION_HANDLE) ? HoverIcons.prototype.rotationHandle : (index === mxEvent.LABEL_HANDLE) ? this.secondaryHandleImage : this.handleImage
    return vertexHandlerCreateSizerShape.apply(this, arguments)
  }
})()
