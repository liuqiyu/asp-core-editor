import mxgraph from './mxgraph'

const { mxEvent, mxResources, mxUtils, mxClient, mxRectangle, mxConstants } = mxgraph

function HoverIcons (graph) {
  this.graph = graph
  this.init()
}

HoverIcons.prototype.init = function () {
  this.arrowUp = this.createArrow(
    this.triangleUp,
    mxResources.get('plusTooltip')
  )
  this.arrowRight = this.createArrow(
    this.triangleRight,
    mxResources.get('plusTooltip')
  )
  this.arrowDown = this.createArrow(
    this.triangleDown,
    mxResources.get('plusTooltip')
  )
  this.arrowLeft = this.createArrow(
    this.triangleLeft,
    mxResources.get('plusTooltip')
  )

  this.elts = [this.arrowUp, this.arrowRight, this.arrowDown, this.arrowLeft]

  this.repaintHandler = mxUtils.bind(this, function () {
    this.repaint()
  })

  this.graph.selectionModel.addListener(mxEvent.CHANGE, this.repaintHandler)
  this.graph.model.addListener(mxEvent.CHANGE, this.repaintHandler)
  this.graph.view.addListener(mxEvent.SCALE_AND_TRANSLATE, this.repaintHandler)
  this.graph.view.addListener(mxEvent.TRANSLATE, this.repaintHandler)
  this.graph.view.addListener(mxEvent.SCALE, this.repaintHandler)
  this.graph.view.addListener(mxEvent.DOWN, this.repaintHandler)
  this.graph.view.addListener(mxEvent.UP, this.repaintHandler)
  this.graph.addListener(mxEvent.ROOT, this.repaintHandler)

  // Resets the mouse point on escape
  this.graph.addListener(
    mxEvent.ESCAPE,
    mxUtils.bind(this, function () {
      this.mouseDownPoint = null
    })
  )

  // Removes hover icons if mouse leaves the container
  mxEvent.addListener(
    this.graph.container,
    'mouseleave',
    mxUtils.bind(this, function (evt) {
      // Workaround for IE11 firing mouseleave for touch in diagram
      if (
        evt.relatedTarget != null &&
        mxEvent.getSource(evt) === this.graph.container
      ) {
        this.setDisplay('none')
      }
    })
  )

  // Resets current state when in-place editor starts
  this.graph.addListener(
    mxEvent.START_EDITING,
    mxUtils.bind(this, function (evt) {
      this.reset()
    })
  )

  // Resets current state after update of selection state for touch events
  var graphClick = this.graph.click
  this.graph.click = mxUtils.bind(this, function (me) {
    graphClick.apply(this.graph, arguments)

    if (
      this.currentState != null &&
      !this.graph.isCellSelected(this.currentState.cell) &&
      mxEvent.isTouchEvent(me.getEvent()) &&
      !this.graph.model.isVertex(me.getCell())
    ) {
      this.reset()
    }
  })

  // Checks if connection handler was active in mouse move
  // as workaround for possible double connection inserted
  var connectionHandlerActive = false

  // Implements a listener for hover and click handling
  this.graph.addMouseListener({
    mouseDown: mxUtils.bind(this, function (sender, me) {
      connectionHandlerActive = false
      var evt = me.getEvent()

      if (this.isResetEvent(evt)) {
        this.reset()
      } else if (!this.isActive()) {
        var state = this.getState(me.getState())

        if (state != null || !mxEvent.isTouchEvent(evt)) {
          this.update(state)
        }
      }

      this.setDisplay('none')
    }),
    mouseMove: mxUtils.bind(this, function (sender, me) {
      var evt = me.getEvent()

      if (this.isResetEvent(evt)) {
        this.reset()
      } else if (!this.graph.isMouseDown && !mxEvent.isTouchEvent(evt)) {
        this.update(
          this.getState(me.getState()),
          me.getGraphX(),
          me.getGraphY()
        )
      }

      if (
        this.graph.connectionHandler != null &&
        this.graph.connectionHandler.shape != null
      ) {
        connectionHandlerActive = true
      }
    }),
    mouseUp: mxUtils.bind(this, function (sender, me) {
      var evt = me.getEvent()

      if (this.isResetEvent(evt)) {
        this.reset()
      } else if (
        this.isActive() &&
        this.mouseDownPoint != null &&
        Math.abs(me.getGraphX() - this.mouseDownPoint.x) <
        this.graph.tolerance &&
        Math.abs(me.getGraphY() - this.mouseDownPoint.y) < this.graph.tolerance
      ) {
        // Executes click event on highlighted arrow
        if (!connectionHandlerActive) {
          this.click(this.currentState, this.getDirection(), me)
        }
      } else if (this.isActive()) {
        // Selects target vertex after drag and clone if not only new edge was inserted
        if (
          this.graph.getSelectionCount() !== 1 ||
          !this.graph.model.isEdge(this.graph.getSelectionCell())
        ) {
          this.update(
            this.getState(
              this.graph.view.getState(
                this.graph.getCellAt(me.getGraphX(), me.getGraphY())
              )
            )
          )
        } else {
          this.reset()
        }
      } else if (
        mxEvent.isTouchEvent(evt) ||
        (this.bbox != null &&
          mxUtils.contains(this.bbox, me.getGraphX(), me.getGraphY()))
      ) {
        // Shows existing hover icons if inside bounding box
        this.setDisplay('')
        this.repaint()
      } else if (!mxEvent.isTouchEvent(evt)) {
        this.reset()
      }

      connectionHandlerActive = false
      this.resetActiveArrow()
    })
  })
}

