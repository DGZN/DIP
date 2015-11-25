var React = require('react'),
 ReactDOM = require('react-dom'),
   Header = require('./header');

var Head = React.createClass({

  getInitialState: () => {
    return {}
  },

  render: () => {
    return (
      <thead>
        <Header />
      </thead>
    )
  }

})

module.exports = Head;
