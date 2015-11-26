var React = require('react');

var Row = React.createClass({

  render: function(){
    return this.getRow(this.props);
  },

  getRow: function(props){
    var columns = [<td key={'td.index.'+Date()}>{props.index}</td>];
    for(var prop in props.data){
      columns.push(<td key={props.index + '.' + prop}>{props.data[prop]}</td>)
      columns.push(<td key={props.index + '.td.resize.' + prop} className="column-resize"></td>)
    }
    return <tr>{columns}</tr>;
  }
})

module.exports = Row;
