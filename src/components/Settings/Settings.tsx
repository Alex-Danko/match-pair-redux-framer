import { useDispatch, useSelector } from "react-redux";
import { startGame } from "../../features/game/gameSlice";
import type { RootState } from "../../app/store"
import { AnimatePresence, motion } from "framer-motion";

import { Slider } from '../../ui/Slider/Slider'

import './Settings.css'
import { Rules } from "../../ui/Rules/Rules";

export const Settings = () => {
    const gameStarted = useSelector((state: RootState) => state.game.status.isStarted);

    const dispatch = useDispatch();

    return (
        <AnimatePresence>
            {!gameStarted && (
                <motion.div
                    className={`settings`}
                    initial={{ opacity: 1, scale: 1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0, transformOrigin: "top left" }}
                    transition={{ duration: 0.3 }}
                >
                    <form onSubmit={(e) => { e.preventDefault(); dispatch(startGame()); }}>
                        <Slider type="rows" />
                        <Slider type="columns" />
                        <button className="settings-button">Play</button>
                    </form>
                    <Rules />
                </motion.div>
            )}
        </AnimatePresence>
    )
}