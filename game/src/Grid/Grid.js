import React from 'react';
import { Button } from 'semantic-ui-react'
import Cell from './Cell.js';

const gameBoardStyle = {
  width: '75%',
  maxWidth: 1000,
  border: 'solid',
  borderColor: 'white',
  minHeight: 500,
  overflow: 'hidden'
}

const gameBoardStyleMobile = {
  width: '95%',
  border: 'solid',
  borderColor: 'white',
  minHeight: 400,
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
  const numCols = 100
  const numRows = 50
  const numCells = numRows * numCols

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
      <div style={{display: 'grid', gridTemplateColumns: colStr, width: '100%', height: '100%'}}>
        {
        cells.map((cell, i) => (
          <Cell index={i} key={i} alive={Math.round(Math.random()) === 1 ? true : false}/>
        ))
        }
      </div>
    </div>
  );
}

export default Grid;
