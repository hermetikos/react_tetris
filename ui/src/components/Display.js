import React from 'react';

import { StyledDisplay } from "./styles/StyledDisplay";

// Display represents the UI
const Display = ({ gameOver, text }) => (
    <StyledDisplay gameOver={gameOver}>{text}</StyledDisplay>
)

export default Display;