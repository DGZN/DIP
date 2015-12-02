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

  componentWillReceiveProps: function(props){
    this.setState({ order: '' })
  },

  render: function(){
      return (
        <Table striped bordered hover>
          <Head
            resize={this.resize}
            columns={this.props.data.columns}
            click={this.handleClick}
            mouseMove={this.mouseMove} />
          <Body
            data={this.props.data}
            order={this.state.order}
            filter={this.props.filter} />
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
    if (this.state.resizing){
      var width = this.state._resize.scrollWidth + e.pageX - this.state._l
      this.setState({
        resizing: false
      }, () => {
        this.state._resizeCol.className = 'column-resize'
        this.state._resize.style.width = width + 'px'
      })
      document.getElementsByTagName('thead')[0].style.cursor = "pointer"
      return;
    }
    this.setState({
      _l: e.pageX
    , _resize: document.getElementById(target)
    , _resizeCol: e.target
    , resizing: true
    })
    e.target.style.left = e.PageX  - 15 + 'px'
    e.target.className = 'header-resize'
    document.getElementsByTagName('thead')[0].style.cursor = "col-resize"
  },

  mouseMove: function(e){
    if (this.state.resizing)
      this.state._resizeCol.style.left = e.pageX - 15 + 'px'
  },

})

module.exports = DataTable;