HoverIcons.prototype.isResetEvent = function (evt, allowShift) {
  return mxEvent.isAltDown(evt) || (this.activeArrow == null && mxEvent.isShiftDown(evt)) ||
    mxEvent.isMetaDown(evt) || (mxEvent.isPopupTrigger(evt) && !mxEvent.isControlDown(evt))
}

HoverIcons.prototype.createArrow = function (img, tooltip) {
  var arrow = null

  if (mxClient.IS_IE && !mxClient.IS_SVG) {
    // Workaround for PNG images in IE6
    if (mxClient.IS_IE6 && document.compatMode !== 'CSS1Compat') {
      arrow = document.createElement(mxClient.VML_PREFIX + ':image')
      arrow.setAttribute('src', img.src)
      arrow.style.borderStyle = 'none'
    } else {
      arrow = document.createElement('div')
      arrow.style.backgroundImage = 'url(' + img.src + ')'
      arrow.style.backgroundPosition = 'center'
      arrow.style.backgroundRepeat = 'no-repeat'
    }

    arrow.style.width = (img.width + 4) + 'px'
    arrow.style.height = (img.height + 4) + 'px'
    arrow.style.display = (mxClient.IS_QUIRKS) ? 'inline' : 'inline-block'
  } else {
    arrow = mxUtils.createImage(img.src)
    arrow.style.width = img.width + 'px'
    arrow.style.height = img.height + 'px'
    arrow.style.padding = this.tolerance + 'px'
  }

  if (tooltip != null) {
    arrow.setAttribute('title', tooltip)
  }

  arrow.style.position = 'absolute'
  arrow.style.cursor = this.cssCursor

  mxEvent.addGestureListeners(arrow, mxUtils.bind(this, function (evt) {
    if (this.currentState != null && !this.isResetEvent(evt)) {
      this.mouseDownPoint = mxUtils.convertPoint(this.graph.container,
        mxEvent.getClientX(evt), mxEvent.getClientY(evt))
      this.drag(evt, this.mouseDownPoint.x, this.mouseDownPoint.y)
      this.activeArrow = arrow
      this.setDisplay('none')
      mxEvent.consume(evt)
    }
  }))

  // Captures mouse events as events on graph
  mxEvent.redirectMouseEvents(arrow, this.graph, this.currentState)

  mxEvent.addListener(arrow, 'mouseenter', mxUtils.bind(this, function (evt) {
    // Workaround for Firefox firing mouseenter on touchend
    if (mxEvent.isMouseEvent(evt)) {
      if (this.activeArrow != null && this.activeArrow !== arrow) {
        mxUtils.setOpacity(this.activeArrow, this.inactiveOpacity)
      }

      this.graph.connectionHandler.constraintHandler.reset()
      mxUtils.setOpacity(arrow, 100)
      this.activeArrow = arrow
    }
  }))

  mxEvent.addListener(arrow, 'mouseleave', mxUtils.bind(this, function (evt) {
    // Workaround for IE11 firing this event on touch
    if (!this.graph.isMouseDown) {
      this.resetActiveArrow()
    }
  }))

  return arrow
}

HoverIcons.prototype.resetActiveArrow = function () {
  if (this.activeArrow != null) {
    mxUtils.setOpacity(this.activeArrow, this.inactiveOpacity)
    this.activeArrow = null
  }
}

/**
 *
 */
