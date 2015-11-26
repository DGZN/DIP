var React = require('react'),
   Header = require('./header');

var Head = React.createClass({

  getInitialState: function(){
    return {}
  },

  render: function(){
    return (
      <thead style={{ cursor: 'pointer' }}>
        <Header ref="header" columns={this.props.columns} click={this.props.click} resize={this.props.resize} mouseMove={this.props.mouseMove} />
      </thead>
    )
  }
})

module.exports = Head;
