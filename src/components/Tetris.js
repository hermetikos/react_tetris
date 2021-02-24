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

const Tetris = ({ type }) => {
    // a hook used to alter speed the tetromino drops at
    const [dropTime, setDropTime] = useState(null);
    // a hook to get/set the gameover state
    const [gameOver, setGameOver] = useState(false);

    // get the getters/setters from our custom hooks
    const [player, updatePlayerPos, resetPlayer] = usePlayer();
    const [stage, setStage] = useStage(player, resetPlayer);

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
        setStage(createStage());
        resetPlayer();
        setGameOver(false);
    }

    // drop the tetromino to the base
    const drop = () => {
      if(!checkCollision(player, stage, { x: 0, y: 1})) {
        updatePlayerPos({
          x: 0, y: 1,
          collided: false
        });
      } else {
        if (player.pos.y < 1) {
          console.log("Game Over");
          setGameOver(true);
          setDropTime(null);
        }

        updatePlayerPos({ x: 0, y: 0, collided: true});
      }
        
    }

    const dropPlayer = () => {
        drop();
    }

    return (
        <StyledTetrisWrapper role="button" tabIndex="0"
            onKeyDown={e => move(e)}>
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
                            <Display text="score" />
                            <Display text="rows" />
                            <Display text="level" />
                        </div>
                    )}
                    
                    <StartButton callback={startGame}/>
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    )
}

export default Tetris;