var React = require('react');
var ReactDOM = require('react-dom');

var BSTable = ReactBootstrap.Table;
var Well = ReactBootstrap.Well;

var Input = ReactBootstrap.Input;

var Row = React.createClass({
  getInitialState: function() {
    return {
        viewed: false
    };
  },
  handleClick: function(){
    this.setState({viewed: true});
  },
  render: function() {
    return (
        <tr>
          <td>{this.props.row.title}</td>
          <td><a  onClick={this.handleClick}>view {this.state.viewed ? '(viewed)' : ''}</a></td>
        </tr>
    );
  }
})

var Table = React.createClass({
  render: function() {
    var props = this.props;
    var rows = props.rows
      .filter(function(row){
        return row.title.toLowerCase().indexOf(props.filterText.toLowerCase()) > -1;
      })
      .map(function(row){
        return <Row key={row.title} row={row} />;
      });

    return (
        <div className="row spacer">
          <div>
            <BSTable striped={true} bordered={true} hover={true}>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Link</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </BSTable>
          </div>
        </div>
    );
  }
});

var SearchBar = React.createClass({
  handleChange: function() {
      this.props.onUserInput(
          this.refs.filterTextInput.value
      );
  },
  render: function() {
    return (
      <div className="row table-search">
        <form className="form-grop" onSubmit={this.handleSubmit}>
            <input ref="filterTextInput" type="search" className="form-control input-lg" value={this.props.filterText} onChange={this.handleChange} placeholder="Search for packages" aria-describedby="sizing-addon1"></input>
        </form>
      </div>
    );
  }
});

var DataTable = React.createClass({
  getInitialState: function() {
    return {
        filterText: ''
    };
  },

  handleUserInput: function(filterText) {
    this.setState({
        filterText: filterText
    });
  },

  render: function() {
    return (
        <Well className="data-table-well">
          <SearchBar onUserInput={this.handleUserInput} filterText={this.state.filterText} />
          <Table filterText={this.state.filterText} rows={this.props.rows} />
        </Well>
    );
  }
});

module.exports = DataTable;
