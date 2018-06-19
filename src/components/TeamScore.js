import React from 'react'

export default function TeamScore({
    score,
    flagURL,
    team
}) {
   const teamScore = score === null ? 'Not yet played' : score 
   return <div className="team-score">
        <p>{teamScore}</p>
        <img src={flagURL} alt={team} />
    </div>
}