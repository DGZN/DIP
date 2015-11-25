var React = require('react'),
 ReactDOM = require('react-dom'),
      Row = require('./row');


var Body = React.createClass({
  render: () => {
    return (
      <tbody>
        <Row />
      </tbody>
    )
  }
})

module.exports = Body;
