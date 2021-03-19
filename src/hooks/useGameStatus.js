import { useState, useEffect, useCallback } from 'react';

export const useGameStatus = rowsCleared => {
    const [score, setScore] = useState(0);
    // this is used to track how many TOTAL rows the player has cleared
    const [rows, setRows] = useState(0);
    const [level, setLevel] = useState(0);

    // the number of points you get for clearing lines
    // the more lines you clear at once, the larger the reward
    // these are the values used in the OG tetris game
    const linePoints = [40, 100, 300, 1200];

    // this will recalculate the score
    // this function is fired whenever the level,
    // the line points, or the number of cleared rows changes
    // so it won't fire on every render, which is good for efficiency
    const calcScore = useCallback(() => {
        // check if we've actually cleared any rows
        if (rowsCleared > 0) {
            // we use both the rows cleared and the current level to calculate 
            // this is the formula used in OG tetris
            setScore(prev => prev + linePoints[rowsCleared-1] * (level + 1));
            setRows(prev => prev + rowsCleared);
        }
    }, [level, linePoints, rowsCleared])

    // an effect that should run whenever the score changes
    useEffect(() => {
        calcScore();
    }, [calcScore, rowsCleared, score]);

    return [score, setScore, rows, setRows, level, setLevel];
}