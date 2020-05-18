import React from 'react';
import { Button } from 'semantic-ui-react'
import Cell from './Cell.js';

const gameBoardStyle = {
  width: '65%',
  maxWidth: 750,
  border: 'solid',
  borderColor: 'white',
  minHeight: 400,
}

const gameBoardStyleMobile = {
  width: '95%',
  border: 'solid',
  borderColor: 'white',
  minHeight: 400,
}


function Grid(props) {
  const windowSize = props.windowSize
  var aspectRatio = windowSize.width / windowSize.height

  console.log(aspectRatio)

  console.log( windowSize)
  const numCols = Math.floor(windowSize.width / 25)
  console.log(numCols)
  const numRows = windowSize.width < 650 ? Math.floor(numCols / aspectRatio) : Math.ceil(numCols / aspectRatio)
  console.log(numRows)
  const numCells = numRows * numCols
  //Set the grid column settings based on the number of columns
  var colStr = makeCols()
  function makeCols() {
    var string = ''
    for (var i = 0; i < numCols; i++) {
      string = string.concat(' 1fr')
    }
    return string
  }

  var cells = [];
  for (var i = 0; i < numCells; i++) {
  	cells.push({
      num: i,
    })
  }

  return (
    <div style={windowSize.width < 650 ? gameBoardStyleMobile : gameBoardStyle}>
      <h4> Cells: {numCells} = {numCols} x {numRows} </h4>
      <div style={{display: 'grid', gridTemplateColumns: colStr, width: '100%', height: '100%'}}>
        {
        cells.map((cell, i) => (
          <Cell index={i} key={i} />
        ))
        }
      </div>
    </div>
  );
}

export default Grid;
