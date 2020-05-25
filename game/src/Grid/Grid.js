import React from 'react';
import { Button } from 'semantic-ui-react'
import Cell from './Cell.js';

const gameBoardStyle = {
  border: '2px solid rgba(255, 255, 255, 1)',
  overflow: 'hidden',
  borderRadius: '6px',
  padding: '2px'
}

const gameBoardStyleMobile = {
  border: '2px solid rgba(255, 255, 255, 1)',
  overflow: 'hidden',
  borderRadius: '6px',
  padding: '2px'
}


function Grid(props) {
  const windowSize = props.windowSize

  //OLD method for making a responsive grid
  // var aspectRatio = windowSize.width / windowSize.height
  // console.log(aspectRatio)
  // const numCols = Math.floor(windowSize.width / 25)
  // const numRows = windowSize.width < 650 ? Math.floor(numCols / aspectRatio) : Math.ceil(numCols / aspectRatio)
  // const numCells = numRows * numCols

  //Fixed grid
  const numCols = props.numCols
  const numRows = props.numRows
  const cells = props.cells
  const numCells = numRows * numCols

  var colStr = makeCols()
  function makeCols() {
    var string = ''
    for (var i = 0; i < numCols; i++) {
      string = string.concat(' 1fr')
    }
    return string
  }


  return (
    <div style={windowSize.width < 650 ? gameBoardStyleMobile : gameBoardStyle}>
      <div style={{display: 'grid', gridTemplateColumns: colStr, width: '100%', height: '100%'}}>
        {
        cells.map((cell, i) => (
          <Cell index={i} key={i} cell={cell}/>
        ))
        }
      </div>
    </div>
  );
}

export default Grid;