HoverIcons.prototype.getDirection = function () {
  var dir = mxConstants.DIRECTION_EAST

  if (this.activeArrow === this.arrowUp) {
    dir = mxConstants.DIRECTION_NORTH
  } else if (this.activeArrow === this.arrowDown) {
    dir = mxConstants.DIRECTION_SOUTH
  } else if (this.activeArrow === this.arrowLeft) {
    dir = mxConstants.DIRECTION_WEST
  }

  return dir
}

/**
 *
 */
HoverIcons.prototype.visitNodes = function (visitor) {
  for (var i = 0; i < this.elts.length; i++) {
    if (this.elts[i] != null) {
      visitor(this.elts[i])
    }
  }
}

/**
 *
 */
HoverIcons.prototype.removeNodes = function () {
  this.visitNodes(function (elt) {
    if (elt.parentNode != null) {
      elt.parentNode.removeChild(elt)
    }
  })
}

/**
 *
 */
HoverIcons.prototype.setDisplay = function (display) {
  this.visitNodes(function (elt) {
    elt.style.display = display
  })
}

/**
 *
 */
HoverIcons.prototype.isActive = function () {
  return this.activeArrow != null && this.currentState != null
}

/**
 *
 */
HoverIcons.prototype.drag = function (evt, x, y) {
  this.graph.popupMenuHandler.hideMenu()
  this.graph.stopEditing(false)

  // Checks if state was removed in call to stopEditing above
  if (this.currentState != null) {
    this.graph.connectionHandler.start(this.currentState, x, y)
    this.graph.isMouseTrigger = mxEvent.isMouseEvent(evt)
    this.graph.isMouseDown = true

    // Hides handles for selection cell
    var handler = this.graph.selectionCellsHandler.getHandler(this.currentState.cell)

    if (handler != null) {
      handler.setHandlesVisible(false)
    }

    // Uses elbow edges with vertical or horizontal direction
    // var direction = this.getDirection();
    // var es = this.graph.connectionHandler.edgeState;
    // es.cell.style = mxUtils.setStyle(es.cell.style, 'sourcePortConstraint', direction);
    // es.style['sourcePortConstraint'] = direction;
    // var elbowValue = (direction == mxConstants.DIRECTION_NORTH || direction == mxConstants.DIRECTION_SOUTH) ? 'vertical' : 'horizontal';
    //
    // var es = this.graph.connectionHandler.edgeState;
    // es.style['edgeStyle'] = 'elbowEdgeStyle';
    // es.style['elbow'] = elbowValue;
    // es.cell.style = mxUtils.setStyle(es.cell.style, 'edgeStyle', es.style['edgeStyle']);
    // es.cell.style = mxUtils.setStyle(es.cell.style, 'elbow', es.style['elbow']);
  }
}

/**
 *
 */
HoverIcons.prototype.getStateAt = function (state, x, y) {
  return this.graph.view.getState(this.graph.getCellAt(x, y))
}

/**
 *
 */
HoverIcons.prototype.click = function (state, dir, me) {
  var evt = me.getEvent()
  var x = me.getGraphX()
  var y = me.getGraphY()

  var tmp = this.getStateAt(state, x, y)

  if (tmp != null && this.graph.model.isEdge(tmp.cell) && !mxEvent.isControlDown(evt) &&
    (tmp.getVisibleTerminalState(true) === state || tmp.getVisibleTerminalState(false) === state)) {
    this.graph.setSelectionCell(tmp.cell)
    this.reset()
  } else if (state != null) {
    var cells = this.graph.connectVertex(state.cell, dir, this.graph.defaultEdgeLength, evt)
    this.graph.selectCellsForConnectVertex(cells, evt, this)

    // Selects only target vertex if one exists
    if (cells.length === 2 && this.graph.model.isVertex(cells[1])) {
      this.graph.setSelectionCell(cells[1])

      // Adds hover icons to new target vertex for touch devices
      if (mxEvent.isTouchEvent(evt)) {
        this.update(this.getState(this.graph.view.getState(cells[1])))
      } else {
        // Hides hover icons after click with mouse
        this.reset()
      }

      this.graph.scrollCellToVisible(cells[1])
    } else {
      this.graph.setSelectionCells(cells)
    }
  }

  me.consume()
}

/**
 *
 */
HoverIcons.prototype.reset = function (clearTimeout) {
  clearTimeout = (clearTimeout == null) ? true : clearTimeout

  if (clearTimeout && this.updateThread != null) {
    window.clearTimeout(this.updateThread)
  }

  this.mouseDownPoint = null
  this.currentState = null
  this.activeArrow = null
  this.removeNodes()
  this.bbox = null
}

