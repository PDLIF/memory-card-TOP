import React, {useState, useEffect} from "react";
import Card from "./Card";

const CardContainer = ({updateCurrentCards}) => {
    const [cards, setCards] = useState([1, 2, 3, 4, 5]);

    const randomCardOrder = () => {
        console.log('hello')
        setCards(cards.sort(() => Math.random() > 0.5 ? -1 : 1));
    }

    useEffect(() => {
        randomCardOrder();
    }, [cards]);

    return (
        <div>
            Card Container

            {cards.map((card, index) => {
                return <div key={index}>
                        <Card
                            card={card}
                            randomCardOrder={randomCardOrder}
                            updateCurrentCards={updateCurrentCards}/>
                    </div>
            })}
        </div>
    )
}

export default CardContainer;