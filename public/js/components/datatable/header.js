var React = require('react'),
 ReactDOM = require('react-dom');


var Header = React.createClass({
 render: () => {
   return (
     <tr>
       <th>#</th>
       <th>First Name</th>
       <th>Last Name</th>
       <th>Username</th>
     </tr>
   )
 }
})

module.exports = Header;
