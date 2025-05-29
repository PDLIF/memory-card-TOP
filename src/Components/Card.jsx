import React from "react";

const Card = ({card, randomCardOrder, updateCurrentCards}) => {
    const checkCard = () => {
        randomCardOrder();
        updateCurrentCards(card);
    }

    return (
        <div onClick={checkCard}>
            {card}
            <br />
        </div>
    )
}

export default Card;