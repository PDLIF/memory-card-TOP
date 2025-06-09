import React from "react";
import '../style/Card.css';

const Card = ({ card, onCardClick }) => {

    return (
        <div className="card" onClick={() => onCardClick(card)}>
            <img src={card.image} alt="" />
            <p>{card.name}</p>
        </div>
    )
}

export default Card;