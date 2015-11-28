var React = require('react');
var ReactDOM = require('react-dom');
var Faker = require('faker');
var NavBar = require('./navBar.js');
var SlideMenu = require('./menu.js');
var SearchBar = require('./components/searchbar');
var DataTable = require('./components/datatable');

// var routes = [{
//   name: 'Oscars'
// , endpoint: 'http://api.opendev.oscars.org/v1/assets/films?!fields=last_watched,guid,slug,resume'
// , columns: {
//       ignore: ['poster']
//     }
// },{
//   name: 'Analytics'
// , endpoint: 'http://api.opendev.oscars.org/v1/analytics/traces'
// , columns: {
//     ignore: ['name', 'type', 'os', 'browser', 'language', 'events']
//   }
// }];

function fakeRows(){
  var rows = []
  while(rows.length < 100)
    rows.push({
      id:    Faker.random.number(3)
    , name:  Faker.Name.findName()
    , email: Faker.Internet.email()
    , city:  Faker.Address.city()
    , company: Faker.Company.companyName()
    , slogan: Faker.Company.catchPhrase()
    })
  return rows;
}

var routes = [{
    name: 'Series'
  , endpoint: 'http://localhost:8000/v1/assets/series'
  , columns: {
      ignore:  ['seasons', 'meta']
    , order: ['ID', 'name', 'description']
    , alias: {
        name: 'meta.en.name'
      , description: 'meta.en.description'
      , year: 'production_year'
      , seasons: 'number_of_seasons'
      }
    }
  },{
    name: 'Seasons'
  , endpoint: 'http://localhost:8000/v1/assets/series/seasons'
  , columns: {
      ignore: ['meta', 'has_trailer', 'episodes']
    , order: ['ID', 'description', 'thumb', 'year', 'episodes']
    , alias: {
        description: 'meta.en.description'
      , episodes: 'number_of_episodes'
      , year: 'production_year'
      }
    }
  },{
    name: 'Episodes'
  , endpoint: 'http://localhost:8000/v1/assets/series/seasons/episodes'
  , columns: {
      ignore: ['meta', 'songs']
    , order: ['ID', 'URL']
    , alias: {
        season: 'season_id'
      , series: 'series_id'
      , number: 'episode_number'
      , url: 'video_url'
      }
    }
  },{
    name: 'Albums'
  , endpoint: 'http://localhost:8000/v1/assets/albums'
  , columns: {
      ignore: ['meta', 'songs']
    , order: ['id', 'name']
    , alias: {
        name: 'meta.en.name'
      , songs: 'number_of_songs'
      }
    }
  },{
    name: 'Songs'
  , endpoint: 'http://localhost:8000/v1/assets/albums/songs'
  , columns: {
      ignore: ['meta', 'has_video']
    , order: ['id', 'name', 'thumb', 'audio', 'video']
    , alias: {
        name: 'meta.en.name'
      , video: 'video_url'
      , audio: 'audio_url'
      }
    }
  },{
    name: 'Movies'
  , endpoint: 'http://localhost:8000/v1/assets/movies'
  , columns: {
      ignore: ['meta']
    }
  },{
    name: 'Plays'
  , endpoint: 'http://localhost:8000/v1/assets/plays'
  , columns: {
      ignore: ['plays']
    }
}];


var App = React.createClass({

  getInitialState: function(){
    return {
      filter: ''
    , selected: ''
    }
  },

  render: function() {
    return (
      <div>
        <NavBar />
        <div className="container-fluid">
          <SlideMenu />
          <div id="left" className="col-md-12">
            <SearchBar
              onSelect={this.fetch}
              onChange={this.filter}
              routes={routes}
              filter={this.state.filter}
              selected={this.state.selected} />
            <DataTable
              ref="datatable"
              filter={this.state.filter}
              head={this.state.selected}
              rows={this.state.rows || fakeRows()} />
          </div>
        </div>
      </div>
    );
  },

  filter: function(e){
    this.setState({
      filter: e.target.value
    })
  },

  fetch: function(route){
    $.get(route.endpoint, function(result) {
      this.setState({
        rows: result
      , filter: ''
      , selected: route
    });
    }.bind(this));
  }
});

ReactDOM.render(
  <App  />,
  document.getElementById('content')
);
