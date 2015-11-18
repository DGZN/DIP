var React = require('react');
var ReactDOM = require('react-dom');

var NavBar = require('./navBar.js');
var SlideMenu = require('./menu.js');
var DataTable = require('./table.js');


var rows = [{
    title : "Angular with Yeoman",
    description: "A"
  },{
    title : "Using D3 with Rickshaw and Angular",
    description: "B"
  },{
    title : "Canvas with paper.js",
    description: "C"
  },{
    title : "Express.js middleware",
    description: "Z"
  },{
    title : "MEAN stack - episode 1",
    description: "K"
  },{
    title : "Bear Claws on sale!",
    description: "M"
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
            <DataTable ref="datatable" rows={rows} />
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
