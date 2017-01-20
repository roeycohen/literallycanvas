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

  Comment.prototype.begin = function(x, y, lc) {
    this.currentShape = createShape('Comment', {
      x: x,
      y: y,
      strokeWidth: this.strokeWidth,
      strokeColor: lc.getColor('primary'),
      fillColor: lc.getColor('secondary')
    });
    this.currentShape.width = 13;
    this.currentShape.height = 13;
    return lc.saveShape(this.currentShape);
  };

  return Comment;

})(ToolWithStroke);
