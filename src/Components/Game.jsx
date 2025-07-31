import React, {useState, useEffect} from "react";
import CardContainer from "./CardsContainer";
import ScoreBoard from "./ScoreBoard";
import EndgameMessage from "./EndGameMessage";

import '../style/Game.css';

const Game = () => {
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [clickedCards, setClickedCards] = useState([]);
    const [cards, setCards] = useState([]);
    const [cardsFlipped, setCardsFlipped] = useState(false);

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
        setCardsFlipped(false);
        setScore(0);
        setBestScore(0);
        setClickedCards([]);
        setRoundsWon(0);
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
        
        setCardsFlipped(true);
        
        setTimeout(() => shuffleCards(cards), 800);
        
        // Lose condition
        if (clickedCards.includes(id)) {
            if (score > bestScore) setBestScore(score);
            setCardsFlipped(true);
            setIsGameOver(true);
            setIsWin(false)
            resetGame();
            return
        }
        // Win condition
        if (newClicked.length === cards.length && roundsWon + 1 === 2) {
            setCardsFlipped(true);
            setIsGameOver(true);
            setIsWin(true);
            return
        }
        // Managing intermediate rounds win
        else if (newClicked.length === cards.length && clickedCards.length !== 0) {
            setTimeout(() => setCardsFlipped(false), 850);
            setBestScore(cards.length);
            setRoundsWon(roundsWon + 1);
            resetGame();
            return
        }

        setTimeout(() => setCardsFlipped(false), 850);
    }

    const handleCloseMessage = () => {
        restartGame();
    }

    return (
        <div className="game">
            <h1>Dog Memory Game</h1>
            <ScoreBoard score={score} bestScore={bestScore} />
            <h2>{roundsWon} / 2</h2>
            <CardContainer cards={cards} onCardClick={handleCardClick} cardsFlipped={cardsFlipped} />
            {isGameOver && (
                <EndgameMessage isWin={isWin} restartGame={restartGame} handleCloseMessage={handleCloseMessage} />
            )}
        </div>
    )
}

export default Game;