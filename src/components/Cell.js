import React from 'react';

import {TETROMINOS} from "../tetrominos";

import {StyledCell} from './styles/StyledCell';

const Cell = ({ type }) => (
    <StyledCell type={'L'} color={TETROMINOS['L'].color} />
)

export default Cell;