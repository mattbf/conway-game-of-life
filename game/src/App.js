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
    console.log("this pattern is " + patternArray.length + " rows by ")
    var cellState = []
    var width //width of the pattern
    var startX = 0
    var startY = 0

    //fill in a rows and columns with dead cells to center pattern
    // for (var y = 0; y < startY; y++){
    //
    // }
    // for (var x = 0; x < startX; x++){
    //   cellState.push({
    //     num: j,
    //     col: j % numCols,
    //     row: Math.round(j / numCols),
    //     alive: false
    //   });
    // }
    patternArray.forEach(line => {
      var chars = line.split('')
      width  = chars.length
      console.log(width + " columns")
      var row = 1
      console.log(row)
      var startX = 10
      var startY = 0
      chars.forEach((c, index) => {
        switch(startY) {
          case startY !== 0:
            //fill in the top starting rows
            for(var y = startY; y > 0; y--){
              for(var c = 0; c < numCols; c++){
                cellState.push({
                  num: c,
                  col: c % numCols,
                  row: Math.round(c / numCols),
                  alive: false
                })
              }
            }
            break;
          case startY ===0:
              var i = startX + index
              //console.log(i + " is less than " + width)
              //add pattern, dead or alive
              if(i !== startX + width - 1){
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
              } else {
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
                console.log("end of row")
                //fill in the rest of the row
                var fillRow = numCols - width
                var start = row * 100 - 72
                var loopend = start + fillRow
                for (var j = start; j < loopend; j++){
                  cellState.push({
                    num: j,
                    col: j % numCols,
                    row: Math.round(j / numCols),
                    alive: false
                  });
                }
              }
              row ++
            break;
        }
      })

    })
    console.log(cellState.length)

    //fill in the rest if the state
    if(cellState.length < numCells){
      var difference = numCells - cellState.length
      for( var i=0; i < difference; i++){
        cellState.push({
          num: i,
          col: i % numCols,
          row: Math.round(i / numCols),
          alive: false
        })
      }
    }

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
    //setCellState(cells)
    setCellState(spaceShipCellState)
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
