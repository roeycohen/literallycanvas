var Options, React, createSetStateOnEventMixin, optionsStyles;

React = require('./React-shim');

createSetStateOnEventMixin = require('./createSetStateOnEventMixin');

optionsStyles = require('../optionsStyles/optionsStyles').optionsStyles;

Options = React.createClass({
  displayName: 'Options',
  getState: function() {
    var ref;
    return {
      style: (ref = this.props.lc.tool) != null ? ref.optionsStyle : void 0,
      tool: this.props.lc.tool,
      isBlocked: this.props.lc.isBlocked
    };
  },
  getInitialState: function() {
    var lc;
    lc = this.props.lc;
    lc.on('blockChanged', (function(_this) {
      return function(isBlock) {
        return _this.blockChanged(isBlock);
      };
    })(this));
    return this.getState();
  },
  blockChanged: function(isBlocked) {
    return this.setState({
      isBlocked: isBlocked
    });
  },
  mixins: [createSetStateOnEventMixin('toolChange')],
  renderBody: function() {
    var style;
    style = "" + this.state.style;
    return optionsStyles[style] && optionsStyles[style]({
      lc: this.props.lc,
      tool: this.state.tool,
      imageURLPrefix: this.props.imageURLPrefix
    });
  },
  render: function() {
    var div;
    div = React.DOM.div;
    return div({
      className: 'lc-options horz-toolbar'
    }, !this.state.isBlocked ? this.renderBody() : void 0);
  }
});

module.exports = Options;
