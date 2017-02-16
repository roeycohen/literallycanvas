{ToolWithStroke} = require './base'
{SelectShape} = require './SelectShape'
{createShape} = require '../core/shapes'
_ = require 'lodash'

module.exports = class Comment extends ToolWithStroke

  name: 'Comment'
  iconName: 'Comment'
  optionsStyle: 'null'

  begin: (x, y, lc) ->

    checkCanCurrentEdit = (shape)->
      if (lc.canEdit=="ALL" || ((lc.canEdit=="OWN") && (shape.userId==lc.userId)))
        return true
      return false


    checkIfOverlaps = (shape ,radius) ->

      if (Math.abs(shape.x - x + radius) < radius and Math.abs(shape.y - y + radius) < radius)
        true
      else
        false

    currentShape = _.findLast(lc.commentToolShapes, (shape)->
          return checkIfOverlaps(shape,Comment.width/2)
    )

    @beginPosition={x,y};

    @isCurrent=!!currentShape;

    if (!currentShape)
      if (!lc.canAdd)
        return

      x = x - Comment.width/2;
      y = y - Comment.width/2;

      @currentShape = createShape('Comment', {
        x, y, 5,
        name: @name,
        userId:lc.userId,
        strokeColor: 'rgba(255, 66, 113, 1)',
        fillColor: 'rgba(255, 66, 113, 1)'})

      @currentShape.width = Comment.width
      @currentShape.height = Comment.width
      lc.commentToolShapes.push(@currentShape);
    else
      @currentShape=currentShape
    @canCurrentEdit = checkCanCurrentEdit(@currentShape);

  continue: (x, y, lc) ->
    if (!@currentShape)
      return
    @currentShape.fillColor='rgba(255, 66, 113, 0.4)';
    @currentShape.strokeColor='rgba(255, 66, 113, 0.4)';

    if (@canCurrentEdit)
      @currentShape.x = x-@currentShape.width/2;
      @currentShape.y = y-@currentShape.height/2;
      lc.repaintLayer('commentTool')

  end: (x, y, lc) ->
    if (!@currentShape)
      return

    @currentShape.strokeColor= 'rgba(255, 66, 113, 1)';
    @currentShape.fillColor= 'rgba(255, 66, 113, 1)';
    lc.repaintLayer('commentTool')

    if (@isCurrent)
      isDrag=false;

      if (@canCurrentEdit)
        @currentShape.x>(lc.opts.imageSize.width-Comment.width) && (@currentShape.x=lc.opts.imageSize.width-Comment.width);
        @currentShape.y>(lc.opts.imageSize.height-Comment.width) && (@currentShape.y=lc.opts.imageSize.height-Comment.width);

        (@currentShape.x<0)&&(@currentShape.x=0);
        (@currentShape.y<0)&&(@currentShape.y=0);
        isDrag=(x!=@beginPosition.x || y!=@beginPosition.y);

      lc.trigger('lc_edit_point', {point:@currentShape, isDrag:isDrag});
    else
      lc.trigger('lc_add_point',  @currentShape);

    @currentShape = undefined
    @canCurrentEdit = undefined

Comment.width=30