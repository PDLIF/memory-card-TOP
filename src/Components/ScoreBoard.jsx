import React from "react";
import '../style/ScoreBoard.css'

const ScoreBoard = ({ score, bestScore }) => {
    return (
        <div className="scoreboard bg-light">
            <p>Score: {score}</p>
            <p>Best Score: {bestScore}</p>
        </div>
    )
}

export default ScoreBoard;