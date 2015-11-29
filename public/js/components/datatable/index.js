 var React = require('react'),
  ReactDOM = require('react-dom'),
     Table = ReactBootstrap.Table,
      Head = require('./head'),
      Body = require('./body');


var DataTable = React.createClass({

  getInitialState: function(){
    return {
      order: ''
    , resizing: false
    }
  },

  componentWillReceiveProps: function(props){
    this.setState({ order: '' })
  },

  render: function(){
    var columns = this.columns(this.props),
      rows = this.rows(this.props);
    return (
      <Table striped bordered hover>
        <Head
          click={this.handleClick}
          resize={this.resize}
          columns={columns}
          mouseMove={this.mouseMove} />
        <Body
          rows={rows}
          filter={this.props.filter}
          columns={columns}
          order={this.state.order} />
      </Table>
    )
  },

  handleClick: function(prop, e){
    if (!this.state.resizing)
      return this.setState({
        order: prop
      })
    var width = this.state._resize.scrollWidth + e.pageX - this.state._l
    this.setState({
      resizing: false
    }, () => {
      this.state._resizeCol.className = 'column-resize'
      this.state._resize.style.width = width + 'px'
    })
  },

  resize: function(target, e){
    if (this.state.resizing){
      var width = this.state._resize.scrollWidth + e.pageX - this.state._l
      this.setState({
        resizing: false
      }, () => {
        this.state._resizeCol.className = 'column-resize'
        this.state._resize.style.width = width + 'px'
      })
      document.getElementsByTagName('thead')[0].style.cursor = "pointer"
      return;
    }
    this.setState({
      _l: e.pageX
    , _resize: document.getElementById(target)
    , _resizeCol: e.target
    , resizing: true
    })
    e.target.style.left = e.PageX  - 15 + 'px'
    e.target.className = 'header-resize'
    document.getElementsByTagName('thead')[0].style.cursor = "col-resize"
  },

  mouseMove: function(e){
    if (this.state.resizing)
      this.state._resizeCol.style.left = e.pageX - 15 + 'px'
  },

  columns: function(props){
    if (typeof props.head.columns == "undefined")
      return {
        keys: Object.keys(props.rows[0])
      }
    var columns = props.head.columns
    columns.keys = Object.keys(props.rows[0])
    if (columns.alias) {
      for(var alias in columns.alias){
        var _alias = this._alias(alias, props.head)
        var match = inArray(_alias, props.rows[0])
        if (typeof match != "undefined" && typeof match != "object") {
          columns.keys.push(alias)
          if (lc(columns.keys).indexOf(columns.alias[alias]) > -1)
            columns.keys.splice(columns.keys.indexOf(columns.alias[alias]), 1)
        }
      }
    }
    if (columns.ignore) {
      columns.ignore.map((column) => {
        if (columns.keys.indexOf(column) > -1)
          columns.keys.splice(columns.keys.indexOf(column), 1)
      })
    }
    if (columns.order) {
      var order = columns.order
      columns.order.filter((key) => {
        if (columns.keys.indexOf(lc(key)) < 0) {
          order.splice(order.indexOf(key), 1)
        }
      })
      columns.keys.map((column) => {
        if (lc(order).indexOf(column) < 0) {
          order.push(column)
        }
      })
      columns.keys = columns.order
    }
    return columns;
  },

  rows: function(props){
    if (typeof props.head.columns == "undefined")
      return props.rows
    var columns = props.head.columns
    var _rows = props.rows.filter((row, i) => {
      if (columns.alias) {
        for(var alias in columns.alias){
          var _alias = this._alias(alias, props.head)
          var match = inArray(_alias, row)
          if (match !== 0) {
            row[alias] = match || ''
          }
        }
      }
      return row;
    })
    return _rows;
  },

  _alias: function(alias, props){
    if (this.props.option) {
      for(var prop in this.props.option)
        props.options.default[prop] = this.props.option[prop]
    }
    var match = inArray('options.default', props)
    if (match !== 0){
      var key = Object.keys(match)[0]
      var value = match[Object.keys(match)[0]]
      var _alias = props.columns.alias[alias],
      _alias = _alias.replace(key, value)
      return _alias;
    }
    return alias;
  }

})

function inArray(needle, haystack){
  if (haystack.hasOwnProperty(needle))
    return haystack[needle]
  var _needle = needle.split('.')
  if (_needle.length > 1) {
    var match = _needle.map((key, i) => {
      if (haystack.hasOwnProperty(key)){
        haystack = haystack[key]
        return true;
      }
      return false;
    })
    if (match)
      return haystack;
  }
  return 0;
}


function lc(s){
  return s.toString().toLowerCase();
}

function has(needle, haystack){
  console.log("Looking for ", needle, 'in', haystack);
}


module.exports = DataTable;
