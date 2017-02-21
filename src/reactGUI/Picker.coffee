React = require './React-shim'

ClearButton = React.createFactory require './ClearButton'
ZoomButtons = React.createFactory require './ZoomButtons'

{_} = require '../core/localization'
ColorWell = React.createFactory require './ColorWell'

ColorPickers = React.createFactory React.createClass
  displayName: 'ColorPickers'
  render: ->
    {lc} = @props
    {div} = React.DOM
    (div {className: 'lc-color-pickers'},
      (ColorWell {lc, colorName: 'primary', label: _('stroke')})
      (ColorWell {lc, colorName: 'secondary', label: _('fill')}),
      (ColorWell {lc, colorName: 'background', label: _('bg')})
    )


Picker = React.createClass

  displayName: 'Picker'

  getInitialState: () ->

    {lc} = @props

    lc.on('blockChanged', (isBlock)=>
      @blockChanged(isBlock)
    )

    {
      isBlocked: lc.isBlocked
      selectedToolIndex: 0
    }

  blockChanged: (isBlocked) ->
    @setState({
      isBlocked: isBlocked
    })

  renderBody: () ->
    {div} = React.DOM
    {lc, imageURLPrefix,toolButtonComponents,toolBlockedButtonComponents} = @props
    if (!@state.isBlocked)
      toolButton=toolButtonComponents
    else
      toolButton=toolBlockedButtonComponents

    (div {className: 'lc-picker-contents'},
      toolButton.map((component, ix) =>
        (component \
          {
            lc, imageURLPrefix,
            key: ix
            isSelected: ix == @state.selectedToolIndex,
            onSelect: (tool) =>
              lc.setTool(tool)
              @setState({selectedToolIndex: ix})
          }
        )
      ),
      if toolButton.length % 2 != 0
        (div {className: 'toolbar-button thin-button disabled'})
      (div style: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        },
        !this.state.isBlocked&&ColorPickers({lc: @props.lc})
        ZoomButtons({lc, imageURLPrefix})
        !this.state.isBlocked&&ClearButton({lc})
      )
    )
  render: ->
    {div} = React.DOM
    (div {className: 'lc-picker'},
      this.renderBody()
    )


module.exports = Picker
