import type { Card } from './gameSlice'

export const createShuffledDeck = (rows: number, cols: number): Card[] => {
    if ((rows * cols) % 2 !== 0) {
        throw new Error("Grid size must be even to create pairs.");
    }

    const totalPairs = (rows * cols) / 2;
    const uniqueValues = Array.from({ length: totalPairs }, (_, i) => (i + 1).toString());

    // Step 1: Duplicate values to create pairs
    const deckValues = [...uniqueValues, ...uniqueValues];

    // Step 2: Shuffle values
    for (let i = deckValues.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deckValues[i], deckValues[j]] = [deckValues[j], deckValues[i]];
    }

    // Step 3: Assign ordered IDs
    return deckValues.map((value, index) => ({
        id: index, // Sequential ID
        value,
        isMatched: false,
        isFlipped: false,
    }));
};