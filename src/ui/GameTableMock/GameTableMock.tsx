import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";

export const GameTableMock = () => {
    const rows = useSelector((state: RootState) => state.game.size.rows);
    const cols = useSelector((state: RootState) => state.game.size.cols);
    const cardsAmount = rows * cols;

    return (
        <motion.div
            className="gametable"
            style={{
                display: "grid",
                grid: `repeat(${rows}, 8vh) / repeat(${cols}, 8vh)`,
                gap: "2vh",
            }}
            key={`${rows}-${cols}`} // Forces re-animation on grid change
            initial={{ scale: 0.5, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            {Array.from({ length: cardsAmount }, (_, i) => (
                <motion.div
                    key={i}
                    initial={{
                        opacity: 0,
                        scale: 0.8
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1
                    }}
                    transition={{ duration: 0.2 }}
                >
                    <div key={i} className="card mock-card">
                        <div className="card-inner">
                            <div className="card-front"></div>
                            <div className="card-back"></div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
};