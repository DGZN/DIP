var React = require('react'),
   Header = require('./header');

var Head = React.createClass({

  getInitialState: function(){
    return {}
  },

  render: function(){
    return (
      <thead>
        <Header columns={this.props.columns} click={this.props.click} />
      </thead>
    )
  }
})

module.exports = Head;
