import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store"
import "./GameOverScreen.css"
import { reset } from "../../features/game/gameSlice";


export const GameOverScreen = () => {
    const gameStatus = useSelector((state: RootState) => state.game.status);
    const gameSize = useSelector((state: RootState) => state.game.size);
    const dispatch = useDispatch();

    if (!gameStatus.isWon && !gameStatus.isLost) return null;

    return (
        <div className="game-over">

            <motion.div
                className="game-over-inner"
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                }}
                exit={{
                    opacity: 0,
                }}
                transition={{
                    duration: 1,
                    delay: 1,
                }}>
                {gameStatus.isWon
                    ? (<div style={{
                        transform: "translateY(-10%)"
                    }}>
                        <h2 className="game-over-title">
                            YOU WON
                        </h2>
                        <p className="game-over-descr">Good job! Time left:</p>
                        <button className="game-over-button" onClick={() => dispatch(reset(gameSize))}>⟳ PLAY AGAIN</button>
                    </div>)
                    : (
                        <div>
                            <h2 className="game-over-title">
                                YOU LOST
                            </h2>
                            <p className="game-over-descr game-over-descr-lost">Better luck next time!</p>
                            <button className="game-over-button" onClick={() => dispatch(reset(gameSize))}>⟳ PLAY AGAIN</button>
                        </div>)
                }
            </motion.div>
            <motion.div
                className="game-over-bg"
                style={{
                    backgroundColor: `${gameStatus.isWon ? "rgba(60, 255, 30, 0.8)" : "rgba(255, 1, 1, 0.8)"}`
                }}
                initial={{
                    transform: "translate(-50%, -50%) scale(0)"
                }}
                animate={{
                    transform: "translate(-50%, -50%) scale(300)"
                }}
                exit={{
                    transform: "translate(-50%, -50%) scale(0)"
                }}
                transition={{
                    duration: 1,
                    delay: 0.6
                }}
            />
        </div>
    )
}