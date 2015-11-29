var React = require('react');

var Header = React.createClass({
 render: function(){
   return this.getHeaderRow(this.props.columns);
 },

 getHeaderRow: function(columns){
   var _columns = [<td key={'td.hash'} id="td.hash">#</td>,
    <td
      key={'td.resize.hash'}
      className="column-resize"
      onClick={this.props.resize.bind(null, 'td.hash')}>
   </td>];
   for(var key in columns.keys){
     var column = columns.keys[key].charAt(0).toUpperCase() + columns.keys[key].slice(1)
     _columns.push(<td key={'td.' + key} id={'td.' + key} onClick={this.props.click.bind(null, columns.keys[key])}>{column}</td>)
     _columns.push(<td key={'td.resize.' + key} className="column-resize" onClick={this.props.resize.bind(null, 'td.' + key)}></td>)
   }
   return <tr ref="headerRow" onMouseMove={this.props.mouseMove}>{_columns}</tr>;
 }
})

module.exports = Header;
