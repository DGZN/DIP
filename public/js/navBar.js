/*
 * Navbar with Dropdown
 */

var Nav = ReactBootstrap.Nav;
var Navbar = ReactBootstrap.Navbar;
var NavItem = ReactBootstrap.NavItem;
var MenuItem = ReactBootstrap.MenuItem;
var NavBrand = ReactBootstrap.NavBrand;
var NavDropdown = ReactBootstrap.NavDropdown;

var NavBar = React.createClass({
  render: function() {
    return (
      <div id="nav" >
        <Navbar inverse toggleNavKey={0} fluid={true} >
          <NavBrand ><a href="#">DIP Dashboard </a></NavBrand>
          <Nav right eventKey={0}> {/* This is the eventKey referenced */}
            <NavDropdown eventKey={3} title="Account" id="collapsible-navbar-dropdown">
              <MenuItem eventKey="1">Action</MenuItem>
              <MenuItem eventKey="2">Another action</MenuItem>
              <MenuItem eventKey="3">Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey="4">Logout</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar>
      </div>
    );
  }
});

module.exports = NavBar;
