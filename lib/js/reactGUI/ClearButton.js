var ClearButton, React, _, classSet, createSetStateOnEventMixin;

React = require('./React-shim');

createSetStateOnEventMixin = require('./createSetStateOnEventMixin');

_ = require('../core/localization')._;

classSet = require('../core/util').classSet;

ClearButton = React.createClass({
  displayName: 'ClearButton',
  getState: function() {
    return {
      isEnabled: this.props.lc.canUndo()
    };
  },
  getInitialState: function() {
    return this.getState();
  },
  mixins: [createSetStateOnEventMixin('drawingChange')],
  render: function() {
    var className, div, lc, onClick;
    div = React.DOM.div;
    lc = this.props.lc;
    className = classSet({
      'lc-clear': true,
      'toolbar-button': true,
      'fat-button': true,
      'disabled': false
    });
    onClick = true ? ((function(_this) {
      return function() {
        var confirmWindow;
        confirmWindow = confirm("Are you sure?");
        return confirmWindow && lc.clear();
      };
    })(this)) : function() {};
    return div({
      className: className,
      onClick: onClick
    }, _('Clear'));
  }
});

module.exports = ClearButton;
