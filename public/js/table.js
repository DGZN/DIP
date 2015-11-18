var React = require('react');
var ReactDOM = require('react-dom');

var BSTable = ReactBootstrap.Table;
var Well = ReactBootstrap.Well;

var Input = ReactBootstrap.Input;
var Check = ReactBootstrap.Check;

var Row = React.createClass({
  getInitialState: function() {
    return {
      viewed: false
    , checked:  this.props.checked
    , override: this.props.override
    };
  },
  handleClick: function(){
    this.setState({viewed: true});
  },
  handleCheck: function() {
    this.setState({ checked: !this.state.checked, override: true })
  },
  componentWillReceiveProps: function(nextProps) {
    if (nextProps.override)
      this.setState(nextProps)
  },
  render: function() {
    if (this.props.override)
      var isChecked = this.props.checked
    if (this.state.override)
      var isChecked = this.state.checked
    var checked = isChecked
      ? <Input type="checkbox" onChange={this.handleCheck} checked label="1" />
      : <Input type="checkbox" onChange={this.handleCheck} label="1" />
    return (
        <tr>
          <td className="rowID">
            {checked}
          </td>
          <td>{this.props.row.title}</td>
          <td>{this.props.row.description}</td>
          <td><a onClick={this.handleClick}>view {this.state.viewed ? '(viewed)' : ''}</a></td>
        </tr>
    );
  }
})

var Table = React.createClass({
  getInitialState: function() {
    return {
      sortField: ''
    , checked: false
    , override: false
    };
  }
, render: function() {
    var props = this.props;
    var state = this.state
    var rows = props.rows
      .filter(function(row){
        return row.title.toLowerCase().indexOf(props.filterText.toLowerCase()) > -1;
      })
      .sort(function(a, b){
        if (!state.sortField) return;
        var field = state.sortField;
        if(a[field] < b[field]) return -1;
        if(a[field] > b[field]) return 1;
        return 0;
      })
      .map(function(row, i){
        i++;
        return <Row key={row.title} rowID={i} row={row} checked={state.checked} sortField={state.sortField} override={state.override}  />;
      });
    return (
        <div className="row spacer">
          <div>
            <BSTable striped={true} bordered={true} hover={true}>
                <thead className="data-table-thead">
                  <tr>
                    <th><Input type="checkbox" onChange={this.handleCheck} label="1" /></th>
                    <th onClick={this.handleClick.bind(this, 'test')}>Title</th>
                    <th onClick={this.handleClick.bind(this, 'description')}>Description</th>
                    <th>Link</th>
                  </tr>
                </thead>
                <tbody>{rows}</tbody>
            </BSTable>
          </div>
        </div>
    );
  }
, handleClick: function(sortField) {
    this.setState({ sortField: sortField, override: false })
  }
, handleCheck: function() {
    this.setState({ checked: !this.state.checked, override: true })
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
    , sortField: ''
    };
  },

  handleUserInput: function(filterText) {
    this.setState({ filterText: filterText });
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
