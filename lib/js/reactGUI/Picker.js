var ClearButton, ColorPickers, ColorWell, Picker, React, ZoomButtons, _;

React = require('./React-shim');

ClearButton = React.createFactory(require('./ClearButton'));

ZoomButtons = React.createFactory(require('./ZoomButtons'));

_ = require('../core/localization')._;

ColorWell = React.createFactory(require('./ColorWell'));

ColorPickers = React.createFactory(React.createClass({
  displayName: 'ColorPickers',
  render: function() {
    var div, lc;
    lc = this.props.lc;
    div = React.DOM.div;
    return div({
      className: 'lc-color-pickers'
    }, ColorWell({
      lc: lc,
      colorName: 'primary',
      label: _('stroke')
    }), ColorWell({
      lc: lc,
      colorName: 'secondary',
      label: _('fill')
    }), ColorWell({
      lc: lc,
      colorName: 'background',
      label: _('bg')
    }));
  }
}));

Picker = React.createClass({
  displayName: 'Picker',
  getInitialState: function() {
    var lc;
    lc = this.props.lc;
    lc.on('blockChanged', (function(_this) {
      return function(isBlock) {
        return _this.blockChanged(isBlock);
      };
    })(this));
    return {
      isBlocked: lc.isBlocked,
      selectedToolIndex: 0
    };
  },
  blockChanged: function(isBlocked) {
    return this.setState({
      isBlocked: isBlocked
    });
  },
  renderBody: function() {
    var div, imageURLPrefix, lc, ref, toolBlockedButtonComponents, toolButton, toolButtonComponents;
    div = React.DOM.div;
    ref = this.props, lc = ref.lc, imageURLPrefix = ref.imageURLPrefix, toolButtonComponents = ref.toolButtonComponents, toolBlockedButtonComponents = ref.toolBlockedButtonComponents;
    if (!this.state.isBlocked) {
      toolButton = toolButtonComponents;
    } else {
      toolButton = toolBlockedButtonComponents;
    }
    return div({
      className: 'lc-picker-contents'
    }, toolButton.map((function(_this) {
      return function(component, ix) {
        return component({
          lc: lc,
          imageURLPrefix: imageURLPrefix,
          key: ix,
          isSelected: ix === _this.state.selectedToolIndex,
          onSelect: function(tool) {
            lc.setTool(tool);
            return _this.setState({
              selectedToolIndex: ix
            });
          }
        });
      };
    })(this)), toolButton.length % 2 !== 0 ? div({
      className: 'toolbar-button thin-button disabled'
    }) : void 0, div({
      style: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
      }
    }, !this.state.isBlocked && ColorPickers({
      lc: this.props.lc
    }), ZoomButtons({
      lc: lc,
      imageURLPrefix: imageURLPrefix
    }), !this.state.isBlocked && ClearButton({
      lc: lc
    })));
  },
  render: function() {
    var div;
    div = React.DOM.div;
    return div({
      className: 'lc-picker'
    }, this.renderBody());
  }
});

module.exports = Picker;
