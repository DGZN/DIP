 var React = require('react'),
  ReactDOM = require('react-dom'),
     Table = ReactBootstrap.Table,
      Head = require('./head'),
      Body = require('./body');


var DataTable = React.createClass({

  getInitialState: function(){
    return {
      order: ''
    }
  },

  render: function(){
    return (
      <Table striped bordered hover>
        <Head
          click={this.handleClick}
          columns={Object.keys(this.props.rows[0])} />
        <Body rows={this.props.rows} filter="" order={this.state.order} />
      </Table>
    )
  },

  handleClick: function(e){
    this.setState({
      order: e.target.innerHTML
    })
  }

})

module.exports = DataTable;
