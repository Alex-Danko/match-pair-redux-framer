import { FC } from "react"
import type { RootState } from "../../app/store"
import { useDispatch, useSelector } from "react-redux"
import { flipCard } from "../../features/game/gameSlice"
import './Card.css'

interface CardProps {
    cardId: number
}


export const Card: FC<CardProps> = ({ cardId }) => {
    const cardInfo = useSelector((state: RootState) => state.game.deck[cardId]);
    const dispatch = useDispatch();

    if (cardId === -1) {
        return (
            <div className="card mock-card"></div>
        );
    }

    return (
        <div
            className={`card ${cardInfo.isFlipped ? "flipped" : ""}`}
            onClick={
                (!cardInfo.isFlipped && !cardInfo.isMatched)
                    ? () => dispatch(flipCard(cardId))
                    : () => null
            }
        >
            <div className="card-inner">
                <div className="card-front">?</div>
                <div className={`card-back ${cardInfo.isMatched ? "card-correct" : ""}`}>{cardInfo.value}</div>
            </div>
        </div>
    );
};