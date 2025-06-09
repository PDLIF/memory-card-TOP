import React, {useState, useEffect} from "react";
import CardContainer from "./CardContainer";
import ScoreBoard from "./ScoreBoard";

import '../style/Game.css';

const Game = () => {
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [clickedCards, setClickedCards] = useState([]);
    const [cards, setCards] = useState([]);

    useEffect(() => {
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
        
        fetchImages();
    }, []);
    
    const resetGame = () => {
        setScore(0);
        setClickedCards([]);
        // setCards([1, 2, 3, 4, 5]);
        // fetchImages();
    }

    if (clickedCards.length === cards.length && clickedCards.length !== 0) {
        setBestScore(cards.length);
        alert("You win!");
        resetGame();
        return;
    }


    const shuffleCards = (cardsToShuffle) => {
        const shuffled = cardsToShuffle.sort(() => Math.random() > 0.5 ? -1 : 1);
        setCards(shuffled);
    }

    const handleCardClick = (id) => {
        if (clickedCards.includes(id)) {
            // Game over
            if (score > bestScore) setBestScore(score);
            resetGame();
            alert('You lose')
            // fetchImages();
        } else {
            const newClicked = [...clickedCards, id];
            setClickedCards(newClicked);
            setScore(score + 1);
            shuffleCards(cards);
        }
    }

    return (
        <div className="game">
            <h1>Dog Memory Game</h1>
            <ScoreBoard score={score} bestScore={bestScore} />
            <CardContainer cards={cards} onCardClick={handleCardClick} />
        </div>
    )
}

export default Game;