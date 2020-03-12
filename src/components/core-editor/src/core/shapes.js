import mxgraph from './mxgraph'

const {
  mxActor,
  mxUtils,
  mxPoint,
  mxConstants,
  mxCellRenderer,
  mxCylinder,
  mxRectangle,
  mxHexagon
} = mxgraph

/**
 * Parallelogram shape
 * 平行四边形
 */
function ParallelogramShape () {
  mxActor.call(this)
};
mxUtils.extend(ParallelogramShape, mxActor)
ParallelogramShape.prototype.size = 0.2
ParallelogramShape.prototype.redrawPath = function (c, x, y, w, h) {
  let dx = w * Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'size', this.size))))
  let arcSize = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE) / 2
  this.addPoints(c, [new mxPoint(0, h), new mxPoint(dx, 0), new mxPoint(w, 0), new mxPoint(w - dx, h)],
    this.isRounded, arcSize, true)
  c.end()
}

mxCellRenderer.registerShape('parallelogram', ParallelogramShape)

/**
 * Cube Shape
 * 立方形
 */
function CubeShape () {
  mxCylinder.call(this)
};
mxUtils.extend(CubeShape, mxCylinder)
CubeShape.prototype.size = 20
CubeShape.prototype.redrawPath = function (path, x, y, w, h, isForeground) {
  let s = Math.max(0, Math.min(w, Math.min(h, parseFloat(mxUtils.getValue(this.style, 'size', this.size)))))

  if (isForeground) {
    path.moveTo(s, h)
    path.lineTo(s, s)
    path.lineTo(0, 0)
    path.moveTo(s, s)
    path.lineTo(w, s)
    path.end()
  } else {
    path.moveTo(0, 0)
    path.lineTo(w - s, 0)
    path.lineTo(w, s)
    path.lineTo(w, h)
    path.lineTo(s, h)
    path.lineTo(0, h - s)
    path.lineTo(0, 0)
    path.close()
    path.end()
  }
}
CubeShape.prototype.getLabelMargins = function (rect) {
  if (mxUtils.getValue(this.style, 'boundedLbl', false)) {
    let s = parseFloat(mxUtils.getValue(this.style, 'size', this.size)) * this.scale

    return new mxRectangle(s, s, 0, 0)
  }

  return null
}
mxCellRenderer.registerShape('cube', CubeShape)

/**
 * Step shape
 * 步骤条
 */
function StepShape () {
  mxActor.call(this)
};
mxUtils.extend(StepShape, mxActor)
StepShape.prototype.size = 0.2
StepShape.prototype.fixedSize = 20
StepShape.prototype.redrawPath = function (c, x, y, w, h) {
  let fixed = mxUtils.getValue(this.style, 'fixedSize', '0') !== '0'
  let s = (fixed) ? Math.max(0, Math.min(w, parseFloat(mxUtils.getValue(this.style, 'size', this.fixedSize))))
    : w * Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'size', this.size))))
  let arcSize = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE) / 2
  this.addPoints(c, [new mxPoint(0, 0), new mxPoint(w - s, 0), new mxPoint(w, h / 2), new mxPoint(w - s, h),
    new mxPoint(0, h), new mxPoint(s, h / 2)], this.isRounded, arcSize, true)
  c.end()
}
mxCellRenderer.registerShape('step', StepShape)

/**
 * Trapezoid shape
 * 梯形
 */
function TrapezoidShape () {
  mxActor.call(this)
};
mxUtils.extend(TrapezoidShape, mxActor)
TrapezoidShape.prototype.size = 0.2
TrapezoidShape.prototype.redrawPath = function (c, x, y, w, h) {
  let dx = w * Math.max(0, Math.min(0.5, parseFloat(mxUtils.getValue(this.style, 'size', this.size))))
  let arcSize = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE) / 2
  this.addPoints(c, [new mxPoint(0, h), new mxPoint(dx, 0), new mxPoint(w - dx, 0), new mxPoint(w, h)],
    this.isRounded, arcSize, true)
}
mxCellRenderer.registerShape('trapezoid', TrapezoidShape)

/**
 * Note Shape, supports size style
 * 笔记
 */
function NoteShape () {
  mxCylinder.call(this)
};
mxUtils.extend(NoteShape, mxCylinder)
NoteShape.prototype.size = 30
NoteShape.prototype.redrawPath = function (path, x, y, w, h, isForeground) {
  let s = Math.max(0, Math.min(w, Math.min(h, parseFloat(mxUtils.getValue(this.style, 'size', this.size)))))

  if (isForeground) {
    path.moveTo(w - s, 0)
    path.lineTo(w - s, s)
    path.lineTo(w, s)
    path.end()
  } else {
    path.moveTo(0, 0)
    path.lineTo(w - s, 0)
    path.lineTo(w, s)
    path.lineTo(w, h)
    path.lineTo(0, h)
    path.lineTo(0, 0)
    path.close()
    path.end()
  }
}
mxCellRenderer.registerShape('note', NoteShape)

/**
 * Callout shape
 * 标注
 */
function CalloutShape () {
  mxActor.call(this)
};
mxUtils.extend(CalloutShape, mxHexagon)
CalloutShape.prototype.size = 30
CalloutShape.prototype.position = 0.5
CalloutShape.prototype.position2 = 0.5
CalloutShape.prototype.base = 20
CalloutShape.prototype.getLabelMargins = function () {
  return new mxRectangle(0, 0, 0, parseFloat(mxUtils.getValue(
    this.style, 'size', this.size)) * this.scale)
}
CalloutShape.prototype.redrawPath = function (c, x, y, w, h) {
  let arcSize = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE) / 2
  let s = Math.max(0, Math.min(h, parseFloat(mxUtils.getValue(this.style, 'size', this.size))))
  let dx = w * Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'position', this.position))))
  let dx2 = w * Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'position2', this.position2))))
  let base = Math.max(0, Math.min(w, parseFloat(mxUtils.getValue(this.style, 'base', this.base))))

  this.addPoints(c, [new mxPoint(0, 0), new mxPoint(w, 0), new mxPoint(w, h - s),
    new mxPoint(Math.min(w, dx + base), h - s), new mxPoint(dx2, h),
    new mxPoint(Math.max(0, dx), h - s), new mxPoint(0, h - s)],
  this.isRounded, arcSize, true, [4])
}
mxCellRenderer.registerShape('callout', CalloutShape)

/**
 * Card shape
 * 卡片
 */
function CardShape () {
  mxActor.call(this)
};
mxUtils.extend(CardShape, mxActor)
CardShape.prototype.size = 30
CardShape.prototype.redrawPath = function (c, x, y, w, h) {
  let s = Math.max(0, Math.min(w, Math.min(h, parseFloat(mxUtils.getValue(this.style, 'size', this.size)))))
  let arcSize = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE) / 2
  this.addPoints(c, [new mxPoint(s, 0), new mxPoint(w, 0), new mxPoint(w, h), new mxPoint(0, h), new mxPoint(0, s)],
    this.isRounded, arcSize, true)
  c.end()
}

mxCellRenderer.registerShape('card', CardShape)
