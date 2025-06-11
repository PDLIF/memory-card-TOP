import '../style/EndgameMessage.css';

const EndgameMessage = ({isWin, restartGame, handleCloseMessage}) => {
    return (
        <>
            <div className="overlay" onClick={handleCloseMessage}>
                <div className="message-box" onClick={(e) => e.stopPropagation()}>
                    <h2>{isWin ? ('You Win!') : ('You Lose :(')}</h2>
                    <button onClick={restartGame}>Restart</button>
                </div>
            </div>
        </>
    )
}

export default EndgameMessage;