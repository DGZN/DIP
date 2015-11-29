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

var options = {
  default: {
    language: 'en'
  }
, language: {
    english: 'en'
  , arabic:  'ar'
  }
}

var routes = [{
    name: 'Series'
  , endpoint: 'http://localhost:8000/v1/assets/series'
  , columns: {
      ignore:  ['seasons', 'meta']
    , order: ['ID', 'name', 'description']
    , alias: {
        name: 'meta.language.name'
      , description: 'meta.language.description'
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
        description: 'meta.language.description'
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
    , order: ['ID', 'name']
    , alias: {
        name: 'meta.language.name'
      , songs: 'number_of_songs'
      }
    }
  },{
    name: 'Songs'
  , endpoint: 'http://localhost:8000/v1/assets/albums/songs'
  , columns: {
      ignore: ['meta', 'has_video']
    , order: ['ID', 'name', 'thumb', 'audio', 'video']
    , alias: {
        name: 'meta.language.name'
      , video: 'video_url'
      , audio: 'audio_url'
      , number: 'song_number'
      }
    }
  },{
    name: 'Movies'
  , endpoint: 'http://localhost:8000/v1/assets/movies'
  , columns: {
      ignore: ['meta', 'has_trailer']
    , order: ['ID', 'name']
    , alias: {
        name: 'meta.language.name'
      , video: 'video_url'
      }
    }
  },{
    name: 'Plays'
  , endpoint: 'http://localhost:8000/v1/assets/plays'
  , columns: {
      ignore: ['meta', 'has_trailer']
    , order: ['ID', 'name', 'description', 'year', 'url']
    , alias: {
      name: 'meta.language.name'
    , description: 'meta.language.description'
    , year: 'production_year'
    , URL: 'video_url'
    }
    }
}];

var App = React.createClass({

  getInitialState: function(){
    return {
      filter: ''
    , language: 'en'
    , selected: ''
    , option: ''
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
              onSelect={this.select}
              onChange={this.filter}
              routes={routes}
              filter={this.state.filter}
              _select={this.state._select || ''}
              selected={this.state.selected} />
            <DataTable
              ref="datatable"
              filter={this.state.filter}
              option={this.state.option}
              head={this.state.selected}
              rows={this.state.rows || fakeRows()} />
          </div>
        </div>
      </div>
    );
  },

  filter: function(e){
    this.setState({filter: e.target.value})
  },

  select: function(target, e){
    if (target.type == "route")
      return this.fetch(target[target.type])
    this.setState({
      [target.type]: target[target.type]
    , _select: target[target.type][Object.keys(target[target.type])[0]]
    })
  },

  fetch: function(route){
    $.get(route.endpoint, function(result) {
      route.options = options
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
