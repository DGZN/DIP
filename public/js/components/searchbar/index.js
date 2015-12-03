var React = require('react'),
 ReactDOM = require('react-dom');

 var Input = ReactBootstrap.Input;
 var MenuItem = ReactBootstrap.MenuItem;
 var DropdownButton = ReactBootstrap.DropdownButton;
 var Glyphicon = ReactBootstrap.Glyphicon;

var SearchBar = React.createClass({
  getInitialState: function() {
    return {
      route: ''
    }
  },
  render: function() {
    var dropDown = [],
    props = this.props;
    for (var i in props.data) {
      var route = props.data[i]
      var option = {
        type: 'route'
      , route: route
      }
      dropDown.push(
        <MenuItem
          key={i}
          eventKey={i}
          onSelect={props.onSelect.bind(null, option)}> {route.name}
        </MenuItem>)
    }
    if (props.selected.options) {
      var options = props.selected.options
      var _options = []
      for(var option in options){
        if (option == 'default') continue;
        if (options.default.hasOwnProperty(option))
          var title = props.active.length
            ? props.active
            : options.default[option]
        if (typeof options[option] == "object")
          for (var i in options[option]){
            if (_options.length < 1)
              var title = title || options[option][i]
            var _option = {
              type: 'option'
            , option: {
                [option]: options[option][i]
              }
            }
            _options.push(
              <MenuItem
                key={i}
                eventKey={i}
                onSelect={props.onSelect.bind(null, _option)}>
                {uc(options[option][i])}
              </MenuItem>
            )
          }
        var optionsDropDown = (
          <DropdownButton
            title={uc(title)}
            id="bg-nested-options-dropdown"
            bsSize="md"
            className="data-table-options-dropdown">
            {_options}
          </DropdownButton>
        )
      }
    }
    return (
      <div className="row table-search">
        <div className="data-table-search-panel">
          <input
            autoFocus
            type="search"
            ref="filterTextInput"
            value={props.filter} onChange={props.onChange}
            placeholder="Search..." aria-describedby="sizing-addon1"
            className="data-table-search-input form-control input-lg">
          </input>
          <DropdownButton
            title={props.selected.name || 'Schemas'}
            id="bg-nested-dropdown"
            bsSize="lg"
            className="data-table-filter-dropdown">
            {dropDown}
          </DropdownButton>
          {optionsDropDown}
        </div>
      </div>
    );
  }
});

function uc(s){
  return s.charAt(0).toUpperCase() + s.slice(1);
}

module.exports = SearchBar
