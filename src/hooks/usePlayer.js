// React Hooks should begin with 'use'

// we only need useState from react
import { useState, useCallback } from 'react';
import { STAGE_WIDTH } from '../gameHelpers';

import { TETROMINOS, randomTetromino } from "../tetrominos";

export const usePlayer = () => {
    // use state returns an array with two values
    // (we use ES6 destructuring to access these two vals)
    // the first is effectively a getter, a variable which can be used
    //  to read state
    // the second value is a setter function
    // note we can set default state by passing a value to useState
    const [player, setPlayer] = useState({
        pos: { x: 0, y: 0},
        tetromino: TETROMINOS[0].shape,
        collided: false
    });

    // performs a rotation on a matrix
    const rotate = (matrix, dir) => {
        // make the rows into columns (transpose)
        const rotatedTetromino = matrix.map((_, index) => 
            matrix.map(col => col[index]),
        )
        // then reverse each row (if applicable)
        // this will give the rotated matrix
        if (dir > 0) return rotatedTetromino.map(row => row.reverse());
        return rotatedTetromino;
    }

    // performs a rotation of a tetromino
    // and handles any collision that occurs
    const playerRotate = (stage, dir) => {
        const copiedTetromino = { ...player };
        copiedTetromino.tetromino = rotate(copiedTetromino.tetromino, dir);

        setPlayer(copiedTetromino);
    }

    // a helper function that updates player position
    // it usese the setter function generated above
    const updatePlayerPos = ({x, y, collided}) => {
        // pass an arrow function
        // note that a callback is passed
        // you can pass a callback if your new state depends on the old
        setPlayer(prev => ({
            ...prev,
            pos: { x: (prev.pos.x += x), y: prev.pos.y += y},
            collided
        }));
    }

    // useCallback returns a memoized callback
    // that is, the exact function generated by this hook
    // is preserved between calls of this custom hook
    // (all other callbacks will be recreated each hook call)
    // because it is memoized, each unique input returns
    // the exact same function
    // the inputs are determined by the array given as the second arg
    // so in this case, we just want to create this function once
    const resetPlayer = useCallback(() => {
        setPlayer({
            pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
            tetromino: randomTetromino().shape,
            collided: false
        })
    }, []);

    // we will import this hook into the tetris component
    // by returning the player setter, we can then use the return
    // value to query the player state in tetris component
    return [player, updatePlayerPos, resetPlayer, playerRotate];
}
