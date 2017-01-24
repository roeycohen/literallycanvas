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

  Comment.prototype.optionsStyle = 'null';

  Comment.prototype.begin = function(x, y, lc) {
    x = x - 7;
    y = y - 7;
    this.currentShape = createShape('Comment', {
      x: x,
      y: y,
      5: 5,
      name: this.name,
      strokeColor: 'hsla(0, 100%, 42%, 1)',
      fillColor: 'hsla(0, 100%, 64%, 1)'
    });
    this.currentShape.width = 14;
    this.currentShape.height = 14;
    lc.backgroundShapes.push(this.currentShape);
    lc.repaintLayer('background');
    return lc.trigger('drawingChange');
  };

  return Comment;

})(ToolWithStroke);
