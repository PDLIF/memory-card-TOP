const EndgameMessage = ({isWin, restartGame}) => {
    return (
        <>
            <div className="endgame-message">
                <h2>{isWin ? ('You Win!') : ('You Lose :(')}</h2>
                <button onClick={restartGame}>Restart</button>
            </div>
        </>
    )
}

export default EndgameMessage;