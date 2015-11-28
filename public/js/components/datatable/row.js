var React = require('react');

var Row = React.createClass({

  render: function(){
    return this.getRow(this.props);
  },

  getRow: function(props){
    var columns = [<td key={'td.index.'+Date()}>{props.index}</td>,
     <td
       key={'td.resize.index.'+Date()}
       className="column-resize no-hover" >
    </td>];
    props.columns.keys.forEach(function(column){
      var _column = props.data[column.toLowerCase()]
      if (props.highlight.length >= 3){
        var regex = new RegExp( '(' + props.highlight + ')', 'gi' );
        _column = _column.toString().replace(regex, '<span class="highlighted">$1</span>');
      }
      columns.push(<td key={props.index + '.' + column} dangerouslySetInnerHTML={{ "__html": _column }} ></td>)
      columns.push(<td key={props.index + '.td.resize.' + column} className="column-resize no-hover"></td>)
    })
    return <tr>{columns}</tr>;
  }
})

module.exports = Row;
