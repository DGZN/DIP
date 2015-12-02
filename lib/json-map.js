
var JSONMap = function(data){
  if (!(this instanceof JSONMap))
    return new JSONMap(data)

  return parse(data);

  function parse(data){
    if (!data.hasOwnProperty('columns'))
      return {rows: rows(data), columns: columns(data)}
    data.columns = columns(data);
    data.rows    = rows(data);
    return data;
  }

  function columns(data){
    if (typeof data.columns == "undefined")
      return {keys: Object.keys(data[0])}
    var columns = data.columns
    columns.keys = Object.keys(data.rows[0])
    if (columns.alias) {
      for(var column in columns.alias){
        var _alias = alias(column, data)
        var match = inArray(_alias, data.rows[0])
        if (typeof match != "undefined" && typeof match != "object") {
          columns.keys.push(column)
          if (lc(columns.keys).indexOf(columns.alias[column]) > -1)
            columns.keys.splice(columns.keys.indexOf(columns.alias[column]), 1)
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

  function rows(data){
    if (typeof data.columns == "undefined")
      return data;
    var columns = data.columns
    var _rows = data.rows.filter((row, i) => {
      if (columns.alias) {
        for(var column in columns.alias){
          var _alias = alias(column, data)
          var match = inArray(_alias, row)
          if (match !== 0) {
            row[column] = match || ''
          }
        }
      }
      return row;
    })
    return _rows;
  }

  function alias(alias, props){
    if (props.option) {
      for(var prop in props.option){
        props.options.default[prop] = props.option[prop]
      }
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

module.exports = JSONMap;
