/*
 * @Description: graph init
 * @Author: liuqiyu
 * @Date: 2019-11-25 09:43:50
 * @LastEditors: liuqiyu
 * @LastEditTime: 2019-11-27 16:10:56
 */

import Base64 from './../utils/base64'
import mxgraph from './mxgraph'

const {
  mxImage,
  // mxClient,
  mxUtils,
  mxConstants,
  mxEdgeHandler,
  mxGraphHandler,
  mxRubberband,
  mxGuide,
  mxEvent,
  mxConnectionHandler,
  mxVertexHandler,
  mxCellHighlight,
  // mxConstraintHandler,
  // mxEllipse,
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

HoverIcons.prototype.mainHandle = Graph.createSvgImage(18, 18, '<circle cx="9" cy="9" r="5" stroke="#fff" fill="#007dfc" stroke-width="1"/>')

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

  // Overrides edge preview to use current edge shape and default style 替代边预览以使用当前边形状和默认样式
  mxConnectionHandler.prototype.livePreview = true
  mxConnectionHandler.prototype.cursor = 'crosshair'

  // Uses current edge style for connect preview 使用当前边样式进行连接预览
  mxConnectionHandler.prototype.createEdgeState = function (me) {
    let style = this.graph.createCurrentEdgeStyle()
    let edge = this.graph.createEdge(null, null, null, null, null, style)
    let state = new mxCellState(this.graph.view, edge, this.graph.getCellStyle(edge))
    console.log(style)
    console.log(edge)
    console.log(state)

    for (var key in this.graph.currentEdgeStyle) {
      state.style[key] = this.graph.currentEdgeStyle[key]
    }
    return state
  }

  mxVertexHandler.prototype.handleImage = HoverIcons.prototype.mainHandle
  mxVertexHandler.prototype.secondaryHandleImage = HoverIcons.prototype.secondaryHandle
  mxEdgeHandler.prototype.handleImage = HoverIcons.prototype.mainHandle
  mxEdgeHandler.prototype.terminalHandleImage = HoverIcons.prototype.terminalHandle
  mxEdgeHandler.prototype.fixedHandleImage = HoverIcons.prototype.fixedHandle
  mxEdgeHandler.prototype.labelHandleImage = HoverIcons.prototype.secondaryHandle
  // mxOutline.prototype.sizerImage = HoverIcons.prototype.mainHandle

  // Adds rotation handle and live preview
  mxVertexHandler.prototype.rotationEnabled = true
  mxVertexHandler.prototype.manageSizers = true
  mxVertexHandler.prototype.livePreview = true

  // Increases default rubberband opacity (default is 20)
  mxRubberband.prototype.defaultOpacity = 30

  // Enables connections along the outline, virtual waypoints, parent highlight etc
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
})()
