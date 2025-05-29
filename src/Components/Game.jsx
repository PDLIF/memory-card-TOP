import React, {useState, useEffect} from "react";
import CardContainer from "./CardContainer";

const Game = () => {
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [currentCards, setCurrentCards] = useState([]);

    const updateCurrentCards = (card) => {
        if (currentCards.indexOf(card) === -1) {
            setCurrentCards([...currentCards, card]);
        } else {
            setCurrentCards([]);
            setScore(0);
        }
    }

    useEffect(() => {
        if (currentCards.length === 0) {
            setScore(0);
        } else {
            setScore(score + 1);
        }
    }, [currentCards]);

    useEffect(() => {
        if (score > highScore) {
            setHighScore(score);
        }
    }, [score]);

    return (
        <div>
            Game Components
            <br />
            score: {score}
            <br />
            High Score: {highScore}
            <CardContainer
                updateCurrentCards={updateCurrentCards}
            />
        </div>
    )
}

export default Game;