var React = require('react');
var ReactDOM = require('react-dom');

var NavBar = require('./navBar.js');
var SlideMenu = require('./menu.js');
var DataTable = require('./table.js');

var App = React.createClass({
  getInitialState: function() {
    return {
      isMenuOpen: false
    , rows: [{}]
    , columns: []
    };
  },
  render: function() {
    return (
      <div>
        <NavBar />
        <div className="container-fluid">
          <SlideMenu />
          <div id="left" className="col-md-12">
            <DataTable ref="datatable" rows={this.state.rows} columns={this.state.columns} />
          </div>
        </div>
      </div>
    );
  },
  componentDidMount: function() {
    $.get('http://api.opendev.oscars.org/v1/assets/films', function(result) {
      if (this.isMounted()) {
        this.setState({ rows: result, columns: Object.keys(result[0]) });
      }
    }.bind(this));
  }
});
ReactDOM.render(
  <App  />,
  document.getElementById('content')
);
