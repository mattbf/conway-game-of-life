import React, {useState, useEffect} from 'react';
import {
  Button,
  Icon,
  Select
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
  { key: 'af', value: 'af', text: 'Random' },
  { key: 'ax', value: 'ax', text: 'Shooter' },
]

function App() {
  const windowSize = useWindowSize()
  const [play, setPlay] = useState(false)
  const [configuration, setConfiguration] = useState(startConfigurations)
  //Fixed grid
  const numCols = windowSize.width < 650 ? 50 : 100
  const numRows = windowSize.width < 650 ? 25 : 50
  const numCells = numCols * numRows

  const [cellState, setCellState] = useState([])
  const [delay, setDelay] = useState(1000)

  function Engine(){
    //RULES
    //if dead and has 3 alive neighbours -> becomes alive
    //if alive and has less than 2 neighbours -> dies
    //if alive cell has over 3 neighbours -> dies
    console.log("update state")
    var newState = [...cellState]
    var newAlive = []
    var newDead = []
    var curAlive = []
    var ca = cellState.filter(c => c.alive)
    ca.forEach(c => curAlive.push(c.num))
    //console.log(curAlive)

    cellState.forEach(cell => {
      //count alive and dead neighbours

      // &&
      // var neighbours = currentState.filter(c =>
      //   c.col === cell.col || c.col === cell.col + 1 || c.col === cell.col - 1
      //   && c.row === cell.row || c.row === cell.row + 1 || c.row === cell.row - 1
      // )
      var neighbours = []
      var findN = []
      findN.push(cellState.find(c => c.col === cell.col - 1 && c.row === cell.row + 1)) //top left neighbour
      findN.push(cellState.find(c => c.col === cell.col && c.row === cell.row + 1)) //top center neighbour
      findN.push(cellState.find(c => c.col === cell.col + 1 && c.row === cell.row + 1)) //top right neighbour
      findN.push(cellState.find(c => c.col === cell.col - 1 && c.row === cell.row)) // left neighbour
      findN.push(cellState.find(c => c.col === cell.col + 1 && c.row === cell.row)) // right neighbour
      findN.push(cellState.find(c => c.col === cell.col - 1 && c.row === cell.row - 1)) //bottom left neighbour
      findN.push(cellState.find(c => c.col === cell.col && c.row === cell.row - 1)) //bottom center neighbour
      findN.push(cellState.find(c => c.col === cell.col + 1 && c.row === cell.row - 1)) //bottom right neighbour
      neighbours = findN.filter(n => n !== undefined)
      var nAlive = neighbours.filter(n => n.alive)
      var nDead = neighbours.filter(n => !n.alive)

      if(cell.alive){
        //cell is ALIVE
        //console.log(cell.num + " is alive and has " + nAlive.length + " alive neighbours")
        //console.log(nAlive.length < 2)
        //console.log(nAlive.length > 3)
        if(nAlive.length < 2){
          //console.log("killing cell " + cell.num)
          newDead.push(cell.num)
          newState = [...newState.map(c => (c.num === cell.num ? { ...c, alive: false } : c))]
        } else if(nAlive.length > 3){
          newDead.push(cell.num)
          //console.log("killing cell " + cell.num)
          newState = [...newState.map(c => (c.num === cell.num ? { ...c, alive: false } : c))]
        }
      } else {
        //cell is DEAD
        if(nAlive.length === 3) {
          newAlive.push(cell.num)
          //console.log(cell.num + " has " + nAlive.length + " neighbours")
          //console.log("making cell " + cell.num + " alive")
          newState = [...newState.map(c => (c.num === cell.num ? { ...c, alive: true } : c))]
        }
      }
      //console.log('cell ' + cell.num + " has " + nAlive.length + " alive and " + nDead.length +" dead neighbours ")
      //console.log(neighbours)
    })
    //console.log(newState)
    //return newState
    //callback(newState)
    //return { newState, newAlive, newDead }

    setCellState(newState)
  }

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
        alive: Math.random() < 0.05 ? true : false
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
