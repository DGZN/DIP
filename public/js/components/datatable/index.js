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
            click={this.handleClick}
            mouseMove={this.mouseMove}
            columns={this.props.data.columns} />
          <Body
            data={this.props.data}
            filter={this.props.filter}
            order={!this.state.resizing ? this.state.order : ''} />
        </Table>
      )
  },

  handleClick: function(prop, e){
    if (!this.state.resizing)
      return this.setState({order: prop})
    this._setClassName(this.state._resizeCol, 'column-resize')
    this._setWidth(this.state._resize, e.pageX)
  },

  resize: function(target, e){
    var pageX = e.pageX;
    if (this.state.resizing){
      this.setState({resizing: false}, () => {
        this._setClassName(this.state._resizeCol, 'column-resize')
        this._setWidth(this.state._resize, pageX)
        this._setCursor('thead', 'pointer')
      })
      return;
    }
    this.setState({
      _left: pageX
    , resizing: true
    , _resizeCol: e.target
    , _resize: this._byID(target)
    })
    this._setLeft(e.target, pageX  - 15 )
    this._setClassName(e.target, 'header-resize')
    this._setCursor('thead', 'col-resize')
  },

  mouseMove: function(e){
    if (this.state.resizing)
      this.state._resizeCol.style.left = e.pageX - 15 + 'px'
  },

  _setWidth: function(item, pageX){
    var width = this.state._resize.scrollWidth + pageX - this.state._left
    item.style.width = width + 'px'
  },

  _setLeft: function(item, left){
    item.style.left = left + 'px'
  },

  _setClassName: function(item, className){
    item.className = className
  },

  _byID: function(id){
    return document.getElementById(id);
  },

  _setCursor: function(selector, cursor){
    document.getElementsByTagName(selector)[0].style.cursor = cursor;
  }

})

module.exports = DataTable;
