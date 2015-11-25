 var React = require('react'),
  ReactDOM = require('react-dom'),
     Table = ReactBootstrap.Table,
      Head = require('./head'),
      Body = require('./body');


var DataTable = React.createClass({

  getInitialState: function(){
    return {

    };
  },

  render: function(){
    return (
      <Table striped bordered hover>
        <Head />
        <Body rows={this.props.rows} />
      </Table>
    )
  }

})

module.exports = DataTable;
