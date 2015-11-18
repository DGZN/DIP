var React = require('react');
var ReactDOM = require('react-dom');

var NavBar = require('./navBar.js');
var SlideMenu = require('./menu.js');
var DataTable = require('./table.js');


var rows = [{
    title : "A",
    description: "F",
    link: "123"
  },{
    title : "B",
    description: "E",
    link: "123"
  },{
    title : "C",
    description: "D",
    link: "123"
  },{
    title : "E",
    description: "C",
    link: "123"
  },{
    title : "F",
    description: "B",
    link: "123"
  },{
    title : "D",
    description: "A",
    link: "456"
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
            <DataTable ref="datatable" rows={rows} columns={Object.keys(rows[0])} />
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
