var React = require('react'),
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
