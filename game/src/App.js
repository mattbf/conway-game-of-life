import React, {useState, useEffect} from 'react';
import {
  Button,
  Icon,
  Select
} from 'semantic-ui-react'
import useWindowSize from './Utils/useWindowSize';
import Grid from './Grid/Grid.js';

import { NextState } from './Engine/Engine.js'

const mainStyle = {
  backgroundColor: '#383838',
  width: '100%',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px',
  color: '#FFFFFF',
};

const mainStyleMobile = {
  backgroundColor: '#383838',
  width: '100%',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px',
  color: '#FFFFFF',
};

const gameBoardStyle = {

}
const controls = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  marginBottom: '10px'
}

const startConfigurations = [
  { key: 'af', value: 'af', text: 'Random' },
  { key: 'ax', value: 'ax', text: 'Shooter' },
]

function App() {
  const windowSize = useWindowSize()
  const [play, setPlay] = useState(false)
  const [configuration, setConfiguration] = useState(startConfigurations)
  //Fixed grid
  const numCols = windowSize.width < 650 ? 50 : 10
  const numRows = windowSize.width < 650 ? 25 : 5
  const numCells = numCols * numRows

  const [cellState, setCellState] = useState([])


  //load the grid/cell state
  useEffect(() => {
    var mobile = windowSize.width < 650 ? true : false
    var cells = []
    //create the cell state based on grid size
    for (var i = 0; i < numCells; i++) {
    	cells.push({
        num: i,
        col: i % numCols,
        row: Math.round(i / numCols),
        alive: Math.random() < 0.1 ? true : false
      })
    }
    setCellState(cells)
    console.log(cells)

    if(!mobile){
      //desktop

    } else {
      //mobile

    }
  }, [windowSize.width])

  function UpdateGrid(){
    var nextCells = NextState(cellState, numCols, numRows)
    setCellState(nextCells)
  }

  //run the engine
  useEffect(() => {
    console.log("play changed")
    if(play){
      console.log("start the game")
      var game = setInterval(() => {UpdateGrid()}, 1000);
    } else {
      console.log("pause the game")
      clearInterval(game)
    }
    return () => clearInterval(game);
  }, [play])

  return (
    <div style={windowSize.width < 650 ? mainStyleMobile : mainStyle}>
    <h1> Conway Game of Life </h1>
    <p> <a href='https://en.wikipedia.org/wiki/John_Horton_Conway' target="_blank"> John Conway </a> was a mathematician most famous for his <span style={{fontStyle: 'italic'}}> Game of Life. </span> </p>
      <div style={{
        border: '2px solid rgba(255, 255, 255, 1)',
        width: windowSize.width < 650 ? '95%' : '75%',
        maxWidth: 1000,
        minHeight: windowSize.width < 650 ? 300 : 500,
        borderRadius: '6px',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
      <div style={controls}>
      <Select placeholder='Default start' options={configuration} />
      <Button icon onClick={() => setPlay(!play)}>
        {
          play ?
          <Icon name='pause'/>
          :
          <Icon name='caret right'/>
        }
      </Button>
      </div>
      <Grid windowSize={windowSize} numCols={numCols} numRows={numRows} cells={cellState}/>
      </div>
    </div>
  );
}

export default App;
