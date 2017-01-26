{ToolWithStroke} = require './base'
{createShape} = require '../core/shapes'
_ = require 'lodash'

module.exports = class Comment extends ToolWithStroke

  name: 'Comment'
  iconName: 'Comment'
  optionsStyle: 'null'

  begin: (x, y, lc) ->

    checkIfOverlaps = (shape) ->

      if (Math.abs(shape.x - x + 7) < 7 and Math.abs(shape.y - y + 7) < 7)
        true
      else
        false

    current = _.find(lc.backgroundShapes, (shape)->
        if shape.name == 'Comment'
          return checkIfOverlaps(shape)
    )
    if (!current)
      x = x - 7;
      y = y - 7;

      @currentShape = createShape('Comment', {
        x, y, 5,
        name: @name,
        strokeColor: 'hsla(0, 100%, 42%, 1)',
        fillColor: 'hsla(0, 100%, 64%, 1)'})

      @currentShape.width = 14
      @currentShape.height = 14

      lc.backgroundShapes.push(@currentShape);
      lc.trigger('add_whiteboard_point',  @currentShape)
      lc.trigger('lc_add_point',  @currentShape);
      lc.repaintLayer('background');
      lc.trigger('drawingChange');
    else
      lc.trigger('lc_edit_point',  @currentShape);
#      lc.trigger('edit_whiteboard_point',  @currentShape.id)

#    lc.saveShape(@currentShape)
