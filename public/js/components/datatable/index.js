     var React = require('react'),
      ReactDOM = require('react-dom'),
         merge = require('merge'),
          Well = ReactBootstrap.Well,
         Input = ReactBootstrap.Input,
         Check = ReactBootstrap.Check,
         Table = ReactBootstrap.Table,
      MenuItem = ReactBootstrap.MenuItem,
     Glyphicon = ReactBootstrap.Glyphicon,
DropdownButton = ReactBootstrap.DropdownButton;


const header = (
  <tr>
    <td>1</td>
    <td>Mark</td>
    <td>Otto</td>
    <td>@mdo</td>
  </tr>
)

const row = (
  <tr>
    <th>#</th>
    <th>First Name</th>
    <th>Last Name</th>
    <th>Username</th>
  </tr>
)

const thead = (
  <thead>
    {header}
  </thead>
)

const tbody = (
  <tbody>
    {row}
  </tbody>
)

const table = (
  <Table striped bordered hover>
    {thead}
    {tbody}
  </Table>
);

var DataTable = React.createClass({

  getInitialState: () => {
    return {};
  },

  render: () => {
    return table
  }

})

module.exports = DataTable;
