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
	  'Oscars': 'http://api.opendev.oscars.org/v1/assets/films?!fields=last_watched,poster,guid,slug,resume'
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
	         merge = __webpack_require__(6),
	          Well = ReactBootstrap.Well,
	         Input = ReactBootstrap.Input,
	         Check = ReactBootstrap.Check,
	       BSTable = ReactBootstrap.Table,
	      MenuItem = ReactBootstrap.MenuItem,
	     Glyphicon = ReactBootstrap.Glyphicon,
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
	    var _cells = [];
	    var cells = this.props.columns.map(function(cell, i){
	      var regex = new RegExp( '(' + this.props.filterText + ')', 'gi' );
	      var html = this.props.row[cell];
	      if (this.props.alignment.hasOwnProperty(cell)) {
	        var alignment = this.props.alignment[cell]
	        var _alignment = 'align' + alignment.charAt(0).toUpperCase() + alignment.slice(1);
	      }
	      if (this.props.filterText.length >= 3)
	        html = html.toString().replace(regex, '<span class="highlighted">$1</span>');
	      _cells.push(React.createElement("td", {key: i, className: _alignment, dangerouslySetInnerHTML: { "__html": html}}))
	      if (this.props.guides)
	        _cells.push(React.createElement("td", {key: i+'-resize', className: "column-resize resizeCursor"}))
	    }.bind(this))
	    return (
	        React.createElement("tr", {className: this.props.hidden ? 'hidden' : ''}, 
	          React.createElement("td", {className: "rowID"}, 
	            checked
	          ), 
	          _cells
	        )
	    );
	  }
	})

	var ResizeRow = React.createClass({displayName: "ResizeRow",
	  render: function() {
	    var columns = this.props.columns.map(function(column, i) {
	      return (
	        React.createElement("td", {key: i + '.resize', className: "column-resize"})
	      )
	    })
	    columns.push(React.createElement("td", {key: (columns.length + 1) + '.resize', className: "column-resize"}))
	    return (
	        React.createElement("tr", {className: this.props.hidden ? 'hidden' : 'row-resize'}, 
	          columns
	        )
	    );
	  }
	})

	var _x, _lx, _w, resizing, isResizing;

	var Table = React.createClass({displayName: "Table",
	  getInitialState: function() {
	    return {
	      sortField: ''
	    , checked: false
	    , override: this.props.override || false
	    , columns: this.props.columns
	    , alignment: {}
	    , isResizing: false
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
	    var _columns = []
	    var _rows = []
	    var columns = state.columns
	      .map(function(column, i){
	        var selected = state.sortField == column
	          ? 'sort-selection-field'
	          : '';
	        var className = i+'-resize'
	        _columns.push(
	          React.createElement("th", {key: i, ref: "thead", className: selected, className, onClick: this.handleClick.bind(this, column)}, 
	            React.createElement("span", {className: "columnName"}, 
	              column.charAt(0).toUpperCase() + column.slice(1)
	            )
	          )
	        )
	        if (props.guides)
	          _columns.push(React.createElement("th", {key: i+'.resize', className: "column-resize", onClick: this.resizeCol.bind(this, i+'-resize')}))
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
	        _rows.push(React.createElement(Row, {
	          key: i, 
	          rowID: i, 
	          row: row, 
	          checked: this.state.checked, 
	          sortField: this.state.sortField, 
	          hidden: row.hidden ? true : false, 
	          filterText: this.state.filterText, 
	          alignment: this.state.alignment, 
	          columns: this.state.columns, 
	          guides: this.props.guides, 
	          override: this.state.override}))
	        if (this.props.guides)
	          _rows.push(React.createElement(ResizeRow, {columns: this.state.columns}))
	      }.bind(this));
	    if (state.columns.length < 1)
	      return (
	          React.createElement("div", {className: "row spacer"}, 
	            React.createElement("div", {className: "loading"}, "Loading ...")
	          )
	      )
	    return (
	        React.createElement("div", {className: "row spacer"}, 
	          React.createElement("div", null, 
	            React.createElement(BSTable, {className: "dataTable", striped: true, bordered: true, hover: true, responsive: true}, 
	                React.createElement("thead", {ref: "dataTable-head", className: "data-table-thead", onMouseMove: this.mouseMove}, 
	                  React.createElement("tr", null, 
	                    React.createElement("th", null, 
	                      React.createElement(Input, {type: "checkbox", standalone: true, onChange: this.handleCheck, label: " "})
	                    ), 
	                    _columns
	                  )
	                ), 
	                React.createElement("tbody", null, 
	                  _rows
	                )
	            )
	          )
	        )
	    );
	  },
	  handleClick: function(sortField, e) {
	    if (isResizing) {
	      this.refs['dataTable-head'].style['cursor'] = 'pointer';
	      isResizing = !isResizing, _x = null, _lx = null
	      return;
	    }
	    if (this.props.guides) {

	      var _alignment = e.target.parentElement.style['text-align'];

	      switch (_alignment) {
	        case 'left':
	           _alignment = 'center'
	          break;
	        case 'center':
	           _alignment = 'right'
	          break;
	        case 'right':
	           _alignment = 'left'
	          break;
	        default:
	        _alignment = 'center'
	      }

	      e.target.parentElement.style['text-align'] = _alignment

	      this.setState({
	        alignment: merge(this.state.alignment, {
	          [sortField]: _alignment
	        })
	      }, () => {
	        console.log("Alignment", this.state.alignment);
	      })
	      return;
	    }
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
	  },
	  resizeCol: function(selector) {
	    var col = document.getElementsByClassName(selector)[0]
	    resizing = col, isResizing = !isResizing, _x = null, _lx = null
	    this.refs['dataTable-head'].style['cursor'] = isResizing
	        ? 'col-resize'
	        : 'pointer';
	  },
	  mouseMove: function(e) {
	    if (!isResizing)
	      return false;
	    var col = resizing
	    var _currentWidth = col.scrollWidth
	    _x = _x || e.pageX
	    _lx = _lx || e.pageX
	    _w = _w || col.scrollWidth
	    if (e.pageX < _x) {
	      var width = _currentWidth - (_lx - e.pageX)
	    } else {
	      var width = _currentWidth + (e.pageX - _lx)
	    }
	    _lx = e.pageX
	    col.style['width'] = width + 'px'
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
	          ), 
	          React.createElement(Glyphicon, {glyph: "cog", className: "data-table-settings", onClick: this.props.toggleSettings})
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
	    , showSettings : true
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
	  toggleSettings: function() {
	    this.setState({
	      showSettings: !this.state.showSettings
	    })
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
	          toggleSettings: this.toggleSettings, 
	          handleSelect: this.handleSelect}), 
	        React.createElement(Table, {
	          ref: "dataTable", 
	          filterText: this.state.filterText, 
	          rows: this.state.rows, 
	          columns: this.state.columns, 
	          guides: this.state.showSettings, 
	          override: false})
	      )
	    );
	  },
	  componentWillMount: function() {
	    for (var route in this.props.routes) break;
	    this.setState({ selectedRoute: route }, function(){
	      this.getData(route, this.props.routes[route])
	    })
	  },
	  componentDidMount: function() {

	  }
	});

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