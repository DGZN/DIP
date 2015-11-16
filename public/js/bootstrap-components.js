
/*
 * Button Toolbar with Button Types
 */

var ButtonToolbar = ReactBootstrap.ButtonToolbar;
var Button = ReactBootstrap.Button;

const buttonsInstance = (
  <ButtonToolbar>
    {/* Standard button */}
    <Button>Default</Button>

    {/* Provides extra visual weight and identifies the primary action in a set of buttons */}
    <Button bsStyle="primary">Primary</Button>

    {/* Indicates a successful or positive action */}
    <Button bsStyle="success">Success</Button>

    {/* Contextual button for informational alert messages */}
    <Button bsStyle="info">Info</Button>

    {/* Indicates caution should be taken with this action */}
    <Button bsStyle="warning">Warning</Button>

    {/* Indicates a dangerous or potentially negative action */}
    <Button bsStyle="danger">Danger</Button>

    {/* Deemphasize a button by making it look like a link while maintaining button behavior */}
    <Button bsStyle="link">Link</Button>
  </ButtonToolbar>
);

/*
 * Navbar with Dropdown
 */

var Nav = ReactBootstrap.Nav;
var Navbar = ReactBootstrap.Navbar;
var NavItem = ReactBootstrap.NavItem;
var MenuItem = ReactBootstrap.MenuItem;
var NavBrand = ReactBootstrap.NavBrand;
var NavDropdown = ReactBootstrap.NavDropdown;

const navbarInstance = (
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
);

ReactDOM.render(navbarInstance, document.getElementById('nav'));
