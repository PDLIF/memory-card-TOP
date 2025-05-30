import React, {useState, useEffect} from "react";
import CardContainer from "./CardContainer";

const Game = () => {
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [clickedCards, setClickedCards] = useState([]);
    const [cards, setCards] = useState([1, 2, 3, 4, 5]);

    async function fetchImages() {

    }

    const shuffleCards = () => {
        console.log('hello')
        setCards(cards.sort(() => Math.random() > 0.5 ? -1 : 1));
    }

    const handleCardClick = (id) => {
        if (clickedCards.includes(id)) {
            // Game over
            if (score > bestScore) setBestScore(score);
            setScore(0);
            setClickedCards([]);
            fetchImages();
        } else {
            const newClicked = [...clickedCards, id];
            setClickedCards(newClicked);
            setScore(score + 1);
            shuffleCards(cards);
        }
    }

    return (
        <div className="game">
            Game Components
            <div className="scoreboard">
                <p>Score: {score}</p>
                <p>Best Score: {bestScore}</p>
            </div>
            <CardContainer cards={cards} onCardClick={handleCardClick} />
        </div>
    )
}

export default Game;