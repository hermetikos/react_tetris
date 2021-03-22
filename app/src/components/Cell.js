import React from 'react';

import {TETROMINOS} from "../tetrominos";

import {StyledCell} from './styles/StyledCell';

// cell is a simply a styled div element representing a cell in the grid
const Cell = ({ type }) => (
    <StyledCell type={type} color={TETROMINOS[type].color} />
)

export default Cell;
