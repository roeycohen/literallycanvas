# maybe add checks to these in the future to make sure you never double-undo or
# double-redo
_ = require 'underscore'
class ClearAction

  constructor: (@lc, @oldShapes, @newShapes) ->

  do: ->
    @lc.shapes = @newShapes
    @lc.repaintLayer('main')

  undo: ->
    @lc.shapes = @oldShapes
    @lc.repaintLayer('main')


class AddShapeAction

  constructor: (@lc, @shape, @previousShapeId=null) ->

  do: ->
    # common case: just add it to the end
    if (not @lc.shapes.length or
        @lc.shapes[@lc.shapes.length-1].id == @previousShapeId or
        @previousShapeId == null)
      @lc.shapes.push(@shape)
    # uncommon case: insert it somewhere
    else
      newShapes = []
      found = false
      for shape in @lc.shapes
        newShapes.push(shape)
        if shape.id == @previousShapeId
          newShapes.push(@shape)
          found = true
      unless found
        # given ID doesn't exist, just shove it on top
        newShapes.push(@shape)
      @lc.shapes = newShapes
    @lc.repaintLayer('main')
    @lc.trigger('add_whiteboard_shape', @shape)

  undo: ->
    # common case: it's the most recent shape
    if @lc.shapes[@lc.shapes.length-1].id == @shape.id
      @lc.trigger('remove_whiteboard_shape', @lc.shapes.pop())
    # uncommon case: it's in the array somewhere
    else
      newShapes = []
      for shape in @lc.shapes
        newShapes.push(shape) if shape.id != @shape.id
      lc.shapes = newShapes
    @lc.repaintLayer('main')

class RemoveByIdAction

    constructor: (@lc)->

    removeById: (id)->
      removed
      if (id)
        removed = _.filter(@lc.shapes, (shape)->shape.id == id)
        if (removed.length)
          @lc.shapes=_.reject(@lc.shapes, (shape)->shape.id == id)
          lc.repaintLayer("main")
          return removed

        removed = _.filter(@lc.backgroundShapes, (shape)->shape.id == id)
        if (removed.length)
          @lc.backgroundShapes = _.reject(@lc.backgroundShapes, (shape)->shape.id == id)
          lc.repaintLayer("background")
          return removed

        removed = _.filter(@lc.commentToolShapes, (shape)->shape.id == id)
        if (removed.length)
          @lc.commentToolShapes = _.reject(@lc.commentToolShapes, (shape)->shape.id == id)
          lc.repaintLayer("commentTool")
          return removed


module.exports = {ClearAction, AddShapeAction, RemoveByIdAction}
