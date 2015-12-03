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
        {this.rows(this.props)}
      </tbody>
    )
  },

  rows: function(props){
    return this.order(props).map(function(row, i){
      if (this.valid(row))
        return (
          <Row
            key={i}
            data={row}
            index={i + 1}
            columns={props.data.columns}
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
    if (!props.order.length) return props.data.rows;
    var rows = props.data.rows.sort(function(a, b){
      var sortProp = props.order.toLowerCase()
      return a[sortProp] > b[sortProp] ? 1 : -1;
    });
    return this.state.reverse ? rows.reverse() : rows;
  }

})

function lc(s){
  return s.toString().toLowerCase();
}

module.exports = Body;
