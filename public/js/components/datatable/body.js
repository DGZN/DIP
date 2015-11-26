var React = require('react'),
      Row = require('./row');

var Body = React.createClass({

  getInitialState: function(){
    return {
      reverse: false
    }
  },

  componentWillReceiveProps: function(props){

    if (props.order == this.props.order)
      this.setState({
        reverse: !this.state.reverse
      })

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
          <Row key={i} index={i + 1} data={row} />
        )
    }.bind(this))
  },

  valid: function(row){
    if (!this.props.filter)
      return true;
    for (var prop in row)
      if (row[prop].toString().indexOf(this.props.filter) > -1)
        return true;
    return false;
  },

  order: function(props){
    if (!props.order) return props.rows;
    var rows = props.rows.sort(function(a, b){
      var sortProp = props.order.toLowerCase()
      return a[sortProp] > b[sortProp] ? 1 : -1;
    });
    return this.state.reverse ? rows.reverse() : rows;
  }

})

module.exports = Body;
