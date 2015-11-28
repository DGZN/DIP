var React = require('react'),
      Row = require('./row');

var Body = React.createClass({

  getInitialState: function(){
    return {
      reverse: false
    }
  },

  componentWillReceiveProps: function(props){
    var state = { order: props.order }
    if (props.order == this.props.order)
      state.reverse = !this.state.reverse

    this.setState(state)
  },

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
          <Row
            key={i}
            index={i + 1}
            columns={props.columns}
            data={row}
            highlight={this.props.filter} />
        )
    }.bind(this))
  },

  valid: function(row){
    if (!this.props.filter)
      return true;
    for (var prop in row)
      if (lc(row[prop]).indexOf(lc(this.props.filter)) > -1)
        return true;
    return false;
  },

  order: function(props){
    if (!props.order) return props.rows;
    var rows = props.rows.sort(function(a, b){
      var sortProp = props.order.toLowerCase()
      if (typeof a[sortProp] == "undefined") {
        console.log("Undefined", a);
        return -1
      }
      return a[sortProp] > b[sortProp] ? 1 : -1;
    });
    return this.state.reverse ? rows.reverse() : rows;
  }

})

function lc(s){
  return s.toString().toLowerCase();
}

module.exports = Body;
