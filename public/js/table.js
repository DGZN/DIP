     var React = require('react'),
      ReactDOM = require('react-dom'),
          Well = ReactBootstrap.Well,
         Input = ReactBootstrap.Input,
         Check = ReactBootstrap.Check,
       BSTable = ReactBootstrap.Table,
      MenuItem = ReactBootstrap.MenuItem,
DropdownButton = ReactBootstrap.DropdownButton;

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
    if (this.props.override || this.state.override)
      var isChecked = this.props.checked
    var checked = isChecked
      ? <Input type="checkbox" onChange={this.handleCheck} checked label=" " />
      : <Input type="checkbox" onChange={this.handleCheck} label=" " />

    var _cells = [];
    var cells = this.props.columns.map(function(cell, i){
      var regex = new RegExp( '(' + this.props.filterText + ')', 'gi' );
      var html = this.props.row[cell];
      if (this.props.filterText.length >= 3)
        html = html.toString().replace(regex, '<span class="highlighted">$1</span>');
      _cells.push(<td key={i} dangerouslySetInnerHTML={{ "__html": html }}></td>
      ,<td key={i+'-resize'} className="column-resize"></td>)
    }.bind(this))
    return (
        <tr className={this.props.hidden ? 'hidden' : ''}>
          <td className="rowID">
            {checked}
          </td>
          {_cells}
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
    var negative = -1
    var positive = 1;
    if (state.reverse) {
      var negative = 1;
      var positive = -1;
    }
    var _columns = []
    var columns = state.columns
      .map(function(column, i){
        var selected = state.sortField == column
          ? 'sort-selection-field'
          : '';
        var className = i+'-resize'
        _columns.push(
          <th key={i} className={selected, className} onClick={this.handleClick.bind(this, column)}>
            {column.charAt(0).toUpperCase() + column.slice(1)}
          </th>,<td key={i+'-resize'} className="column-resize" onClick={this.resizeCol.bind(this, i+'-resize')}></td>
        )
      }.bind(this))
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
          if(aVal < bVal) return positive;
          if(aVal > bVal) return negative;
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
            rowID={i}
            row={row}
            checked={state.checked}
            sortField={state.sortField}
            hidden={row.hidden ? true : false}
            filterText={state.filterText}
            columns={state.columns}
            override={state.override}  />
        )
      });
    if (state.columns.length < 1) {
      return (
          <div className="row spacer">
            <div className="loading">Loading ...</div>
          </div>
      )
    }
    return (
        <div className="row spacer">
          <div>
            <BSTable className="dataTable" striped bordered hover responsive={true}>
                <thead className="data-table-thead">
                  <tr>
                    <th>
                      <Input type="checkbox" standalone onChange={this.handleCheck} label=" " />
                    </th>
                    {_columns}
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
  },
  highlightMatches: function(row, keyword) {
    this.state.columns.forEach(function(column, i) {
      row[column].toString().replace(['<span class="highlighted">','</span>',['','']])
      row[column] = row[column].toString().replace(keyword, '<span class="highlighted">' + keyword + '</span>')
    })
    return row;
  },
  resizeCol: function(selector){
    var resize = setInterval(function(){
      var col = document.getElementsByClassName(selector)[0]
      var _currentWidth = parseInt(col.scrollWidth)
      console.log("currentWidth", _currentWidth);
      if (_currentWidth <= 50)
        clearInterval(this)
      col.style['width'] = _currentWidth - 1 + 'px'
    }, 1)
  }
});

var SearchBar = React.createClass({
  getInitialState: function() {
    return {
      route: ''
    }
  },
  handleChange: function() {
    this.props.onUserInput(
        this.refs.filterTextInput.value
    );
  },
  render: function() {
    var routes = Object.keys(this.props.routes).map((route, i) => {
       return (<MenuItem eventKey={i} key={i}>{route}</MenuItem>)
    });
    return (
      <div className="row table-search">
        <form className="form-grop" onSubmit={this.handleSubmit}>
          <div className="data-table-search-panel">
            <input ref="filterTextInput" type="search" autoFocus className="data-table-search-input form-control input-lg" value={this.props.filterText} onChange={this.handleChange} placeholder="Search..." aria-describedby="sizing-addon1"></input>
            <DropdownButton title={this.props.selectedRoute || 'Routes'} id="bg-nested-dropdown" bsSize="lg" className="data-table-filter-dropdown" onSelect={this.props.handleSelect}>
              {routes}
            </DropdownButton>
          </div>
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
    , rows: this.props.rows
    , columns: this.props.columns
    , routes: this.props.routes
    };
  },
  getData: function(name, route) {
    this.setState({ rows: [{}], columns: [] }, () => {
      $.get(route, function(result) {
        if (this.isMounted()) {
          this.setState({ rows: result, columns: Object.keys(result[0]), selectedRoute: name });
        }
      }.bind(this));
    });
  },
  handleUserInput: function(filterText) {
    this.setState({ filterText: filterText });
  },
  handleSelect: function(e) {
    this.getData(e.target.text, this.props.routes[e.target.text])
  },
  render: function() {
    var columns = Object.keys(this.props.rows[0])
    return (
      <Well className="data-table-well">
        <SearchBar
          onUserInput={this.handleUserInput}
          filterText={this.state.filterText}
          routes={this.state.routes}
          selectedRoute={this.state.selectedRoute || ''}
          handleSelect={this.handleSelect} />
        <Table
          ref="dataTable"
          filterText={this.state.filterText}
          rows={this.state.rows}
          columns={this.state.columns}
          override={false} />
      </Well>
    );
  },
  componentWillMount: function() {
    for (var route in this.props.routes) break;
    this.setState({ selectedRoute: route }, function(){
      this.getData(route, this.props.routes[route])
    })
  },
  componentDidMount: function() {

  }
});

module.exports = DataTable;
