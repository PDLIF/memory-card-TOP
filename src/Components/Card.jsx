import React from "react";
import Tilt from 'react-parallax-tilt';
import '../style/Card.css';

const Card = ({ card, onCardClick }) => {

    return (
        <Tilt className="custom-tilt" tiltReverse={true} glareEnable={true} glareBorderRadius={'1rem'}>
            <div className="card" onClick={() => onCardClick(card)}>
                <div className="card-inner">
                    <div className="card-front">
                        <img src={card.image} alt="" />
                        <p className="bg-black-transp">{card}</p>
                    </div>
                    <div className="card-back">
                        {card}
                    </div>
                </div>
            </div>
        </Tilt>
    )
}

export default Card;