var Comment, ToolWithStroke, _, createShape,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ToolWithStroke = require('./base').ToolWithStroke;

createShape = require('../core/shapes').createShape;

_ = require('lodash');

module.exports = Comment = (function(superClass) {
  extend(Comment, superClass);

  function Comment() {
    return Comment.__super__.constructor.apply(this, arguments);
  }

  Comment.prototype.name = 'Comment';

  Comment.prototype.iconName = 'Comment';

  Comment.prototype.optionsStyle = 'null';

  Comment.prototype.begin = function(x, y, lc) {
    var checkIfOverlaps, current;
    checkIfOverlaps = function(shape) {
      if (Math.abs(shape.x - x + 7) < 7 && Math.abs(shape.y - y + 7) < 7) {
        return true;
      } else {
        return false;
      }
    };
    current = _.find(lc.backgroundShapes, function(shape) {
      if (shape.name === 'Comment') {
        return checkIfOverlaps(shape);
      }
    });
    if (!current) {
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
      lc.trigger('add_whiteboard_point', this.currentShape);
      lc.trigger('lc_add_point', this.currentShape);
      lc.repaintLayer('background');
      return lc.trigger('drawingChange');
    } else {
      return lc.trigger('lc_edit_point', this.currentShape);
    }
  };

  return Comment;

})(ToolWithStroke);
