import React, {useState, useEffect} from "react";
import CardContainer from "./CardContainer";
import ScoreBoard from "./ScoreBoard";

import '../style/Game.css';

const Game = () => {
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [clickedCards, setClickedCards] = useState([]);
    const [cards, setCards] = useState([1, 2, 3, 4, 5]);

    // useEffect(() => {
    //     async function fetchImages() {
    //         try {
    //             const API_KEY = 'sk-cC3s683983ea57eac10757';
    //             const plantNames = ["Daisy", "Lily", "Tulip", "Lavender", "Poppy"];
    
    //             const plantPromises = plantNames.map(name => 
    //                 fetch(`https://perenual.com/api/species-list?key=${API_KEY}&q=${encodeURIComponent(name)}`)
    //                 .then(response => response.json())
    //             );
    
    //             const plantResponses = await Promise.all(plantPromises);
          
    //             const formatted = plantResponses
    //                 .map(response => response.data[0])
    //                 // .filter((plant) => plant.default_image?.regular_url) // filter out those without images
    //                 // .slice(0, 5)
    //                 .map((plant) => ({
    //                     id: plant.id,
    //                     name: plant.common_name || plant.scientific_name[0],
    //                     image: plant.default_image.regular_url,
    //                 }));
    //                 console.log(formatted)
    //                 setCards(formatted);
    //         } catch (error) {
    //             console.error('Failed to fetch plant data:', error);
    //         }
    //     }
        
    //     fetchImages();
    // }, []);
    
    const resetGame = () => {
        setScore(0);
        setClickedCards([]);
        setCards([1, 2, 3, 4, 5]);
    }

    if (clickedCards.length === cards.length) {
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
            Game Components
            <ScoreBoard score={score} bestScore={bestScore} />
            <CardContainer cards={cards} onCardClick={handleCardClick} />
        </div>
    )
}

export default Game;