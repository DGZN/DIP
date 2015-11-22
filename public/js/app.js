var React = require('react');
var ReactDOM = require('react-dom');

var NavBar = require('./navBar.js');
var SlideMenu = require('./menu.js');
var DataTable = require('./table.js');

var routes = [{
  name: 'Oscars'
, endpoint: 'http://api.opendev.oscars.org/v1/assets/films?!fields=last_watched,poster,guid,slug,resume'
},{
  name: 'Analytics'
, endpoint: 'http://api.opendev.oscars.org/v1/analytics/traces'
, columns: {
    ignore: ['name', 'type', 'os', 'browser', 'language', 'events']
  }
}];

var App = React.createClass({
  render: function() {
    return (
      <div>
        <NavBar />
        <div className="container-fluid">
          <SlideMenu />
          <div id="left" className="col-md-12">
            <DataTable ref="datatable" routes={routes} />
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
