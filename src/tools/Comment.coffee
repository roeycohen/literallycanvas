{ToolWithStroke} = require './base'
{SelectShape} = require './SelectShape'
{createShape} = require '../core/shapes'
_ = require 'lodash'

module.exports = class Comment extends ToolWithStroke

  name: 'Comment'
  iconName: 'Comment'
  optionsStyle: 'null'

  begin: (x, y, lc) ->

    checkIfOverlaps = (shape ,radius) ->

      if (Math.abs(shape.x - x + radius) < radius and Math.abs(shape.y - y + radius) < radius)
        true
      else
        false

    current = _.find(lc.commentToolShapes, (shape)->
        if shape.name == 'Comment'
          return checkIfOverlaps(shape,Comment.width/2)
    )

    @isCurrent=!!current;
    if (!current)
      x = x - Comment.width/2;
      y = y - Comment.width/2;

      @currentShape = createShape('Comment', {
        x, y, 5,
        name: @name,
        strokeColor: 'rgba(255, 66, 113, 1)',
        fillColor: 'rgba(255, 66, 113, 1)'})

      @currentShape.width = Comment.width
      @currentShape.height = Comment.width
      lc.commentToolShapes.push(@currentShape);
    else
      @beginPosition={x,y};
      @currentShape=current;

  continue: (x, y, lc) ->
    @currentShape.fillColor='rgba(255, 66, 113, 0.4)';
    @currentShape.strokeColor='rgba(255, 66, 113, 0.4)';
    @currentShape.x = x-@currentShape.width/2;
    @currentShape.y = y-@currentShape.height/2;
    lc.repaintLayer('commentTool')

  end: (x, y, lc) ->
    @currentShape.x>(lc.opts.imageSize.width-Comment.width) && (@currentShape.x=lc.opts.imageSize.width-Comment.width);
    @currentShape.y>(lc.opts.imageSize.height-Comment.width) && (@currentShape.y=lc.opts.imageSize.height-Comment.width);

    (@currentShape.x<0)&&(@currentShape.x=0);
    (@currentShape.y<0)&&(@currentShape.y=0);

    @currentShape.strokeColor= 'rgba(255, 66, 113, 1)';
    @currentShape.fillColor= 'rgba(255, 66, 113, 1)';
    lc.repaintLayer('commentTool')

    if (@isCurrent)
      lc.trigger('lc_edit_point', {point:@currentShape, isDrag:(x!=@beginPosition.x || y!=@beginPosition.y)});
    else
      lc.trigger('lc_add_point',  @currentShape);

    @currentShape = undefined

Comment.width=30