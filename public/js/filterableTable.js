var EpisodeRow = React.createClass({
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
              <td>{this.props.episode.title}</td>
              <td><a  onClick={this.handleClick}>view {this.state.viewed ? '(viewed)' : ''}</a></td>
          </tr>
      );
  }
});

var EpisodeTable = React.createClass({
  render: function() {
    var props = this.props;
    var rows = props.episodes
      .filter(function(episode){
        return episode.title.toLowerCase().indexOf(props.filterText.toLowerCase()) > -1;
      })
      .map(function(episode){
        return <EpisodeRow key={episode.title} episode={episode} />;
      });


    return (
        <div className="row spacer">
          <div className="col-lg-4 col-lg-offset-4">
            <table width="100%">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Link</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
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
          <div className="row ">
            <div className="col-lg-4 col-lg-offset-4">
              <form onSubmit={this.handleSubmit}>
                <input ref="filterTextInput" value={this.props.filterText} onChange={this.handleChange} type="search" className="form-control" placeholder="Search for episode" />
              </form>
            </div>
          </div>
      );
  }
});

var FilterableEpisodeTable = React.createClass({
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
          <div className="spacer">
              <SearchBar onUserInput={this.handleUserInput} filterText={this.state.filterText} />
              <EpisodeTable filterText={this.state.filterText} episodes={this.props.episodes} />
          </div>
      );
  }
});
