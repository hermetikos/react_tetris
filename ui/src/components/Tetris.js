import React, { useState } from 'react';

// components
import { createStage, checkCollision } from '../gameHelpers';
import Stage from './Stage';
import Display from './Display';
import StartButton from "./StartButton";
// styling
import { StyledTetris, StyledTetrisWrapper } from "./styles/StyledTetris";

// custom hooks
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";
import { useInterval } from "../hooks/useInterval";
import { useGameStatus } from "../hooks/useGameStatus";

const Tetris = ({ type }) => {
    // a hook used to alter speed the tetromino drops at
    const [dropTime, setDropTime] = useState(null);
    // a hook to get/set the gameover state
    const [gameOver, setGameOver] = useState(false);

    // get the getters/setters from our custom hooks
    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
    const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
    const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
        rowsCleared
    );

    console.log('re-rendered game');

    // a callback that manages user keypresses
    const move = ({ keyCode }) => {
        // these controls hold during gameplay,
        // so check if we're in game over
        if(!gameOver) {
            // left arrow
            if (keyCode === 37) {
                // move left
                movePlayer(-1);
            }
            // right arrow
            else if (keyCode === 39) {
                // move right
                movePlayer(1);
            }
            // down key
            else if (keyCode === 40) {
                // drop the piece
                dropPlayer();
            }
            // up key
            else if (keyCode === 38) {
                playerRotate(stage, 1);
            }
        }
    }

    // update the position of the falling teromino
    const movePlayer = dir => {
        // only move if we aren't colliding with anything
        if (!checkCollision(player, stage, {x: dir, y: 0})) {
            updatePlayerPos({ x: dir, y: 0 });
        }
    }

    const startGame = () => {
        // reset everything

        // clear the stage
        setStage(createStage());
        setDropTime(1000);
        // bring a new piece to the top of the stage
        resetPlayer();
        // set game over to false
        setGameOver(false);
        // reset score
        setScore(0);
        setRows(0);
        setLevel(0);
    }

    // attempt to drop the tetromino down one level
    const drop = () => {
        // increase level when player has cleared 10 rows
        if (rows > (level + 1) * 10) {
            setLevel(prev => prev + 1);
            setDropTime(1000 / (level + 1) + 200);
        }

        // if the space below is free...
        if(!checkCollision(player, stage, { x: 0, y: 1})) {
            // move the piece down
            updatePlayerPos({
            x: 0, y: 1,
            collided: false
            });
        // otherwise...
        } else {
            // if we have stacked pieces up to the top
            // (that is, position 0 in the stage grid)...
            if (player.pos.y < 1) {
                // we are in the game over state
                console.log("Game Over");
                setGameOver(true);
                // we should also clear the drop time
                setDropTime(null);
            }

            // if nothing else holds, that means this piece has
            // been obstructed and should stop moving
            updatePlayerPos({ x: 0, y: 0, collided: true});
        }
    }

    // this resets the drop speed if we release the down key
    const keyUp = ({keyCode}) => {
        if(!gameOver) {
            if (keyCode === 40) {
                console.log("Interval On");
                setDropTime(1000 / (level + 1) + 200);
            }
        }
    }

    const dropPlayer = () => {
        // while we manually drop pieces, we want to stop the timed drop
        console.log("Interval Off");
        setDropTime(null);
        drop();
    }

    // 
    useInterval(() => {
        drop();
    }, dropTime);

    return (
        <StyledTetrisWrapper role="button" tabIndex="0"
            onKeyDown={e => move(e)}
            onKeyUp={keyUp}
            >
            {/*
                role="button" is used to identify the purpose of the element
                notably accessibility software
                tabIndex="0"
                tab index sets the order which tabbing accesses elements
                -1 means inaccessible through tab
                0 is the first tabable element
                and then any positive int is visited in order
                (so tab item 3 comes after 0 but before 5)

                Note we use the wrapper because since it is the top element,
                it allows us to click anywhere in the screen to capture input
                rather than a specific element
            */}
            <StyledTetris>
                <Stage stage={stage}/>
                <aside>
                    {gameOver ? (
                        <Display gameOver={gameOver} text="Game Over" />
                    ) : (
                        <div>
                            <Display text={`score: ${score}`}/>
                            <Display text={`rows: ${rows}`} />
                            <Display text={`level: ${level}`} />
                        </div>
                    )}
                    
                    <StartButton callback={startGame}/>
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    )
}

export default Tetris;