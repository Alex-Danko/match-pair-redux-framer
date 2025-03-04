import { useSelector } from "react-redux";
import type { RootState } from "../../app/store"
import { Card } from "../../ui/Card/Card";
import './GameTable.css'
import { GameTableMock } from "../../ui/GameTableMock/GameTableMock";
import { useMemo } from "react";
export const GameTable = () => {
    const deck = useSelector((state: RootState) => state.game.deck, (a, b) => a === b);
    const rows = useSelector((state: RootState) => state.game.size.rows);
    const cols = useSelector((state: RootState) => state.game.size.cols);
    const gameStarted = useSelector((state: RootState) => state.game.status.isStarted);

    const gridStyle = useMemo(() => ({
        display: "grid",
        grid: `repeat(${rows}, 8vh) / repeat(${cols}, 8vh)`,
        gap: "2vh",
    }), [rows, cols]);

    if (gameStarted) {
        return (
            <div>
                <div className="gametable" style={gridStyle}>

                    {deck.map((card) => (
                        <Card key={card.id} cardId={card.id} />
                    ))}
                </div>
            </div>
        )
    } else {
        return (
            <div style={{ filter: "blur(3px)" }}>
                <GameTableMock />

            </div>
        )
    }




}