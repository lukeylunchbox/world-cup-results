import React from 'react'
import TeamScore from './TeamScore'
import './Match.css'

function Match({
    stadium, 
    matchday, 
    away_team,
    home_team,
    home_result,
    away_result,
    name
}) {
    
    return <div className="card match-card">
        <div className="card-title">
            <h2>
                {stadium.name}
            </h2>
        </div>
        <div className="card-body">
            <TeamScore 
                score={away_result} 
                team={away_team.name} 
                flagURL={away_team.flag}
            />
            
            <h3>VS</h3>

            <TeamScore 
                score={home_result} 
                team={home_team.name} 
                flagURL={home_team.flag}
            />
        </div>
    </div>
}

export default Match