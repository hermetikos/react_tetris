// React Hooks should begin with 'use'

// we only need useState from react
import { useState, useCallback } from 'react';
import { STAGE_WIDTH } from '../gameHelpers';

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

    // a helper function that updates player position
    // it usese the setter function generated above
    const updatePlayerPos = ({x, y, collided}) => {
        setPlayer(prev => ({
            ...prev,
            pos: { x: (prev.pos.x += x), y: prev.pos.y += y},
            collided
        }));
    }

    const resetPlayer = useCallback(() => {
        setPlayer({
            pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
            tetromino: randomTetromino().shape,
            collided: false
        })
    }, [])

    // we will import this hook into the tetris component
    // by returning the player setter, we can then use the return
    // value to query the player state in tetris component
    return [player, updatePlayerPos, resetPlayer];
}