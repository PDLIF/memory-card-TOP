import React, {useState, useEffect} from "react";
import CardContainer from "./CardContainer";

const Game = () => {
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [clickedCards, setClickedCards] = useState([]);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        async function fetchImages() {
            try {
                const API_KEY = 'sk-cC3s683983ea57eac10757';
                const plantNames = ["Daisy", "Lily", "Tulip", "Lavender", "Poppy"];
    
                const plantPromises = plantNames.map(name => 
                    fetch(`https://perenual.com/api/species-list?key=${API_KEY}&q=${encodeURIComponent(name)}`)
                    .then(response => response.json())
                );
    
                const plantResponses = await Promise.all(plantPromises);
          
                const formatted = plantResponses
                    .map(response => response.data[0])
                    // .filter((plant) => plant.default_image?.regular_url) // filter out those without images
                    // .slice(0, 5)
                    .map((plant) => ({
                        id: plant.id,
                        name: plant.common_name || plant.scientific_name[0],
                        image: plant.default_image.regular_url,
                    }));
                    console.log(formatted)
                    setCards(formatted);
            } catch (error) {
                console.error('Failed to fetch plant data:', error);
            }
        }
        
        fetchImages();
    }, []);

    const shuffleCards = (cardsToShuffle) => {
        const shuffled = cardsToShuffle.sort(() => Math.random() > 0.5 ? -1 : 1);
        setCards(shuffled);
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