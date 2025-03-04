import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createShuffledDeck } from './shuffleDeck';

export interface Card {
    id: number;
    value: string;
    isMatched: boolean;
    isFlipped: boolean;
}

interface GameStatus {
    isStarted: boolean;
    isLost: boolean;
    isWon: boolean;
}

interface GridSize {
    rows: number;
    cols: number;
}

export interface GameState {
    status: GameStatus,
    size: GridSize,
    score: number,
    deck: Card[],
    firstCard: Card | null,
    secondCard: Card | null,
}

const initialState: GameState = {
    status: {
        isStarted: false,
        isLost: false,
        isWon: false,
    },
    size: {
        rows: 4,
        cols: 4,
    },
    score: 0,
    deck: [],
    firstCard: null,
    secondCard: null,
}

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        startGame: (state) => {
            // Starting the game with provided grid size
            state.status.isStarted = true;
            state.deck = createShuffledDeck(state.size.rows, state.size.cols);
        },
        resize: (state, action) => {
            // Changes grid size stored in state
            state.size.rows = action.payload.rows;
            state.size.cols = action.payload.cols;
        },
        loseGame: (state) => {
            // After running out of time, the game is lost
            state.status.isLost = true;
        },
        flipCard: (state, action: PayloadAction<number>) => {
            // Flip the selected card
            state.deck[action.payload].isFlipped = true;

            if (state.firstCard === null && state.secondCard === null) {
                // First card click of the game
                state.firstCard = state.deck[action.payload];
            } else if (state.firstCard !== null && state.secondCard === null) {
                // Click on the second card
                state.secondCard = state.deck[action.payload];

                const firstCardId = state.firstCard.id;
                const secondCardId = action.payload;

                // Comparing the two cards and acting accordingly
                if (state.firstCard.value === state.secondCard.value) {
                    // Matched
                    state.score += 1;
                    if (state.score === (state.size.rows * state.size.cols) / 2) {
                        state.status.isWon = true;
                    };
                    state.deck[firstCardId].isMatched = true;
                    state.deck[secondCardId].isMatched = true;
                }
            } else if (state.firstCard !== null && state.secondCard !== null) {
                // Clicking a third card while two are already flipped
                if (state.secondCard.isMatched === false) {
                    // Flip two previous ones back if they weren't matched
                    state.deck[state.firstCard.id].isFlipped = false;
                    state.deck[state.secondCard.id].isFlipped = false;
                }
                // Third card becomes first card, second card is cleared
                state.firstCard = state.deck[action.payload];
                state.secondCard = null;
            }
        },
        reset: (state, action) => {
            // resets the game fully, keeping the last selected grid size
            Object.assign(state, initialState);
            state.size = action.payload;
        },

    }
})

export const { startGame, resize, loseGame, flipCard, reset } = gameSlice.actions

export default gameSlice.reducer