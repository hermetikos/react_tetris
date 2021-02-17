import React, { useState } from 'react';

// components
import { createStage } from '../gameHelpers';
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
    const [player] = usePlayer();
    const [stage, setStage] = useStage();

    console.log('re-rendered game');

    return (
        <StyledTetrisWrapper>
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
                    )
                    }
                    
                    <StartButton />
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    )
}

export default Tetris;