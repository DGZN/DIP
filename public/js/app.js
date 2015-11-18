var React = require('react');
var ReactDOM = require('react-dom');

var NavBar = require('./navBar.js');
var SlideMenu = require('./menu.js');
var DataTable = require('./table.js');


var rows = [{
    title : "A",
    description: "F"
  },{
    title : "B",
    description: "E"
  },{
    title : "C",
    description: "D"
  },{
    title : "E",
    description: "C"
  },{
    title : "F",
    description: "B"
  },{
    title : "D",
    description: "A"
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
