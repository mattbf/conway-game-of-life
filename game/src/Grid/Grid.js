import React from 'react';
import { Button } from 'semantic-ui-react'
import Cell from './Cell.js';

const gameBoardStyle = {
  width: '65%',
  maxWidth: 750,
  border: 'solid',
  borderColor: 'white',
  minHeight: 400,
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',

}

const gameBoardStyleMobile = {
  width: '95%',
  border: 'solid',
  borderColor: 'white',
  minHeight: 400,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'start'

}

function Grid(props) {
  const windowSize = props.windowSize
  const numCells = 120

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
