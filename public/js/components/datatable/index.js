 var React = require('react'),
  ReactDOM = require('react-dom'),
     Table = ReactBootstrap.Table,
      Head = require('./head'),
      Body = require('./body');

var DataTable = React.createClass({

  getInitialState: () => {
    return {};
  },

  render: () => {
    return (
      <Table striped bordered hover>
        <Head />
        <Body />
      </Table>
    )
  }

})

module.exports = DataTable;
