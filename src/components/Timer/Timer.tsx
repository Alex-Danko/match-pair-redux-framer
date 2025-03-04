import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store"
import { loseGame } from "../../features/game/gameSlice";

import "./Timer.css"

export const Timer = () => {
    const gameSize = useSelector((state: RootState) => state.game.size);
    const gameStatus = useSelector((state: RootState) => state.game.status);
    const calculatedTime = gameSize.rows * gameSize.cols * 3;
    const dispatch = useDispatch();

    const [pulseTrigger, setPulseTrigger] = useState(false);

    const [timeLeft, setTimeLeft] = useState(calculatedTime);


    useEffect(() => {
        if (!gameStatus.isStarted) {
            setTimeLeft(calculatedTime)
            setPulseTrigger(true);
            setTimeout(() => setPulseTrigger(false), 300);
        }
    }, [calculatedTime, gameStatus.isStarted]);

    useEffect(() => {
        if (gameStatus.isStarted) {
            if (timeLeft <= 0) {
                dispatch(loseGame())
                return
            } else if (gameStatus.isWon) {
                return
            };

            const timer = setTimeout(() => {
                setTimeLeft(time => time - 1)
            }, 1000)

            return () => clearTimeout(timer);
        }
    }, [dispatch, timeLeft, gameStatus]);

    if (gameStatus.isLost) return null;

    return (
        <div
            className={`timer ${(gameStatus.isStarted && !gameStatus.isWon && !gameStatus.isLost) && "glow pulsate"} ${gameStatus.isWon && "game-won"}`}
        >
            <span className={`${pulseTrigger && "timer-change"}`}
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)"
                }}
            >
                {gameStatus.isStarted ? `${timeLeft}s` : `${calculatedTime}s`}
            </span>
        </div>
    );
};