/**
 *
 */
HoverIcons.prototype.repaint = function () {
  this.bbox = null

  if (this.currentState != null) {
    // Checks if cell was deleted
    this.currentState = this.getState(this.currentState)

    // Cell was deleted
    if (this.currentState != null &&
      this.graph.model.isVertex(this.currentState.cell) &&
      this.graph.isCellConnectable(this.currentState.cell)) {
      var bds = mxRectangle.fromRectangle(this.currentState)

      // Uses outer bounding box to take rotation into account
      if (this.currentState.shape != null && this.currentState.shape.boundingBox != null) {
        bds = mxRectangle.fromRectangle(this.currentState.shape.boundingBox)
      }

      bds.grow(this.graph.tolerance)
      bds.grow(this.arrowSpacing)

      var handler = this.graph.selectionCellsHandler.getHandler(this.currentState.cell)

      if (handler != null) {
        bds.x -= handler.horizontalOffset / 2
        bds.y -= handler.verticalOffset / 2
        bds.width += handler.horizontalOffset
        bds.height += handler.verticalOffset

        // Adds bounding box of rotation handle to avoid overlap
        if (handler.rotationShape != null && handler.rotationShape.node != null &&
          handler.rotationShape.node.style.visibility !== 'hidden' &&
          handler.rotationShape.node.style.display !== 'none' &&
          handler.rotationShape.boundingBox != null) {
          bds.add(handler.rotationShape.boundingBox)
        }
      }

      this.arrowUp.style.left = Math.round(this.currentState.getCenterX() - this.triangleUp.width / 2 - this.tolerance) + 'px'
      this.arrowUp.style.top = Math.round(bds.y - this.triangleUp.height - this.tolerance) + 'px'
      mxUtils.setOpacity(this.arrowUp, this.inactiveOpacity)

      this.arrowRight.style.left = Math.round(bds.x + bds.width - this.tolerance) + 'px'
      this.arrowRight.style.top = Math.round(this.currentState.getCenterY() - this.triangleRight.height / 2 - this.tolerance) + 'px'
      mxUtils.setOpacity(this.arrowRight, this.inactiveOpacity)

      this.arrowDown.style.left = this.arrowUp.style.left
      this.arrowDown.style.top = Math.round(bds.y + bds.height - this.tolerance) + 'px'
      mxUtils.setOpacity(this.arrowDown, this.inactiveOpacity)

      this.arrowLeft.style.left = Math.round(bds.x - this.triangleLeft.width - this.tolerance) + 'px'
      this.arrowLeft.style.top = this.arrowRight.style.top
      mxUtils.setOpacity(this.arrowLeft, this.inactiveOpacity)

      if (this.checkCollisions) {
        var right = this.graph.getCellAt(bds.x + bds.width +
          this.triangleRight.width / 2, this.currentState.getCenterY())
        var left = this.graph.getCellAt(bds.x - this.triangleLeft.width / 2, this.currentState.getCenterY())
        var top = this.graph.getCellAt(this.currentState.getCenterX(), bds.y - this.triangleUp.height / 2)
        var bottom = this.graph.getCellAt(this.currentState.getCenterX(), bds.y + bds.height + this.triangleDown.height / 2)

        // Shows hover icons large cell is behind all directions of current cell
        if (right != null && right === left && left === top && top === bottom) {
          right = null
          left = null
          top = null
          bottom = null
        }

        var currentGeo = this.graph.getCellGeometry(this.currentState.cell)

        var checkCollision = mxUtils.bind(this, function (cell, arrow) {
          var geo = this.graph.model.isVertex(cell) && this.graph.getCellGeometry(cell)

          // Ignores collision if vertex is more than 3 times the size of this vertex
          if (cell != null && !this.graph.model.isAncestor(cell, this.currentState.cell) &&
            (geo == null || currentGeo == null || (geo.height < 6 * currentGeo.height &&
              geo.width < 6 * currentGeo.width))) {
            arrow.style.visibility = 'hidden'
          } else {
            arrow.style.visibility = 'visible'
          }
        })

        checkCollision(right, this.arrowRight)
        checkCollision(left, this.arrowLeft)
        checkCollision(top, this.arrowUp)
        checkCollision(bottom, this.arrowDown)
      } else {
        this.arrowLeft.style.visibility = 'visible'
        this.arrowRight.style.visibility = 'visible'
        this.arrowUp.style.visibility = 'visible'
        this.arrowDown.style.visibility = 'visible'
      }

      if (this.graph.tooltipHandler.isEnabled()) {
        this.arrowLeft.setAttribute('title', mxResources.get('plusTooltip'))
        this.arrowRight.setAttribute('title', mxResources.get('plusTooltip'))
        this.arrowUp.setAttribute('title', mxResources.get('plusTooltip'))
        this.arrowDown.setAttribute('title', mxResources.get('plusTooltip'))
      } else {
        this.arrowLeft.removeAttribute('title')
        this.arrowRight.removeAttribute('title')
        this.arrowUp.removeAttribute('title')
        this.arrowDown.removeAttribute('title')
      }
    } else {
      this.reset()
    }

    // Updates bounding box
    if (this.currentState != null) {
      this.bbox = this.computeBoundingBox()

      // Adds tolerance for hover
      if (this.bbox != null) {
        this.bbox.grow(10)
      }
    }
  }
}

