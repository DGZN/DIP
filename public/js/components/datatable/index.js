 var React = require('react'),
  ReactDOM = require('react-dom'),
     Table = ReactBootstrap.Table,
      Head = require('./head'),
      Body = require('./body');


var DataTable = React.createClass({

  getInitialState: function(){
    return {
      order: ''
    , resizing: false
    }
  },

  render: function(){
    return (
      <Table striped bordered hover>
        <Head
          ref="head"
          click={this.handleClick}
          resize={this.resize}
          mouseMove={this.mouseMove}
          columns={Object.keys(this.props.rows[0])} />
        <Body
          rows={this.props.rows}
          filter={this.props.filter}
          order={this.state.order} />
      </Table>
    )
  },

  handleClick: function(prop, e){
    if (!this.state.resizing)
      return this.setState({
        order: prop
      })
    var width = this.state._resize.scrollWidth + e.pageX - this.state._l
    this.setState({
      resizing: false
    }, () => {
      this.state._resizeCol.className = 'column-resize'
      this.state._resize.style.width = width + 'px'
    })
  },

  resize: function(target, e){
    this.setState({
      _l: e.pageX
    , _resize: document.getElementById(target)
    , _resizeCol: e.target
    , resizing: !this.state.resizing
    })
    e.target.className = 'header-resize'
  },

  mouseMove: function(e){
    if (this.state.resizing)
      this.state._resizeCol.style.left = e.pageX - 2.5 + 'px'
  }

})

module.exports = DataTable;
