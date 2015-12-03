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
    var dropDown = []
    for (var i in this.props.data) {
      var route = this.props.data[i]
      dropDown.push(<MenuItem eventKey={i} key={i} onSelect={this.props.onSelect.bind(null, { type: 'route', route: route })}>{route.name}</MenuItem>)
    }
    if (this.props.selected.options) {
      var options = this.props.selected.options
      var _options = []
      for(var option in options){
        if (option == 'default') continue;
        if (options.default.hasOwnProperty(option))
          var title = this.props.select.length ? this.props.select : options.default[option]
        if (typeof options[option] == "object")
          for (var i in options[option]){
            if (_options.length < 1)
              var title = title || options[option][i]
            _options.push(<MenuItem eventKey={i} key={i} onSelect={this.props.onSelect.bind(null, { type: 'option', option: { [option]: options[option][i] } })}>{uc(options[option][i])}</MenuItem>)
          }
        var optionsDropDown = (
          <DropdownButton title={uc(title)} id="bg-nested-options-dropdown" bsSize="md" className="data-table-options-dropdown"  >
            {_options}
          </DropdownButton>)
      }
    }
    return (
      <div className="row table-search">
        <div className="data-table-search-panel">
          <input ref="filterTextInput" type="search" autoFocus className="data-table-search-input form-control input-lg" value={this.props.filter} onChange={this.props.onChange} placeholder="Search..." aria-describedby="sizing-addon1"></input>
          <DropdownButton title={this.props.selected.name || 'Schemas'} id="bg-nested-dropdown" bsSize="lg" className="data-table-filter-dropdown" >
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
