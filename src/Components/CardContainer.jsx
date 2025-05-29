import React, {useState, useEffect} from "react";
import Card from "./Card";

const CardContainer = ({cards, onCardClick}) => {

    return (
        <div className="card-container">
            {cards.map((card, index) => (
                <Card key={card.id} card={card} onCardClick={onCardClick} />
            ))}
        </div>
    )
}

export default CardContainer;