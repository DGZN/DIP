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
    var self = this;
    if (this.props.override)
      var isChecked = this.props.checked
    if (this.state.override)
      var isChecked = this.state.checked
    var checked = isChecked
      ? <Input type="checkbox" onChange={this.handleCheck} checked label=" " />
      : <Input type="checkbox" onChange={this.handleCheck} label=" " />
    var cells = self.props.columns.map(function(cell, i){
      return (
        <td key={i}>{self.props.row[cell]}</td>
      )
    })
    return (
        <tr className={this.props.hidden ? 'hidden' : ''}>
          <td className="rowID">
            {checked}
          </td>
          {cells}
        </tr>
    );
  }
})

var Table = React.createClass({
  getInitialState: function() {
    return {
      sortField: ''
    , checked: false
    , override: this.props.override || false
    , columns: this.props.columns
    };
  },
  componentWillReceiveProps: function(props) {
    this.setState(props)
  },
  render: function() {
    var props = this.props;
    var state = this.state
    var self = this
    var negative = -1
    var positive = 1;
    if (state.reverse) {
      var negative = 1;
      var positive = -1;
    }
    var columns = state.columns
      .map(function(column, i){
        var selected = state.sortField == column
          ? 'sort-selection-field'
          : '';
        return (
          <th key={i} className={selected} onClick={self.handleClick.bind(self, column)}>
            {column.toUpperCase()}
          </th>
        )
      })
    var rows = props.rows
      .filter(function(row){
        row.hidden = true;
        props.columns.forEach(function(field, i){
          if (row.hasOwnProperty(field) && row[field].length > 0) {
            if (row[field].toLowerCase().indexOf(props.filterText.toLowerCase()) > -1) {
              row.hidden = false
            }
          }
        })
        return true;
      })
      .sort(function(a, b){
        if (!state.sortField) return;
        var field = state.sortField;
        if (a[field].length < 1 || b[field].length < 1) {
          var aVal = (a[field] || ' ')
          var bVal = (b[field] || ' ')
          if(aVal < bVal) return negative;
          if(aVal > bVal) return positive;
        }
        if (isNaN(a[field])) {
          if(a[field] < b[field]) return negative;
          if(a[field] > b[field]) return positive;
        } else {
          if(parseInt(a[field]) < parseInt(b[field])) return negative;
          if(parseInt(a[field]) > parseInt(b[field])) return positive;
        }
      })
      .map(function(row, i){
        i++;
        return (
          <Row
            key={i}
            rowID={i} row={row}
            checked={state.checked}
            sortField={state.sortField}
            hidden={row.hidden ? true : false}
            columns={state.columns}
            override={state.override}  />
        )
      });
    return (
        <div className="row spacer">
          <div>
            <BSTable striped={true} bordered={true} hover={true}>
                <thead className="data-table-thead">
                  <tr>
                    <th>
                    { state.columns.length < 1
                      ? (<h3 className="waiting"> waiting for content ... </h3>)
                      : <Input type="checkbox" standalone onChange={this.handleCheck} label=" " />
                    }
                    </th>
                    {columns}
                  </tr>
                </thead>
                <tbody>
                  {rows}
                </tbody>
            </BSTable>
          </div>
        </div>
    );
  },
  handleClick: function(sortField) {
    if (this.state.sortField == sortField && !this.state.reverse) {
      return this.setState({ sortField: sortField, override: false, reverse: true })
    } else {
      return this.setState({ sortField: sortField, override: false, reverse: false })
    }
  },
  handleCheck: function() {
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
    var columns = Object.keys(this.props.rows[0])
    return (
      <Well className="data-table-well">
        <SearchBar onUserInput={this.handleUserInput} filterText={this.state.filterText} />
        <Table
          ref="dataTable"
          filterText={this.state.filterText}
          rows={this.props.rows}
          columns={this.props.columns}
          override={false} />
      </Well>
    );
  }
});

module.exports = DataTable;
