
var Consume = function(route, options, cb){
  if (!(this instanceof Consume))
    return new Consume(route, options, cb)
  var options = options      || {}
    , route   = parse(route, cb) || {};

  function parse(route){
    if (!route.hasOwnProperty('endpoint'))
      return {
        columns: columns(route, route)
      , rows: rows(route, route)
      }
    return fetch(route, cb);
  }

  function fetch(route, cb){
    $.get(route.endpoint).done(function(xhr){
      route.columns = columns(route, xhr)
    , route.rows = rows(route, xhr);
      cb(route)
    })
  }

  function columns(route, data){
    if (typeof route.columns == "undefined")
      return {
        keys: Object.keys(data[0])
      }
    var columns = route.columns
    columns.keys = Object.keys(data[0])
    if (columns.alias) {
      for(var alias in columns.alias){
        var _alias = this._alias(alias, route)
        var match = inArray(_alias, data[0])
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
  }

  function rows(route, data){
    if (typeof route.columns == "undefined")
      return data
    var columns = route.columns
    var _rows = data.filter((row, i) => {
      if (columns.ignore) {
        for (var key in row) {
          if (columns.ignore.indexOf(key) > -1)
            delete row[key]
        }
      }
      if (columns.alias) {
        for(var alias in columns.alias){
          var _alias = this._alias(alias, route)
          var match = inArray(_alias, row)
          if (match !== 0) {
            row[alias] = match || ''
          }
        }
      }
      return row;
    })
    return _rows;
  }

  function alias(alias, props){
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

}

module.exports = Consume;
