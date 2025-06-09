import React, {useState, useEffect} from "react";
import CardContainer from "./CardContainer";
import ScoreBoard from "./ScoreBoard";
import EndgameMessage from "./EndGameMessage";

import '../style/Game.css';

const Game = () => {
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [clickedCards, setClickedCards] = useState([]);
    const [cards, setCards] = useState([]);

    const [roundsWon, setRoundsWon] = useState(0);

    const [isGameOver, setIsGameOver] = useState(false);
    const [isWin, setIsWin] = useState(false);

    useEffect(() => {
        fetchImages();
    }, []);

    async function fetchImages() {
        try {
            const breedMap = {
                "Akita": "akita",
                "Golden Retriever": "retriever/golden",
                "Chow": "chow",
                "Corgi": "corgi",
                "Airedale": "airedale",
            }
            const breedNames = Object.keys(breedMap);
            const imagePromises = breedNames.map(async (breed) => {
                const path = breedMap[breed];
                console.log(path)
                const res = await fetch(`https://dog.ceo/api/breed/${path}/images/random`);
                const data = await res.json();
                return {
                    id: breed,
                    name: breed,
                    image: data.message,
                };
            });
            const dogCards = await Promise.all(imagePromises);
            setCards(dogCards);
        } catch (error) {
            console.error('Failed to fetch plant data:', error);
        }
    }
    
    const resetGame = () => {
        setScore(0);
        setClickedCards([]);
        fetchImages();
    }

    const restartGame = () => {
        setIsGameOver(false)
        setScore(0);
        setBestScore(0);
        setClickedCards(0);
        fetchImages();
    }

    const shuffleCards = (cardsToShuffle) => {
        const shuffled = cardsToShuffle.sort(() => Math.random() > 0.5 ? -1 : 1);
        setCards(shuffled);
    }

    const handleCardClick = (id) => {

        const newClicked = [...clickedCards, id];
        setClickedCards(newClicked);
        setScore(score + 1);
        shuffleCards(cards);

        if (clickedCards.includes(id)) {
            if (score > bestScore) setBestScore(score);
            setIsGameOver(true);
            setIsWin(false)
            resetGame();
        }
        if (newClicked.length === cards.length && clickedCards.length !== 0) {
            setBestScore(cards.length);
            setRoundsWon(roundsWon + 1);
            resetGame();
        } 
        if (roundsWon + 1 === 5) {
            setIsGameOver(true);
            setIsWin(true);
        }
    }

    return (
        <div className="game">
            <h1>Dog Memory Game</h1>
            <ScoreBoard score={score} bestScore={bestScore} />
            <h2>{roundsWon} / 5</h2>
            <CardContainer cards={cards} onCardClick={handleCardClick} />
            {/* <button onClick={restartGame}>asd</button> */}
            {isGameOver && (
                <EndgameMessage isWin={isWin} restartGame={restartGame} />
            )}
        </div>
    )
}

export default Game;