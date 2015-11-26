var React = require('react');

var Header = React.createClass({
 render: function(){
   return this.getHeaderRow(this.props.columns);
 },
 getHeaderRow: function(props){
   var columns = [<td key={'td.hash'}>#</td>];
   for(var prop in props){
     var column = props[prop].charAt(0).toUpperCase() + props[prop].slice(1)
     columns.push(<td key={'td.' + prop} id={'td.' + prop} onClick={this.props.click.bind(null, props[prop])}>{column}</td>)
     columns.push(<td key={'td.resize.' + prop} className="column-resize" onClick={this.props.resize.bind(null, 'td.' + prop)}></td>)
   }
   //columns.push(<td key="header-resize-column" className="header-resize" onClick={this.props.resize}></td>)
   return <tr ref="headerRow" onMouseMove={this.props.mouseMove}>{columns}</tr>;
 }
})

module.exports = Header;
