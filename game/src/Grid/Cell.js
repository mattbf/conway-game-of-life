import React from 'react';
import { Button } from 'semantic-ui-react'

const cellStyle = {
  border: 'solid',
  borderColor: 'grey',
  color: 'green',
  backgroundColor: 'black',
  width: '20px',
  height: '20px',
  margin: '1px'
}

function Cell(props) {
  const windowSize = props.windowSize

  return (
    <div style={cellStyle}>

    </div>
  );
}

export default Cell;
