export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () => 
    Array.from(Array(STAGE_HEIGHT), () =>
        new Array(STAGE_WIDTH).fill([0, 'clear'])
    )
// this creates the initial game field
// each cell in the field contains a tuple
// the first value represents the tetrimino shape occupying the cell
// 0 means nothing in the cell
// the second tuple value tells whether the cell needs to be emptied
// because a line is full
// or if it can go untouched