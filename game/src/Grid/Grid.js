import React from 'react';
import { Button } from 'semantic-ui-react'
import Cell from './Cell.js';



function Grid(props) {
  const windowSize = props.windowSize

  const numRows = 2
  const numCols = 120
  const numCells = numRows * numCols
  var colStr = makeCols()

  function makeCols() {
    var string = '1fr'
    for (var i = 0; i <= numCells; i++) {
      string = string.concat(' 1fr')
    }
    return string
  }

  const gameBoardStyle = {
    width: '65%',
    maxWidth: 750,
    border: 'solid',
    borderColor: 'white',
    minHeight: 400,
    display: 'grid',
    gridTemplateColumns: colStr
  }

  const gameBoardStyleMobile = {
    width: '95%',
    border: 'solid',
    borderColor: 'white',
    minHeight: 400,
    display: 'grid',
    gridTemplateColumns: colStr

  }


  var cells = [];
  for (var i = 0; i <= numCells; i++) {
  	cells.push({
      num: i,
    })
  }

  return (
    <div style={windowSize.width < 650 ? gameBoardStyleMobile : gameBoardStyle}>
      {
      cells.map((cell, i) => (
        <Cell index={i} key={i} />
      ))
      }
    </div>
  );
}

export default Grid;
