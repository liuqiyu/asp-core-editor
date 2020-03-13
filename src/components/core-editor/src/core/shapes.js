import mxgraph from './mxgraph'

const {
  mxActor,
  mxUtils,
  mxPoint,
  mxConstants,
  mxCellRenderer,
  mxCylinder,
  mxRectangle,
  mxHexagon,
  mxHandle,
  mxVertexHandler,
  mxStencilRegistry,
  mxEdgeHandler,
  mxPerimeter,
  mxStyleRegistry
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
  this.addPoints(c,
    [
      new mxPoint(0, 0),
      new mxPoint(w - s, 0),
      new mxPoint(w, h / 2),
      new mxPoint(w - s, h),
      new mxPoint(0, h),
      new mxPoint(s, h / 2)
    ], this.isRounded, arcSize, true)
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
  this.addPoints(c,
    [
      new mxPoint(0, h),
      new mxPoint(dx, 0),
      new mxPoint(w - dx, 0),
      new mxPoint(w, h)
    ],
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

  this.addPoints(c,
    [
      new mxPoint(0, 0),
      new mxPoint(w, 0),
      new mxPoint(w, h - s),
      new mxPoint(Math.min(w, dx + base), h - s),
      new mxPoint(dx2, h),
      new mxPoint(Math.max(0, dx), h - s),
      new mxPoint(0, h - s)
    ],
    this.isRounded, arcSize, true, [4])
}
mxCellRenderer.registerShape('callout', CalloutShape)
// Callout Perimeter
mxPerimeter.CalloutPerimeter = function (bounds, vertex, next, orthogonal) {
  return mxPerimeter.RectanglePerimeter(mxUtils.getDirectedBounds(bounds, new mxRectangle(0, 0, 0, Math.max(0, Math.min(bounds.height, parseFloat(mxUtils.getValue(vertex.style, 'size', CalloutShape.prototype.size)) * vertex.view.scale))), vertex.style), vertex, next, orthogonal)
}

mxStyleRegistry.putValue('calloutPerimeter', mxPerimeter.CalloutPerimeter)

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
  this.addPoints(c,
    [
      new mxPoint(s, 0),
      new mxPoint(w, 0),
      new mxPoint(w, h),
      new mxPoint(0, h),
      new mxPoint(0, s)
    ],
    this.isRounded, arcSize, true)
  c.end()
}
mxCellRenderer.registerShape('card', CardShape)

/**
 * 拖动位置
 */
