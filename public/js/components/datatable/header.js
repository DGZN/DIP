var React = require('react');

var Header = React.createClass({
 render: function(){
   return this.getHeaderRow(this.props.columns);
 },
 getHeaderRow: function(props){
   var columns = [<td key={'td.hash'}>#</td>];
   for(var prop in props){
     var column = props[prop].charAt(0).toUpperCase() + props[prop].slice(1)
     columns.push(<td key={'td.' + prop} onClick={this.props.click}>{column}</td>)
   }
   return <tr>{columns}</tr>;
 }
})

module.exports = Header;
