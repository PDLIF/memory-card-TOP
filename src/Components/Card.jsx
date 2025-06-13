import React, {useState, useEffect} from "react";
import Tilt from 'react-parallax-tilt';
import '../style/Card.css';

import backIMG from '../assets/back.jpg';

const Card = ({ card, onCardClick, cardsFlipped }) => {

    const ANIMATION_TIME = 850;
    const [interactable, setInteractable] = useState(false);
  
    useEffect(() => {
        setTimeout(() => setInteractable(true), ANIMATION_TIME);
    }, []);

    return (
        <Tilt className={`card-container ${cardsFlipped ? 'flipped' : ''} ${!cardsFlipped && interactable ? undefined : "pointer-events-none"}`}
         tiltReverse={true}
         glareEnable={true}
         glareBorderRadius={'1rem'}
         glareMaxOpacity={0.3}
         glarePosition="all"
         >
            <div className={`card`} onClick={() => onCardClick(card.id)}>
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