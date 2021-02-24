export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () => 
    Array.from(Array(STAGE_HEIGHT), () =>
        new Array(STAGE_WIDTH).fill([0, 'clear'])
    );
// this creates the initial game field
// each cell in the field contains a tuple
// the first value represents the tetrimino shape occupying the cell
// 0 means nothing in the cell
// the second tuple value tells whether the cell needs to be emptied
// because a line is full
// or if it can go untouched

// the JS object renames the parameters within the function
export const checkCollision = (player, stage, { x: moveX, y: moveY}) => {
    for (let y = 0; y < player.tetromino.length; y += 1) {
        for (let x = 0; x < player.tetromino[y].length; x += 1) {
            // 1. check that we're in a non-empty cell
            if (player.tetromino[y][x] !== 0) {
                if(
                    // 2. check the new position is within the game area's height
                    !stage[y + player.pos.y + moveY] || 
                    // 3. check we're within the game area's width
                    !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
                    // 4. check we are not colliding with a placed tetromino
                    // this is done by checking if the cell is NOT set to 'clear'
                    stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== 'clear'
                ) {
                    return true;
                }
            }
        }
    }
}