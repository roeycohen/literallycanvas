var Comment, SelectShape, ToolWithStroke, _, createShape,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ToolWithStroke = require('./base').ToolWithStroke;

SelectShape = require('./SelectShape').SelectShape;

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
    checkIfOverlaps = function(shape, radius) {
      if (Math.abs(shape.x - x + radius) < radius && Math.abs(shape.y - y + radius) < radius) {
        return true;
      } else {
        return false;
      }
    };
    current = _.find(lc.commentToolShapes, function(shape) {
      if (shape.name === 'Comment') {
        return checkIfOverlaps(shape, Comment.width / 2);
      }
    });
    this.isCurrent = !!current;
    if (!current) {
      x = x - Comment.width / 2;
      y = y - Comment.width / 2;
      this.currentShape = createShape('Comment', {
        x: x,
        y: y,
        5: 5,
        name: this.name,
        strokeColor: 'rgba(255, 66, 113, 1)',
        fillColor: 'rgba(255, 66, 113, 1)'
      });
      this.currentShape.width = Comment.width;
      this.currentShape.height = Comment.width;
      return lc.commentToolShapes.push(this.currentShape);
    } else {
      this.beginPosition = {
        x: x,
        y: y
      };
      return this.currentShape = current;
    }
  };

  Comment.prototype["continue"] = function(x, y, lc) {
    this.currentShape.fillColor = 'rgba(255, 66, 113, 0.4)';
    this.currentShape.strokeColor = 'rgba(255, 66, 113, 0.4)';
    this.currentShape.x = x - this.currentShape.width / 2;
    this.currentShape.y = y - this.currentShape.height / 2;
    return lc.repaintLayer('commentTool');
  };

  Comment.prototype.end = function(x, y, lc) {
    this.currentShape.x > (lc.opts.imageSize.width - Comment.width) && (this.currentShape.x = lc.opts.imageSize.width - Comment.width);
    this.currentShape.y > (lc.opts.imageSize.height - Comment.width) && (this.currentShape.y = lc.opts.imageSize.height - Comment.width);
    (this.currentShape.x < 0) && (this.currentShape.x = 0);
    (this.currentShape.y < 0) && (this.currentShape.y = 0);
    this.currentShape.strokeColor = 'rgba(255, 66, 113, 1)';
    this.currentShape.fillColor = 'rgba(255, 66, 113, 1)';
    lc.repaintLayer('commentTool');
    if (this.isCurrent) {
      lc.trigger('lc_edit_point', {
        point: this.currentShape,
        isDrag: x !== this.beginPosition.x || y !== this.beginPosition.y
      });
    } else {
      lc.trigger('lc_add_point', this.currentShape);
    }
    return this.currentShape = void 0;
  };

  return Comment;

})(ToolWithStroke);

Comment.width = 30;
