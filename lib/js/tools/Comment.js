var Comment, ToolWithStroke, createShape,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ToolWithStroke = require('./base').ToolWithStroke;

createShape = require('../core/shapes').createShape;

module.exports = Comment = (function(superClass) {
  extend(Comment, superClass);

  function Comment() {
    return Comment.__super__.constructor.apply(this, arguments);
  }

  Comment.prototype.name = 'Comment';

  Comment.prototype.iconName = 'Comment';

  Comment.prototype.index = 0;

  Comment.prototype.begin = function(x, y, lc) {
    var index;
    index = this.index++;
    x = x - 7;
    y = y - 7;
    this.currentShape = createShape('Comment', {
      index: index,
      x: x,
      y: y,
      5: 5,
      strokeColor: 'hsla(0, 100%, 42%, 1)',
      fillColor: 'hsla(0, 100%, 42%, 1)'
    });
    this.currentShape.width = 13;
    this.currentShape.height = 13;
    lc.backgroundShapes.push(this.currentShape);
    lc.repaintLayer('background');
    return lc.trigger('drawingChange');
  };

  return Comment;

})(ToolWithStroke);
