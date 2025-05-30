import React, {useState, useEffect} from "react";
import CardContainer from "./CardContainer";

const Game = () => {
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [clickedCards, setClickedCards] = useState([]);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        fetchImages();
    }, []);

    async function fetchImages() {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=5');
            const data = await response.json();
            const formatted = await Promise.all(
                data.results.map(async (pokemon) => {
                    const res = await fetch(pokemon.url);
                    const details = await res.json();
                    return {
                        id: details.id,
                        name: details.name,
                        image: details.sprites.front_default,
                    }
                })
            );
            shuffleCards(formatted);
        } catch (error) {
            console.error('Failed to fetch images:', error);
        }
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