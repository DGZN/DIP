var React = require('react'),
 ReactDOM = require('react-dom');

var Row = React.createClass({

  getInitialState: () => {
    return {}
  },

  render: () => {
    return (
      <tr>
        <td>1</td>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
      </tr>
    )
  }

})

module.exports = Row;
