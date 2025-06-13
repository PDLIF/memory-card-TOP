import React, {useState, useEffect} from "react";
import Card from "./Card";
import '../style/CardContainer.css';

const CardContainer = ({ cards, onCardClick, cardsShowing, setCardsShowing }) => {

    return (
        <div className="cards-container">
            {cards.map((card, index) => (
                <Card key={index} card={card} onCardClick={onCardClick} />
            ))}
        </div>
    )
}

export default CardContainer;