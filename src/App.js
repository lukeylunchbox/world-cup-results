import React, { Component } from 'react';
import './App.css';
import Match from './components/Match'


class App extends Component {

  state = {
    matches: null,
    group: {
      name: null
    },
    stadiums: null,
    teams: null
  }

  componentDidMount() {
    this.fetchGroupMatches()
    .catch(err => console.error(err))
  }

  async fetchGroupMatches() {
    const url = 'https://raw.githubusercontent.com/lsv/fifa-worldcup-2018/master/data.json'
    const response = await fetch(url)
    const data = await response.json()

    const matchesA = data.groups.a.matches
    const matchesB = data.groups.b.matches
    const teams = data.teams
    const stadiums = data.stadiums


    const gameMatchesA = matchesA.map(match => { 
      const homeTeam = match.home_team
      const awayTeam = match.away_team
      const matchStadium = match.stadium

      match.home_team = teams.find(team => homeTeam === team.id) //o(n)
      match.away_team = teams.find(team => awayTeam === team.id) //o(n)
      match.stadium = stadiums.find(stadium => matchStadium === stadium.id) //o(n)
      return match
    })

    const gameMatchesB = matchesB.map(matchb => { 
      const homeTeam = matchb.home_team
      const awayTeam = matchb.away_team
      const matchStadium = matchb.stadium

      matchb.home_team = teams.find(team => homeTeam === team.id) //o(n)
      matchb.away_team = teams.find(team => awayTeam === team.id) //o(n)
      matchb.stadium = stadiums.find(stadium => matchStadium === stadium.id) //o(n)
      return matchb
    })


    this.setState({
      matches: gameMatchesA,
      group: {
        name: data.groups.a.name,
      },
      teams: teams
    })
  }
  
  render() {
    const { group, matches } = this.state
    
    if(!group.name) {
      return <div className="App">Loading...</div>
    }
    
    const games = matches.map(match => {
      console.log(match)
      return <Match key={match.name} {...match} />
    })

    return (
      <div className="App">
      <h1>{group.name}</h1>
      <div className="match-wrapper">
        {games}
      </div>
      </div>
    );
  }
}

export default App;

