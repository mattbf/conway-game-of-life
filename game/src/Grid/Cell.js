import React from 'react';
import { Button } from 'semantic-ui-react'

const cellStyle = {
  border: '0.5px solid rgba(255, 0, 0, .1)',
  borderColor: '#31393C',
  color: 'green',
  backgroundColor: 'black',
  width: '100%',
  height: '100%',
  margin: '1px',
  fontSize: 9
}

function Cell(props) {
  const windowSize = props.windowSize

  return (
    <div style={cellStyle}>
    </div>
  );
}

export default Cell;
