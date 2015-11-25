var React = require('react'),
      Row = require('./row');


var Body = React.createClass({

  getInitialState: function(){
    console.log("Body Initial State", this.props)
    return {

    }
  },

  render: function(){
    console.log("Rendering tbody with rows", this.props.rows)
    return (
      <tbody>
        <Row />
      </tbody>
    )
  }
})

module.exports = Body;
