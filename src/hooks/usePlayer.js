// React Hooks should begin with 'use'

// we only need useState from react
import { useState } from 'react';

import { randomTetromino } from "../tetrominos";

export const usePlayer = () => {
    // use state returns an array with two values
    // (we use ES6 destructuring to access these two vals)
    // the first is effectively a getter, a variable which can be used
    //  to read state
    // the second value is a setter function
    // note we can set default state by passing a value to useState
    const [player, setPlayer] = useState({
        pos: { x: 0, y: 0},
        tetrimino: randomTetromino().shape,
        collided: false
    });

    // we will import this hook into the tetris component
    // by returning the player setter, we can then use the return
    // value to query the player state in tetris component
    return [player];
}