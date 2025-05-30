import React from "react";

const Card = ({ card, onCardClick }) => {

    return (
        <div className="card" onClick={() => onCardClick(card)}>
            {card.image}
        </div>
    )
}

export default Card;