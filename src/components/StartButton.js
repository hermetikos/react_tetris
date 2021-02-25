import React from 'react';

import { StyledStartButton } from "./styles/StyledStartButton";

// A button that starts a new game
const StartButton = ({ callback }) => (
    <StyledStartButton onClick={callback}>Start Game</StyledStartButton>
)

export default StartButton;
