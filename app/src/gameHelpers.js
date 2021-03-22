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
                console.log(`new x: ${x + player.pos.x + moveX} new y: ${y + player.pos.y + moveY}`)
                const newX = x + player.pos.x + moveX;
                const newY = y + player.pos.y + moveY;
                if(
                    // 2. check the new position is within the game area's height
                    !stage[newY] || 
                    // newY >= 0 && newY < stage.length &&
                    // 3. check we're within the game area's width
                    !stage[newY][newX] ||
                    // newX >= 0 && newX < stage[0].length &&
                    // 4. check we are not colliding with a placed tetromino
                    // this is done by checking if the cell is NOT set to 'clear'
                    stage[newY][newX][1] !== 'clear'
                ) {
                    return true;
                }
            }
        }
    }
}