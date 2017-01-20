{ToolWithStroke} = require './base'
{createShape} = require '../core/shapes'


# this is pretty similar to the Rectangle tool. maybe consolidate somehow.
module.exports = class Comment extends ToolWithStroke

  name: 'Comment'
  iconName: 'Comment'

  begin: (x, y, lc) ->
    @currentShape = createShape('Comment', {
      x, y, 5,
      strokeColor: lc.getColor('primary'),
      fillColor: lc.getColor('secondary')})

    @currentShape.width = 13
    @currentShape.height = 13

    lc.saveShape(@currentShape)
