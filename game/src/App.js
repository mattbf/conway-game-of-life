import React, {useState, useEffect} from 'react';
import {
  Button,
  Icon,
  Select,
  Dropdown
} from 'semantic-ui-react'
import useWindowSize from './Utils/useWindowSize';
import Grid from './Grid/Grid.js';

import {useInterval} from './Utils/useInterval'

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
  {key: 0, value: 0, text: 'Random' },
  {key: 1, value: 1, text: 'Shooter' },
]

const spaceship = [
  "..........*.......*.........",
  "....**.*.*.**...**.*.*.**...",
  ".***.*.***.........***.*.***",
  ".*...*.*.....*.*.....*.*...*",
  ".....**......*.*......**....",
  "..**.........*.*.........**.",
  "..**.**...............**.**.",
  "......*...............*.....",
]

function App() {
  const windowSize = useWindowSize()
  const [play, setPlay] = useState(false)
  const [configuration, setConfiguration] = useState({key: 0, value: 0, text: 'Random' })
  //Fixed grid
  const numCols = windowSize.width < 650 ? 50 : 100
  const numRows = windowSize.width < 650 ? 25 : 50
  const numCells = numCols * numRows

  const [cellState, setCellState] = useState([])
  const [delay, setDelay] = useState(100)

  const startingStates = [
    {name: "Random", state: []},
    {name: "Shooter", state: []}
  ]

  const resetGrid = () => {
    var startIndex = startingStates.findIndex(s => s.name === "Random")
    setCellState(startingStates[0].state)
  }

  //take a starting pattern in . + * strings and convert to grid cell state
  const patternToCellState = (patternArray) => {
    var cellState = []
    patternArray.forEach(line => {
      var chars = line.split('')
      chars.forEach((c, i) => {
        if(c === "*"){
          cellState.push({
            num: i,
            col: i % numCols,
            row: Math.round(i / numCols),
            alive: true
          })
        } else {
          cellState.push({
            num: i,
            col: i % numCols,
            row: Math.round(i / numCols),
            alive: false
          })
        }
      })
    })
    return cellState
  }

  var spaceShipCellState = patternToCellState(spaceship)
  useEffect(() => {
    console.log(spaceShipCellState)
  }, [spaceShipCellState])


  //create starting states
  useEffect(() => {
    //random state
    var cells = []
    //create the cell state based on grid size
    for (var i = 0; i < numCells; i++) {
    	cells.push({
        num: i,
        col: i % numCols,
        row: Math.round(i / numCols),
        alive: Math.random() < 0.05 ? true : false
      })
    }
    startingStates[0].state = cells
  }, [configuration])

  //load the intial grid/cell state
  useEffect(() => {
    var mobile = windowSize.width < 650 ? true : false
    var cells = []
    //create the cell state based on grid size
    for (var i = 0; i < numCells; i++) {
    	cells.push({
        num: i,
        col: i % numCols,
        row: Math.round(i / numCols),
        alive: Math.random() < 0.25 ? true : false
      })
    }
    setCellState(cells)
    console.log(cells)

    if(!mobile){
      //desktop

    } else {
      //mobile

    }
  }, [])

  //Control the engine
  useInterval(() => {
    setCellState(NextState(cellState))
  }, play ? delay : null);

  //change starting configuration
  const handleChangeStart = (e, { value }) => setConfiguration({ value })

  return (
    <div style={windowSize.width < 650 ? mainStyleMobile : mainStyle}>
    <h1> Conway Game of Life </h1>
    <p> <a href='https://en.wikipedia.org/wiki/John_Horton_Conway' target="_blank" style={{color: '#3CFF72'}}> John Conway </a> was a mathematician most famous for his <span style={{fontStyle: 'italic'}}> Game of Life. </span> </p>
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
      <div></div>
      <div>

        <Button icon onClick={() => setPlay(!play)}>
          {
            play ?
            <Icon name='pause'/>
            :
            <Icon name='caret right'/>
          }
        </Button>
      </div>
      </div>
      <Grid windowSize={windowSize} numCols={numCols} numRows={numRows} cells={cellState}/>
      </div>
    </div>
  );
}

export default App;


// <Dropdown
//   options={startConfigurations}
//   value={configuration.text}
//   onChange={handleChangeStart}
//   selection
// />
//
// <Button icon onClick={() => resetGrid()}>
//   <Icon name='undo'/>
// </Button>
