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
    var _routes = []
    for (var i in this.props.routes) {
      var route = this.props.routes[i]
      _routes.push(<MenuItem eventKey={i} key={i} onSelect={this.props.onSelect.bind(null, route)}>{route.name}</MenuItem>)
    }
    return (
      <div className="row table-search">
        <div className="data-table-search-panel">
          <input ref="filterTextInput" type="search" autoFocus className="data-table-search-input form-control input-lg" value={this.props.filter} onChange={this.props.onChange} placeholder="Search..." aria-describedby="sizing-addon1"></input>
          <DropdownButton title={this.props.selected.name || 'Routes'} id="bg-nested-dropdown" bsSize="lg" className="data-table-filter-dropdown" >
            {_routes}
          </DropdownButton>
        </div>
      </div>
    );
  }
});

module.exports = SearchBar
