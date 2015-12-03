var React = require('react');
var ReactDOM = require('react-dom');
var Faker = require('faker');
var JSONMap = require('../../lib/json-map');
var NavBar = require('./navBar.js');
var SlideMenu = require('./menu.js');
var SearchBar = require('./components/searchbar');
var DataTable = require('./components/datatable');


function fakeRows(){
  var rows = []
  while(rows.length < 1000)
    rows.push({
      id:      Faker.random.number(999)
    , city:    Faker.Address.city()
    , name:    Faker.Name.findName()
    , email:   Faker.Internet.email()
    , slogan:  Faker.Company.catchPhrase()
    , company: Faker.Company.companyName()
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
      , year: 'production_year'
      }
    }
  },{
    name: 'Plays'
  , endpoint: 'http://localhost:8000/v1/assets/plays'
  , columns: {
      ignore: ['meta', 'has_trailer']
    , order: ['ID', 'name', 'description', 'year', 'URL']
    , alias: {
      name: 'meta.language.name'
    , description: 'meta.language.description'
    , year: 'production_year'
    , url: 'video_url'
    }
    }
}];

var App = React.createClass({

  componentWillMount: function(){
    //this.fetch(routes[0])
  },

  getInitialState: function(){
    return {
      option: ''
    , filter: ''
    , data: JSONMap(fakeRows())
    }
  },

  render: function() {
    return (
      <div>
        <NavBar />
        <div className="container-fluid">
          <div id="left" className="col-md-12">
            <SearchBar
              onSelect={this.select}
              onChange={this.filter}
              data={routes}
              filter={this.state.filter}
              active={this.state.active || ''}
              selected={this.state.data} />
            <DataTable
              filter={this.state.filter}
              data={this.state.data} />
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
    var data = this.state.data
    data[target.type] = target[target.type]
    this.setState({
      data: JSONMap(data)
    , active: target[target.type][Object.keys(target[target.type])[0]]
    })
  },

  fetch: function(route){
    $.get(route.endpoint).done(function(xhr){
      route.rows = xhr;
      route.options = options
      route.option = this.state.option
      this.setState({
        data: JSONMap(route)
      , filter: ''
      })
    }.bind(this))
  }

});

ReactDOM.render(
  <App  />,
  document.getElementById('content')
);
