import { useState, useEffect } from "react";

import { createStage } from "../gameHelpers";

export const useStage = (player, resetPlayer) => {
    const [stage, setStage] = useState(createStage());
    // used to count number of cleared rows (used to compute score)
    const [rowsCleared, setRowsCleared] = useState(0);

    // useEffect is used to allow you to make changes due to side effects
    // basically, hooks try to avoid side effects, but it isn't quite possible
    // to eliminate them
    // useEffect takes a callback and a list of dependancies
    // if you omit the dependancies, this callback will fire after every render
    // otherwise, it will fire after a render IF a dependancy changes
    useEffect(() => {
        setRowsCleared(0);

        // this function clears out complete rows
        const sweepRows = newStage => 
            // we use the reduce method
            newStage.reduce((acc, row) => {
                // a row in the stage is filled if all values are greater than 0
                // so we search the row for 0
                // if there are no 0s, clear the cell
                if(row.findIndex(cell => cell[0] === 0) === -1) {
                    // also increment the number of rows we've cleared
                    setRowsCleared(prev => prev + 1);
                    // here we create a new, empty row
                    // which we use unshift to add it to the top of the stage
                    acc.unshift(new Array(newStage[0].length).fill([0, 'clear']));
                    return acc;
                }
                // if the row isn't filled, just return the current row
                acc.push(row);
                return acc;
        }, [])

        const updateStage = prevStage => {
            // first we clear the stage so we can rewrite new data to it
            const newStage = prevStage.map(row =>
                // if the cell is marked as clear, we need to clear it
                // this is done by putting 0, the 'no tetromino' marker
                // otherwise, just replace it with the same cell value
                row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell))
            );

            // then we draw the tetromino
            // player basically refers to the current falling game piece
            // so this splices in the current falling tetrimino into the grid
            // in the appropriate position
            player.tetromino.forEach((row, y) => {
                row.forEach((value, x) => {
                    // we skip values that are 0, which are blank
                    // values in the tetromino
                    if(value !== 0) {
                        newStage[y + player.pos.y][x + player.pos.x] = [
                            value,
                            `${player.collided ? 'merged' : 'clear'}`
                        ]
                    }
                });
            });

            // do collision detection
            // if the current falling piece collided with something, 
            // we should stop moving the current piece
            // and bring a new one to the top of the play field
            if (player.collided) {
                resetPlayer();
                // additionally, now would be the time where we would check if
                // we need to clear rows
                return sweepRows(newStage);
            }

            return newStage;
        }

        // call the stage setter using the above instructions
        setStage(prev => updateStage(prev))
    }, [player, player.collided]);

    // this hook will allow us to both read and alter the stage state
    // so return both the getter and the setter
    return [stage, setStage];
}
