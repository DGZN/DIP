
var React = require('react');
var ReactDOM = require('react-dom');

var Button = ReactBootstrap.Button;
var Glyphicon = ReactBootstrap.Glyphicon;

var Well = ReactBootstrap.Well;
var Panel = ReactBootstrap.Panel;

var ListGroup = ReactBootstrap.ListGroup;
var ListGroupItem = ReactBootstrap.ListGroupItem;

var SlideMenu = React.createClass({
  toggleMenu: function(open) {
    var menu = document.getElementById("menu");
    menu.style['-webkit-transition'] = "right .5s ease-in-out";
    menu.style['-moz-transition'] = "right .5s ease-in-out";
    menu.style['-o-transition'] = "right .5s ease-in-out";
    menu.style['transition'] = "right .5s ease-in-out";
    menu.style['right'] = open ? '0px' : '-24.2%';
  }
, clicked: function() {
  console.log("I was clicked")
  console.log($('.table-body').eq(0))
  console.log(this.refs.table.props.children[1].props.children)
  }
, getInitialState: function() {
    return {
      isMenuOpen: false
    };
  }
, render: function() {
    return (
      <div id="menu" move="0px" onMouseOver={this.toggleMenu.bind(this, true)} >
        <Glyphicon className="pull-right closeMenu text-danger" glyph="remove" onClick={this.toggleMenu.bind(this, false)} />
        <h3 className="menuTitle">{ this.props.title }</h3>
        <Well bsSize="small" className="deliveries">
          <ListGroup>
            <ListGroupItem href="#link1" bsSize="small">Link 1</ListGroupItem>
            <ListGroupItem href="#link1" bsSize="small" bsStyle="danger">ERROR</ListGroupItem>
            <ListGroupItem href="#link1" bsSize="small">Link 1</ListGroupItem>
            <ListGroupItem href="#link1" bsSize="small" bsStyle="success">Link 1</ListGroupItem>
            <ListGroupItem href="#link1" bsSize="small">Link 1</ListGroupItem>
            <ListGroupItem href="#link1" bsSize="small" bsStyle="success">Link 1</ListGroupItem>
            <ListGroupItem href="#link1" bsSize="small">Link 1</ListGroupItem>
            <ListGroupItem href="#link1" bsSize="small" bsStyle="success">Link 1</ListGroupItem>
            <ListGroupItem href="#link1" bsSize="small">Link 1</ListGroupItem>
            <ListGroupItem href="#link1" bsSize="small">Link 1</ListGroupItem>
          </ListGroup>
        </Well>
      </div>
    );
  }
});

module.exports = SlideMenu
