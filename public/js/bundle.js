/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(2);

	// require ('./menu.js');
	// require ('./bootstrap-components.js');

	var DataTable = __webpack_require__(3);


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


	var App = React.createClass({displayName: "App",
	  getInitialState: function() {
	    return {
	      isMenuOpen: false
	    };
	  }
	, render: function() {
	    return (
	      React.createElement("div", {id: "left", classN: "col-md-12"}, 
	        React.createElement(DataTable, {rows: rows})
	      )
	    );
	  }
	});

	ReactDOM.render(
	  React.createElement(App, null),
	  document.getElementById('content')
	);


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(2);

	var BSTable = ReactBootstrap.Table;
	var Well = ReactBootstrap.Well;

	var Input = ReactBootstrap.Input;

	var Row = React.createClass({displayName: "Row",
	  getInitialState: function() {
	    return {
	        viewed: false
	    };
	  },
	  handleClick: function(){
	    this.setState({viewed: true});
	  },
	  render: function() {
	    return (
	        React.createElement("tr", null, 
	          React.createElement("td", null, this.props.row.title), 
	          React.createElement("td", null, React.createElement("a", {onClick: this.handleClick}, "view ", this.state.viewed ? '(viewed)' : ''))
	        )
	    );
	  }
	})

	var Table = React.createClass({displayName: "Table",
	  render: function() {
	    var props = this.props;
	    var rows = props.rows
	      .filter(function(row){
	        return row.title.toLowerCase().indexOf(props.filterText.toLowerCase()) > -1;
	      })
	      .map(function(row){
	        return React.createElement(Row, {key: row.title, row: row});
	      });

	    return (
	        React.createElement("div", {className: "row spacer"}, 
	          React.createElement("div", null, 
	            React.createElement(BSTable, {striped: true, bordered: true, hover: true}, 
	                React.createElement("thead", null, 
	                    React.createElement("tr", null, 
	                        React.createElement("th", null, "Title"), 
	                        React.createElement("th", null, "Link")
	                    )
	                ), 
	                React.createElement("tbody", null, rows)
	            )
	          )
	        )
	    );
	  }
	});

	var SearchBar = React.createClass({displayName: "SearchBar",
	  handleChange: function() {
	      this.props.onUserInput(
	          this.refs.filterTextInput.value
	      );
	  },
	  render: function() {
	    return (
	      React.createElement("div", {className: "row table-search"}, 
	        React.createElement("form", {className: "form-grop", onSubmit: this.handleSubmit}, 
	            React.createElement("input", {ref: "filterTextInput", type: "search", className: "form-control input-lg", value: this.props.filterText, onChange: this.handleChange, placeholder: "Search for packages", "aria-describedby": "sizing-addon1"})
	        )
	      )
	    );
	  }
	});

	var DataTable = React.createClass({displayName: "DataTable",
	  getInitialState: function() {
	    return {
	        filterText: ''
	    };
	  },

	  handleUserInput: function(filterText) {
	    this.setState({
	        filterText: filterText
	    });
	  },

	  render: function() {
	    return (
	        React.createElement(Well, {className: "data-table-well"}, 
	          React.createElement(SearchBar, {onUserInput: this.handleUserInput, filterText: this.state.filterText}), 
	          React.createElement(Table, {filterText: this.state.filterText, rows: this.props.rows})
	        )
	    );
	  }
	});

	module.exports = DataTable;


/***/ }
/******/ ]);