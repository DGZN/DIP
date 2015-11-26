var React = require('react'),
      Row = require('./row');

var Body = React.createClass({

  render: function(){
    return (
      <tbody>
        {this._rows(this.props)}
      </tbody>
    )
  },

  _rows: function(props){
    return this.order(props).map(function(row, i){
      if (this.valid(row))
        return (
          <Row key={i} index={i + 1} data={row} />
        )
    }.bind(this))
  },

  valid: function(row){
    if (!this.props.filter)
      return true;
    for (var prop in row)
      if (row[prop].indexOf(this.props.filter) > -1)
        return true;
    return false;
  },

  order: function(props){
    if (!props.order)
      return props.rows;
    var _rows = props.rows.sort(function(a, b){
      var sortProp = props.order.toLowerCase()
      return a[sortProp] > b[sortProp]
    })
    return _rows;
  }

})

module.exports = Body;
