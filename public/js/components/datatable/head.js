var React = require('react'),
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
