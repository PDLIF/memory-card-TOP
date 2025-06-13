import React from "react";
import Tilt from 'react-parallax-tilt';
import '../style/Card.css';

import backIMG from '../assets/back.jpg';

const Card = ({ card, onCardClick, cardsShowing, setCardsShowing }) => {

    console.log(cardsShowing)

    return (
        <Tilt className={`card-container ${cardsShowing ? '' : 'flipped'}`}
         tiltReverse={true}
         glareEnable={true}
         glareBorderRadius={'1rem'}
         >
            <div className="card" onClick={() => onCardClick(card)}>
                <div className="card-front">
                    <div className="card-front-inner">
                        <img src={card.image} alt={card.name} />
                        <p className="bg-black-transp">{card.name}</p>
                    </div>
                </div>
                <div className="card-back">
                    <img src={backIMG} alt="" />
                </div>
            </div>
        </Tilt>
    )
}

export default Card;