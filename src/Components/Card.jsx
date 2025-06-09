import React from "react";
import Tilt from 'react-parallax-tilt';
import '../style/Card.css';

const Card = ({ card, onCardClick }) => {

    return (
        <Tilt className="custom-tilt" tiltReverse={true} glareEnable={true} glareBorderRadius={'1rem'}>
            <div className="card" onClick={() => onCardClick(card)}>
                <img src={card.image} alt="" />
                <p>{card.name}</p>
            </div>
        </Tilt>
    )
}

export default Card;