// Handlers are only added if mxVertexHandler is defined (ie. not in embedded graph)
if (typeof mxVertexHandler !== 'undefined') {
  function createHandle (state, keys, getPositionFn, setPositionFn, ignoreGrid, redrawEdges) {
    let handle = new mxHandle(state, null, mxVertexHandler.prototype.secondaryHandleImage)

    handle.execute = function () {
      for (let i = 0; i < keys.length; i++) {
        this.copyStyle(keys[i])
      }
    }
    handle.getPosition = getPositionFn
    handle.setPosition = setPositionFn
    handle.ignoreGrid = (ignoreGrid != null) ? ignoreGrid : true
    // Overridden to update connected edges
    if (redrawEdges) {
      let positionChanged = handle.positionChanged

      handle.positionChanged = function () {
        positionChanged.apply(this, arguments)

        // Redraws connected edges TODO: Include child edges
        state.view.invalidate(this.state.cell)
        state.view.validate()
      }
    }
    return handle
  }

  function createArcHandle (state, yOffset) {
    return createHandle(state, [mxConstants.STYLE_ARCSIZE], function (bounds) {
      let tmp = (yOffset !== null) ? yOffset : bounds.height / 8

      if (mxUtils.getValue(state.style, mxConstants.STYLE_ABSOLUTE_ARCSIZE, 0) === '1') {
        let arcSize = mxUtils.getValue(state.style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE) / 2

        return new mxPoint(bounds.x + bounds.width - Math.min(bounds.width / 2, arcSize), bounds.y + tmp)
      } else {
        let arcSize = Math.max(0, parseFloat(mxUtils.getValue(state.style,
          mxConstants.STYLE_ARCSIZE, mxConstants.RECTANGLE_ROUNDING_FACTOR * 100))) / 100

        return new mxPoint(bounds.x + bounds.width - Math.min(Math.max(bounds.width / 2, bounds.height / 2),
          Math.min(bounds.width, bounds.height) * arcSize), bounds.y + tmp)
      }
    }, function (bounds, pt, me) {
      if (mxUtils.getValue(state.style, mxConstants.STYLE_ABSOLUTE_ARCSIZE, 0) === '1') {
        this.state.style[mxConstants.STYLE_ARCSIZE] = Math.round(Math.max(0, Math.min(bounds.width,
          (bounds.x + bounds.width - pt.x) * 2)))
      } else {
        let f = Math.min(50, Math.max(0, (bounds.width - pt.x + bounds.x) * 100 /
          Math.min(bounds.width, bounds.height)))
        this.state.style[mxConstants.STYLE_ARCSIZE] = Math.round(f)
      }
    })
  }

  let handleFactory = {
    'note': function (state) {
      return [createHandle(state, ['size'], function (bounds) {
        let size = Math.max(0, Math.min(bounds.width, Math.min(bounds.height, parseFloat(
          mxUtils.getValue(this.state.style, 'size', NoteShape.prototype.size)))))

        return new mxPoint(bounds.x + bounds.width - size, bounds.y + size)
      }, function (bounds, pt) {
        this.state.style['size'] = Math.round(Math.max(0, Math.min(Math.min(bounds.width, bounds.x + bounds.width - pt.x),
          Math.min(bounds.height, pt.y - bounds.y))))
      })]
    },
    'callout': function (state) {
      let handles = [createHandle(state, ['size', 'position'], function (bounds) {
        let size = Math.max(0, Math.min(bounds.height, mxUtils.getValue(this.state.style, 'size', CalloutShape.prototype.size)))
        let position = Math.max(0, Math.min(1, mxUtils.getValue(this.state.style, 'position', CalloutShape.prototype.position)))
        // let base = Math.max(0, Math.min(bounds.width, mxUtils.getValue(this.state.style, 'base', CalloutShape.prototype.base)))

        return new mxPoint(bounds.x + position * bounds.width, bounds.y + bounds.height - size)
      }, function (bounds, pt) {
        // let base = Math.max(0, Math.min(bounds.width, mxUtils.getValue(this.state.style, 'base', CalloutShape.prototype.base)))
        this.state.style['size'] = Math.round(Math.max(0, Math.min(bounds.height, bounds.y + bounds.height - pt.y)))
        this.state.style['position'] = Math.round(Math.max(0, Math.min(1, (pt.x - bounds.x) / bounds.width)) * 100) / 100
      }), createHandle(state, ['position2'], function (bounds) {
        let position2 = Math.max(0, Math.min(1, mxUtils.getValue(this.state.style, 'position2', CalloutShape.prototype.position2)))

        return new mxPoint(bounds.x + position2 * bounds.width, bounds.y + bounds.height)
      }, function (bounds, pt) {
        this.state.style['position2'] = Math.round(Math.max(0, Math.min(1, (pt.x - bounds.x) / bounds.width)) * 100) / 100
      }), createHandle(state, ['base'], function (bounds) {
        let size = Math.max(0, Math.min(bounds.height, mxUtils.getValue(this.state.style, 'size', CalloutShape.prototype.size)))
        let position = Math.max(0, Math.min(1, mxUtils.getValue(this.state.style, 'position', CalloutShape.prototype.position)))
        let base = Math.max(0, Math.min(bounds.width, mxUtils.getValue(this.state.style, 'base', CalloutShape.prototype.base)))

        return new mxPoint(bounds.x + Math.min(bounds.width, position * bounds.width + base), bounds.y + bounds.height - size)
      }, function (bounds, pt) {
        let position = Math.max(0, Math.min(1, mxUtils.getValue(this.state.style, 'position', CalloutShape.prototype.position)))

        this.state.style['base'] = Math.round(Math.max(0, Math.min(bounds.width, pt.x - bounds.x - position * bounds.width)))
      })]

      if (mxUtils.getValue(state.style, mxConstants.STYLE_ROUNDED, false)) {
        handles.push(createArcHandle(state))
      }

      return handles
    }
  }

  mxVertexHandler.prototype.createCustomHandles = function () {
    // Not rotatable means locked
    if (this.state.view.graph.getSelectionCount() === 1) {
      if (this.graph.isCellRotatable(this.state.cell)) {
        let name = this.state.style['shape']

        if (mxCellRenderer.defaultShapes[name] == null &&
          mxStencilRegistry.getStencil(name) == null) {
          name = mxConstants.SHAPE_RECTANGLE
        }

        let fn = handleFactory[name]

        if (fn === null && this.state.shape !== null && this.state.shape.isRoundable()) {
          fn = handleFactory[mxConstants.SHAPE_RECTANGLE]
        }
        if (fn !== null) {
          return fn(this.state)
        }
      }
    }
    return null
  }

  mxEdgeHandler.prototype.createCustomHandles = function () {
    if (this.state.view.graph.getSelectionCount() === 1) {
      let name = this.state.style['shape']

      if (mxCellRenderer.defaultShapes[name] === null &&
        mxStencilRegistry.getStencil(name) === null) {
        name = mxConstants.SHAPE_CONNECTOR
      }

      let fn = handleFactory[name]

      if (fn !== null) {
        return fn(this.state)
      }
    }
    return null
  }
} else {
  // Dummy entries to avoid NPE in embed mode
  // Graph.createHandle = function () { };
  // Graph.handleFactory = {};
}
