var React = require('react');
var ReactDOM = require('react-dom');

var NavBar = require('./navBar.js');
var SlideMenu = require('./menu.js');
var DataTable = require('./table.js');

var routes = {
  'Oscars': 'http://api.opendev.oscars.org/v1/assets/films?!fields=last_watched,poster,guid,slug,resume'
, 'Melody': 'http://localhost:8000/v1/assets/movies'
, 'Seasons':  'http://localhost:8000/v1/assets/series/seasons/episodes'
};

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
            <DataTable ref="datatable" rows={this.state.rows} columns={this.state.columns} routes={routes} />
          </div>
        </div>
      </div>
    );
  }
});
ReactDOM.render(
  <App  />,
  document.getElementById('content')
);
