import React, { useState }from 'react';
import { Button } from 'semantic-ui-react'

//border: '0.5px solid rgba(0, 0, 0, 0.5)',

function Cell(props) {
  const windowSize = props.windowSize
  const cell = props.cell

  return (
    <div style={{
      backgroundColor: cell.alive ? "#3CFF72" : "black",
      color: 'green',
      width: '8px',
      height: '8px',
      margin: '1px',
      fontSize: 9,
    }}>
    </div>
  );
}

export default Cell;
