import React from "react";

const Card = ({ card, onCardClick }) => {

    return (
        <div className="card" onClick={() => onCardClick(card.id)}>
            {/* {card} */}
        </div>
    )
}

export default Card;