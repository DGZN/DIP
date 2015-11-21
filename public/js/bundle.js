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

	var routes = {
	  'Oscars': 'http://api.opendev.oscars.org/v1/assets/films'
	, 'Melody': 'http://localhost:8000/v1/assets/movies'
	, 'Seasons':  'http://localhost:8000/v1/assets/series/seasons/episodes'
	};

	var App = React.createClass({displayName: "App",
	  getInitialState: function() {
	    return {
	      isMenuOpen: false
	    , rows: [{}]
	    , columns: []
	    };
	  },
	  render: function() {
	    return (
	      React.createElement("div", null, 
	        React.createElement(NavBar, null), 
	        React.createElement("div", {className: "container-fluid"}, 
	          React.createElement(SlideMenu, null), 
	          React.createElement("div", {id: "left", className: "col-md-12"}, 
	            React.createElement(DataTable, {ref: "datatable", rows: this.state.rows, columns: this.state.columns, routes: routes})
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
	          Well = ReactBootstrap.Well,
	         Input = ReactBootstrap.Input,
	         Check = ReactBootstrap.Check,
	       BSTable = ReactBootstrap.Table,
	      MenuItem = ReactBootstrap.MenuItem,
	DropdownButton = ReactBootstrap.DropdownButton;

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
	    if (nextProps.override)
	      this.setState(nextProps)
	  },
	  render: function() {
	    if (this.props.override || this.state.override)
	      var isChecked = this.props.checked
	    var checked = isChecked
	      ? React.createElement(Input, {type: "checkbox", onChange: this.handleCheck, checked: true, label: " "})
	      : React.createElement(Input, {type: "checkbox", onChange: this.handleCheck, label: " "})
	    var cells = this.props.columns.map(function(cell, i){
	      var regex = new RegExp( '(' + this.props.filterText + ')', 'gi' );
	      var html = this.props.row[cell];
	      if (this.props.filterText.length >= 3)
	        html = html.toString().replace(regex, '<span class="highlighted">$1</span>');
	      return React.createElement("td", {key: i, dangerouslySetInnerHTML: { "__html": html}});
	    }.bind(this))
	    return (
	        React.createElement("tr", {className: this.props.hidden ? 'hidden' : ''}, 
	          React.createElement("td", {className: "rowID"}, 
	            checked
	          ), 
	          cells
	        )
	    );
	  }
	})

	var Table = React.createClass({displayName: "Table",
	  getInitialState: function() {
	    return {
	      sortField: ''
	    , checked: false
	    , override: this.props.override || false
	    , columns: this.props.columns
	    };
	  },
	  componentWillReceiveProps: function(props) {
	    this.setState(props)
	  },
	  render: function() {
	    var props = this.props;
	    var state = this.state
	    var negative = -1
	    var positive = 1;
	    if (state.reverse) {
	      var negative = 1;
	      var positive = -1;
	    }
	    var columns = state.columns
	      .map(function(column, i){
	        var selected = state.sortField == column
	          ? 'sort-selection-field'
	          : '';
	        return (
	          React.createElement("th", {key: i, className: selected, onClick: this.handleClick.bind(this, column)}, 
	            column.charAt(0).toUpperCase() + column.slice(1)
	          )
	        )
	      }.bind(this))
	    var rows = props.rows
	      .filter(function(row){
	        row.hidden = true;
	        props.columns.forEach(function(field, i){
	          if (row.hasOwnProperty(field) && row[field].length > 0) {
	            if (row[field].toLowerCase().indexOf(props.filterText.toLowerCase()) > -1) {
	              row.hidden = false
	            }
	          }
	        })
	        return true;
	      })
	      .sort(function(a, b){
	        if (!state.sortField) return;
	        var field = state.sortField;
	        if (a[field].length < 1 || b[field].length < 1) {
	          var aVal = (a[field] || ' ')
	          var bVal = (b[field] || ' ')
	          if(aVal < bVal) return positive;
	          if(aVal > bVal) return negative;
	        }
	        if (isNaN(a[field])) {
	          if(a[field] < b[field]) return negative;
	          if(a[field] > b[field]) return positive;
	        } else {
	          if(parseInt(a[field]) < parseInt(b[field])) return negative;
	          if(parseInt(a[field]) > parseInt(b[field])) return positive;
	        }
	      })
	      .map(function(row, i){
	        i++;
	        return (
	          React.createElement(Row, {
	            key: i, 
	            rowID: i, 
	            row: row, 
	            checked: state.checked, 
	            sortField: state.sortField, 
	            hidden: row.hidden ? true : false, 
	            filterText: state.filterText, 
	            columns: state.columns, 
	            override: state.override})
	        )
	      });
	    if (state.columns.length < 1) {
	      return (
	          React.createElement("div", {className: "row spacer"}, 
	            React.createElement("div", {className: "loading"}, "Loading ...")
	          )
	      )
	    }
	    return (
	        React.createElement("div", {className: "row spacer"}, 
	          React.createElement("div", null, 
	            React.createElement(BSTable, {className: "dataTable", striped: true, bordered: true, hover: true}, 
	                React.createElement("thead", {className: "data-table-thead"}, 
	                  React.createElement("tr", null, 
	                    React.createElement("th", null, 
	                      React.createElement(Input, {type: "checkbox", standalone: true, onChange: this.handleCheck, label: " "})
	                    ), 
	                    columns
	                  )
	                ), 
	                React.createElement("tbody", null, 
	                  rows
	                )
	            )
	          )
	        )
	    );
	  },
	  handleClick: function(sortField) {
	    if (this.state.sortField == sortField && !this.state.reverse) {
	      return this.setState({ sortField: sortField, override: false, reverse: true })
	    } else {
	      return this.setState({ sortField: sortField, override: false, reverse: false })
	    }
	  },
	  handleCheck: function() {
	    this.setState({ checked: !this.state.checked, override: true })
	  },
	  highlightMatches: function(row, keyword) {
	    this.state.columns.forEach(function(column, i) {
	      row[column].toString().replace(['<span class="highlighted">','</span>',['','']])
	      row[column] = row[column].toString().replace(keyword, '<span class="highlighted">' + keyword + '</span>')
	    })
	    return row;
	  }
	});

	var SearchBar = React.createClass({displayName: "SearchBar",
	  getInitialState: function() {
	    return {
	      route: ''
	    }
	  },
	  handleChange: function() {
	    this.props.onUserInput(
	        this.refs.filterTextInput.value
	    );
	  },
	  render: function() {
	    var routes = Object.keys(this.props.routes).map((route, i) => {
	       return (React.createElement(MenuItem, {eventKey: i, key: i}, route))
	    });
	    return (
	      React.createElement("div", {className: "row table-search"}, 
	        React.createElement("form", {className: "form-grop", onSubmit: this.handleSubmit}, 
	          React.createElement("div", {className: "data-table-search-panel"}, 
	            React.createElement("input", {ref: "filterTextInput", type: "search", autoFocus: true, className: "data-table-search-input form-control input-lg", value: this.props.filterText, onChange: this.handleChange, placeholder: "Search...", "aria-describedby": "sizing-addon1"}), 
	            React.createElement(DropdownButton, {title: this.props.selectedRoute || 'Routes', id: "bg-nested-dropdown", bsSize: "lg", className: "data-table-filter-dropdown", onSelect: this.props.handleSelect}, 
	              routes
	            )
	          )
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
	    , rows: this.props.rows
	    , columns: this.props.columns
	    , routes: this.props.routes
	    };
	  },
	  getData: function(name, route) {
	    this.setState({ rows: [{}], columns: [] }, () => {
	      $.get(route, function(result) {
	        if (this.isMounted()) {
	          this.setState({ rows: result, columns: Object.keys(result[0]), selectedRoute: name });
	        }
	      }.bind(this));
	    });
	  },
	  handleUserInput: function(filterText) {
	    this.setState({ filterText: filterText });
	  },
	  handleSelect: function(e) {
	    this.getData(e.target.text, this.props.routes[e.target.text])
	  },
	  render: function() {
	    var columns = Object.keys(this.props.rows[0])
	    return (
	      React.createElement(Well, {className: "data-table-well"}, 
	        React.createElement(SearchBar, {
	          onUserInput: this.handleUserInput, 
	          filterText: this.state.filterText, 
	          routes: this.state.routes, 
	          selectedRoute: this.state.selectedRoute || '', 
	          handleSelect: this.handleSelect}), 
	        React.createElement(Table, {
	          ref: "dataTable", 
	          filterText: this.state.filterText, 
	          rows: this.state.rows, 
	          columns: this.state.columns, 
	          override: false})
	      )
	    );
	  },
	  componentWillMount: function() {
	    for (var route in this.props.routes) break;
	    this.setState({ selectedRoute: route }, function(){
	      this.getData(route, this.props.routes[route])
	    })
	  }
	});

	module.exports = DataTable;


/***/ }
/******/ ]);