var React = require('react');
var ReactDOM = require('react-dom');

var NavBar = require('./navBar.js');
var SlideMenu = require('./menu.js');
//var DataTable = require('./table.js');
var DataTable = require('./components/datatable');

// var routes = [{
//   name: 'Oscars'
// , endpoint: 'http://api.opendev.oscars.org/v1/assets/films?!fields=last_watched,guid,slug,resume'
// },{
//   name: 'Analytics'
// , endpoint: 'http://api.opendev.oscars.org/v1/analytics/traces'
// , columns: {
//     ignore: ['name', 'type', 'os', 'browser', 'language', 'events']
//   }
// }];

var routes = [{
  name: 'Series'
, endpoint: 'http://localhost:8000/v1/assets/series'
, columns: {
    ignore:  ['seasons', 'meta']
  , include: ['meta.en.name as name']
  , headers: ['id', 'name']
  }
},{
  name: 'Seasons'
, endpoint: 'http://localhost:8000/v1/assets/series/seasons'
, columns: {
    ignore: ['meta', 'episodes']
  }
},{
  name: 'Episodes'
, endpoint: 'http://localhost:8000/v1/assets/series/seasons/episodes'
},{
  name: 'Albums'
, endpoint: 'http://localhost:8000/v1/assets/albums'
, columns: {
    ignore: ['meta', 'songs']
  }
},{
  name: 'Songs'
, endpoint: 'http://localhost:8000/v1/assets/albums/songs'
, columns: {
    ignore: ['']
  }
},{
  name: 'Movies'
, endpoint: 'http://localhost:8000/v1/assets/movies'
, columns: {
    ignore: ['meta']
  }
},{
  name: 'Plays'
, endpoint: 'http://localhost:8000/v1/assets/plays'
, columns: {
    ignore: ['plays']
  }
}];

var rows = [{
  firstName: 'Keiichi'
, lastName: 'Lindley'
, userName: 'DGZN'
},{
  firstName: 'Sam'
, lastName: 'Smith'
, userName: 'SMITHY'
}]



var App = React.createClass({
  render: function() {
    return (
      <div>
        <NavBar />
        <div className="container-fluid">
          <SlideMenu />
          <div id="left" className="col-md-12">
            <DataTable ref="datatable" routes={routes} rows={rows} />
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