/**
 *
 */
HoverIcons.prototype.computeBoundingBox = function () {
  var bbox = (!this.graph.model.isEdge(this.currentState.cell)) ? mxRectangle.fromRectangle(this.currentState) : null

  this.visitNodes(function (elt) {
    if (elt.parentNode != null) {
      var tmp = new mxRectangle(elt.offsetLeft, elt.offsetTop, elt.offsetWidth, elt.offsetHeight)

      if (bbox == null) {
        bbox = tmp
      } else {
        bbox.add(tmp)
      }
    }
  })

  return bbox
}

/**
 *
 */
HoverIcons.prototype.getState = function (state) {
  if (state != null) {
    var cell = state.cell

    // Uses connectable parent vertex if child is not connectable
    if (this.graph.getModel().isVertex(cell) && !this.graph.isCellConnectable(cell)) {
      var parent = this.graph.getModel().getParent(cell)

      if (this.graph.getModel().isVertex(parent) && this.graph.isCellConnectable(parent)) {
        cell = parent
      }
    }

    // Ignores locked cells and edges
    if (this.graph.isCellLocked(cell) || this.graph.model.isEdge(cell)) {
      cell = null
    }

    state = this.graph.view.getState(cell)
  }

  return state
}

/**
 *
 */
HoverIcons.prototype.update = function (state, x, y) {
  if (!this.graph.connectionArrowsEnabled) {
    this.reset()
  } else {
    var timeOnTarget = null

    // Time on target
    if (this.prev !== state || this.isActive()) {
      this.startTime = new Date().getTime()
      this.prev = state
      timeOnTarget = 0

      if (this.updateThread != null) {
        window.clearTimeout(this.updateThread)
      }

      if (state != null) {
        // Starts timer to update current state with no mouse events
        this.updateThread = window.setTimeout(mxUtils.bind(this, function () {
          if (!this.isActive() && !this.graph.isMouseDown &&
            !this.graph.panningHandler.isActive()) {
            this.prev = state
            this.update(state, x, y)
          }
        }), this.updateDelay + 10)
      }
    } else if (this.startTime != null) {
      timeOnTarget = new Date().getTime() - this.startTime
    }

    this.setDisplay('')

    if (this.currentState != null && this.currentState !== state && timeOnTarget < this.activationDelay &&
      this.bbox != null && !mxUtils.contains(this.bbox, x, y)) {
      this.reset(false)
    } else if (this.currentState != null || timeOnTarget > this.activationDelay) {
      if (this.currentState !== state && ((timeOnTarget > this.updateDelay && state != null) ||
        this.bbox == null || x == null || y == null || !mxUtils.contains(this.bbox, x, y))) {
        if (state != null && this.graph.isEnabled()) {
          this.removeNodes()
          this.setCurrentState(state)
          this.repaint()

          // Resets connection points on other focused cells
          if (this.graph.connectionHandler.constraintHandler.currentFocus !== state) {
            this.graph.connectionHandler.constraintHandler.reset()
          }
        } else {
          this.reset()
        }
      }
    }
  }
}

/**
 *
 */
HoverIcons.prototype.setCurrentState = function (state) {
  if (state.style['portConstraint'] !== 'eastwest') {
    this.graph.container.appendChild(this.arrowUp)
    this.graph.container.appendChild(this.arrowDown)
  }

  this.graph.container.appendChild(this.arrowRight)
  this.graph.container.appendChild(this.arrowLeft)
  this.currentState = state
}
