import { FC } from "react";
import './Slider.css'
import { useDispatch, useSelector } from "react-redux";
import { resize } from "../../features/game/gameSlice";
import type { RootState } from "../../app/store"

interface SliderProps {
    type: "rows" | "columns"; // Default: horizontal
}


export const Slider: FC<SliderProps> = ({ type }) => {
    const gridSize = useSelector((state: RootState) => state.game.size);
    const dispatch = useDispatch();

    const value = type === "rows" ? gridSize.rows ?? 2 : gridSize.cols ?? 2;
    const orientation = type === "rows" ? "vertical" : "horizontal";

    function handleResize(event: React.ChangeEvent<HTMLInputElement>) {
        const newValue = parseInt(event.target.value)

        dispatch(resize({
            rows: type === "rows" ? newValue : gridSize.rows,
            cols: type === "rows" ? gridSize.cols : newValue
        }));
    }

    return (
        <div className={`slider ${orientation}-slider`}>
            <input
                type="range"
                min="2"
                max="8"
                step="2"
                value={value}
                onChange={handleResize}

            />
            <div className={`slider-notches ${orientation}-slider-notches`}>
                {[2, 4, 6, 8].map(num => (
                    <span key={num} className={`slider-notch ${orientation}-slider-notch`}>
                        {num}
                    </span>
                ))}
            </div>
        </div >
    );
};

