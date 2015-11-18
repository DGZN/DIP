var React = require('react');
var ReactDOM = require('react-dom');

var NavBar = require('./navBar.js');
var SlideMenu = require('./menu.js');
var DataTable = require('./table.js');


var rows = [{
    title : "Angular with Yeoman",
  },{
    title : "Using D3 with Rickshaw and Angular",
  },{
    title : "Canvas with paper.js",
  },{
    title : "Express.js middleware",
  },{
    title : "MEAN stack - episode 1",
  }
];


var App = React.createClass({
  getInitialState: function() {
    return {
      isMenuOpen: false
    };
  }
, render: function() {
    return (
      <div>
        <NavBar />
        <div className="container-fluid">
          <SlideMenu />
          <div id="left" className="col-md-12">
            <DataTable rows={rows} />
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
