{ToolWithStroke} = require './base'
{createShape} = require '../core/shapes'

module.exports = class Comment extends ToolWithStroke

  name: 'Comment'
  iconName: 'Comment'
  optionsStyle: 'null'

  begin: (x, y, lc) ->

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
    lc.repaintLayer('background');
    lc.trigger('drawingChange');

#    lc.saveShape(@currentShape)
