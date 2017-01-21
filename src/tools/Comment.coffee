{ToolWithStroke} = require './base'
{createShape} = require '../core/shapes'


# this is pretty similar to the Rectangle tool. maybe consolidate somehow.
module.exports = class Comment extends ToolWithStroke

  name: 'Comment'
  iconName: 'Comment'
  index: 0

  begin: (x, y, lc) ->

    index = ++@index

    x = x - 7;
    y = y - 7;
    @currentShape = createShape('Comment', {
      index,
      x, y, 5,
      strokeColor: 'hsla(0, 100%, 42%, 1)',
      fillColor: 'hsla(0, 100%, 64%, 1)'})

    @currentShape.width = 14
    @currentShape.height = 14

    lc.backgroundShapes.push(@currentShape);
    lc.repaintLayer('background');
    lc.trigger('drawingChange');

#    lc.saveShape(@currentShape)
