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
	//var DataTable = require('./table.js');
	var DataTable = __webpack_require__(5);

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




	var App = React.createClass({displayName: "App",
	  render: function() {
	    return (
	      React.createElement("div", null, 
	        React.createElement(NavBar, null), 
	        React.createElement("div", {className: "container-fluid"}, 
	          React.createElement(SlideMenu, null), 
	          React.createElement("div", {id: "left", className: "col-md-12"}, 
	            React.createElement(DataTable, {ref: "datatable", routes: routes})
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

	     var React = __webpack_require__(1),
	      ReactDOM = __webpack_require__(2),
	         merge = __webpack_require__(6),
	          Well = ReactBootstrap.Well,
	         Input = ReactBootstrap.Input,
	         Check = ReactBootstrap.Check,
	         Table = ReactBootstrap.Table,
	      MenuItem = ReactBootstrap.MenuItem,
	     Glyphicon = ReactBootstrap.Glyphicon,
	DropdownButton = ReactBootstrap.DropdownButton;


	const header = (
	  React.createElement("tr", null, 
	    React.createElement("td", null, "1"), 
	    React.createElement("td", null, "Mark"), 
	    React.createElement("td", null, "Otto"), 
	    React.createElement("td", null, "@mdo")
	  )
	)

	const row = (
	  React.createElement("tr", null, 
	    React.createElement("th", null, "#"), 
	    React.createElement("th", null, "First Name"), 
	    React.createElement("th", null, "Last Name"), 
	    React.createElement("th", null, "Username")
	  )
	)

	const thead = (
	  React.createElement("thead", null, 
	    header
	  )
	)

	const tbody = (
	  React.createElement("tbody", null, 
	    row
	  )
	)

	const table = (
	  React.createElement(Table, {striped: true, bordered: true, hover: true}, 
	    thead, 
	    tbody
	  )
	);

	var DataTable = React.createClass({displayName: "DataTable",

	  getInitialState: () => {
	    return {};
	  },

	  render: () => {
	    return table
	  }

	})

	module.exports = DataTable;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/*!
	 * @name JavaScript/NodeJS Merge v1.2.0
	 * @author yeikos
	 * @repository https://github.com/yeikos/js.merge

	 * Copyright 2014 yeikos - MIT license
	 * https://raw.github.com/yeikos/js.merge/master/LICENSE
	 */

	;(function(isNode) {

		/**
		 * Merge one or more objects 
		 * @param bool? clone
		 * @param mixed,... arguments
		 * @return object
		 */

		var Public = function(clone) {

			return merge(clone === true, false, arguments);

		}, publicName = 'merge';

		/**
		 * Merge two or more objects recursively 
		 * @param bool? clone
		 * @param mixed,... arguments
		 * @return object
		 */

		Public.recursive = function(clone) {

			return merge(clone === true, true, arguments);

		};

		/**
		 * Clone the input removing any reference
		 * @param mixed input
		 * @return mixed
		 */

		Public.clone = function(input) {

			var output = input,
				type = typeOf(input),
				index, size;

			if (type === 'array') {

				output = [];
				size = input.length;

				for (index=0;index<size;++index)

					output[index] = Public.clone(input[index]);

			} else if (type === 'object') {

				output = {};

				for (index in input)

					output[index] = Public.clone(input[index]);

			}

			return output;

		};

		/**
		 * Merge two objects recursively
		 * @param mixed input
		 * @param mixed extend
		 * @return mixed
		 */

		function merge_recursive(base, extend) {

			if (typeOf(base) !== 'object')

				return extend;

			for (var key in extend) {

				if (typeOf(base[key]) === 'object' && typeOf(extend[key]) === 'object') {

					base[key] = merge_recursive(base[key], extend[key]);

				} else {

					base[key] = extend[key];

				}

			}

			return base;

		}

		/**
		 * Merge two or more objects
		 * @param bool clone
		 * @param bool recursive
		 * @param array argv
		 * @return object
		 */

		function merge(clone, recursive, argv) {

			var result = argv[0],
				size = argv.length;

			if (clone || typeOf(result) !== 'object')

				result = {};

			for (var index=0;index<size;++index) {

				var item = argv[index],

					type = typeOf(item);

				if (type !== 'object') continue;

				for (var key in item) {

					var sitem = clone ? Public.clone(item[key]) : item[key];

					if (recursive) {

						result[key] = merge_recursive(result[key], sitem);

					} else {

						result[key] = sitem;

					}

				}

			}

			return result;

		}

		/**
		 * Get type of variable
		 * @param mixed input
		 * @return string
		 *
		 * @see http://jsperf.com/typeofvar
		 */

		function typeOf(input) {

			return ({}).toString.call(input).slice(8, -1).toLowerCase();

		}

		if (isNode) {

			module.exports = Public;

		} else {

			window[publicName] = Public;

		}

	})(typeof module === 'object' && module && typeof module.exports === 'object' && module.exports);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)(module)))

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ }
/******/ ]);