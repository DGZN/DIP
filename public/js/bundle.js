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

	var NavBar = __webpack_require__(3);
	var SlideMenu = __webpack_require__(4);
	var DataTable = __webpack_require__(5);


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


	var App = React.createClass({displayName: "App",
	  getInitialState: function() {
	    return {
	      isMenuOpen: false
	    };
	  }
	, render: function() {
	    return (
	      React.createElement("div", null, 
	        React.createElement(NavBar, null), 
	        React.createElement("div", {className: "container-fluid"}, 
	          React.createElement(SlideMenu, null), 
	          React.createElement("div", {id: "left", className: "col-md-12"}, 
	            React.createElement(DataTable, {ref: "datatable", rows: rows})
	          )
	        )
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
/***/ function(module, exports) {

	/*
	 * Navbar with Dropdown
	 */

	var Nav = ReactBootstrap.Nav;
	var Navbar = ReactBootstrap.Navbar;
	var NavItem = ReactBootstrap.NavItem;
	var MenuItem = ReactBootstrap.MenuItem;
	var NavBrand = ReactBootstrap.NavBrand;
	var NavDropdown = ReactBootstrap.NavDropdown;

	var NavBar = React.createClass({displayName: "NavBar",
	  render: function() {
	    return (
	      React.createElement("div", {id: "nav"}, 
	        React.createElement(Navbar, {inverse: true, toggleNavKey: 0, fluid: true}, 
	          React.createElement(NavBrand, null, React.createElement("a", {href: "#"}, "DIP Dashboard ")), 
	          React.createElement(Nav, {right: true, eventKey: 0}, " ", /* This is the eventKey referenced */
	            React.createElement(NavDropdown, {eventKey: 3, title: "Account", id: "collapsible-navbar-dropdown"}, 
	              React.createElement(MenuItem, {eventKey: "1"}, "Action"), 
	              React.createElement(MenuItem, {eventKey: "2"}, "Another action"), 
	              React.createElement(MenuItem, {eventKey: "3"}, "Something else here"), 
	              React.createElement(MenuItem, {divider: true}), 
	              React.createElement(MenuItem, {eventKey: "4"}, "Logout")
	            )
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = NavBar;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	
	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(2);

	var Button = ReactBootstrap.Button;
	var Glyphicon = ReactBootstrap.Glyphicon;

	var Well = ReactBootstrap.Well;
	var Panel = ReactBootstrap.Panel;

	var ListGroup = ReactBootstrap.ListGroup;
	var ListGroupItem = ReactBootstrap.ListGroupItem;

	var SlideMenu = React.createClass({displayName: "SlideMenu",
	  toggleMenu: function(open) {
	    var menu = document.getElementById("menu");
	    menu.style['-webkit-transition'] = "right .5s ease-in-out";
	    menu.style['-moz-transition'] = "right .5s ease-in-out";
	    menu.style['-o-transition'] = "right .5s ease-in-out";
	    menu.style['transition'] = "right .5s ease-in-out";
	    menu.style['right'] = open ? '0px' : '-24.2%';
	  }
	, clicked: function() {
	  console.log("I was clicked")
	  console.log($('.table-body').eq(0))
	  console.log(this.refs.table.props.children[1].props.children)
	  }
	, getInitialState: function() {
	    return {
	      isMenuOpen: false
	    };
	  }
	, render: function() {
	    return (
	      React.createElement("div", {id: "menu", move: "0px", onMouseOver: this.toggleMenu.bind(this, true)}, 
	        React.createElement(Glyphicon, {className: "pull-right closeMenu text-danger", glyph: "remove", onClick: this.toggleMenu.bind(this, false)}), 
	        React.createElement("h3", {className: "menuTitle"},  this.props.title), 
	        React.createElement(Well, {bsSize: "small", className: "deliveries"}, 
	          React.createElement(ListGroup, null, 
	            React.createElement(ListGroupItem, {href: "#link1", bsSize: "small"}, "Link 1"), 
	            React.createElement(ListGroupItem, {href: "#link1", bsSize: "small", bsStyle: "danger"}, "ERROR"), 
	            React.createElement(ListGroupItem, {href: "#link1", bsSize: "small"}, "Link 1"), 
	            React.createElement(ListGroupItem, {href: "#link1", bsSize: "small", bsStyle: "success"}, "Link 1"), 
	            React.createElement(ListGroupItem, {href: "#link1", bsSize: "small"}, "Link 1"), 
	            React.createElement(ListGroupItem, {href: "#link1", bsSize: "small", bsStyle: "success"}, "Link 1"), 
	            React.createElement(ListGroupItem, {href: "#link1", bsSize: "small"}, "Link 1"), 
	            React.createElement(ListGroupItem, {href: "#link1", bsSize: "small", bsStyle: "success"}, "Link 1"), 
	            React.createElement(ListGroupItem, {href: "#link1", bsSize: "small"}, "Link 1"), 
	            React.createElement(ListGroupItem, {href: "#link1", bsSize: "small"}, "Link 1")
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = SlideMenu


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(2);

	var BSTable = ReactBootstrap.Table;
	var Well = ReactBootstrap.Well;

	var Input = ReactBootstrap.Input;
	var Check = ReactBootstrap.Check;

	var Row = React.createClass({displayName: "Row",
	  getInitialState: function() {
	    return {
	      viewed: false
	    , checked:  this.props.checked
	    , override: this.props.override
	    };
	  },
	  handleClick: function(){
	    this.setState({viewed: true});
	  },
	  handleCheck: function() {
	    this.setState({ checked: !this.state.checked, override: true })
	  },
	  componentWillReceiveProps: function(nextProps) {
	    var state = this.state
	    if (nextProps.override) var state = nextProps
	    this.setState(state)
	  },
	  render: function() {

	    var isChecked = this.props.override
	      ? this.props.checked
	      : this.state.checked;
	    var checked = isChecked
	      ? React.createElement(Input, {type: "checkbox", onChange: this.handleCheck, checked: true, label: "1"})
	      : React.createElement(Input, {type: "checkbox", onChange: this.handleCheck, label: "1"})
	    return (
	        React.createElement("tr", null, 
	          React.createElement("td", {className: "rowID"}, 
	            checked
	          ), 
	          React.createElement("td", null, this.props.row.title), 
	          React.createElement("td", null, this.props.row.description), 
	          React.createElement("td", null, React.createElement("a", {onClick: this.handleClick}, "view ", this.state.viewed ? '(viewed)' : ''))
	        )
	    );
	  }
	})

	var Table = React.createClass({displayName: "Table",
	  getInitialState: function() {
	    return {
	      sortField: ''
	    , checked: false
	    , override: false
	    };
	  }
	, render: function() {
	    var props = this.props;
	    var state = this.state
	    var rows = props.rows
	      .filter(function(row){
	        return row.title.toLowerCase().indexOf(props.filterText.toLowerCase()) > -1;
	      })
	      .sort(function(a, b){
	        if (!state.sortField) return;
	        var field = state.sortField;
	        if(a[field] < b[field]) return -1;
	        if(a[field] > b[field]) return 1;
	        return 0;
	      })
	      .map(function(row, i){
	        i++;
	        return React.createElement(Row, {key: row.title, rowID: i, row: row, checked: state.checked, sortField: state.sortField, override: state.override});
	      });
	    return (
	        React.createElement("div", {className: "row spacer"}, 
	          React.createElement("div", null, 
	            React.createElement(BSTable, {striped: true, bordered: true, hover: true}, 
	                React.createElement("thead", {className: "data-table-thead"}, 
	                  React.createElement("tr", null, 
	                    React.createElement("th", null, React.createElement(Input, {type: "checkbox", onChange: this.handleCheck, label: "1"})), 
	                    React.createElement("th", {onClick: this.handleClick.bind(this, 'test')}, "Title"), 
	                    React.createElement("th", {onClick: this.handleClick.bind(this, 'description')}, "Description"), 
	                    React.createElement("th", null, "Link")
	                  )
	                ), 
	                React.createElement("tbody", null, rows)
	            )
	          )
	        )
	    );
	  }
	, handleClick: function(sortField) {
	    this.setState({ sortField: sortField, override: false })
	  }
	, handleCheck: function() {
	    this.setState({ checked: !this.state.checked, override: true })
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
	    , sortField: ''
	    };
	  },

	  handleUserInput: function(filterText) {
	    this.setState({ filterText: filterText });
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