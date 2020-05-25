
//Takes state, runs through rule algorithm and then returns the next state

function cellNeighbours(cell, gridSize){
  var above
  var below
  var left
  var right



  return { above, below, left, right}
}

function NextState(currentState, cols, rows){
  console.log("using next state to update cells")
  //var mobile = windowSize.width < 650 ? true : false
  var cells = []
  //create the cell state based on grid size
  for (var i = 0; i < currentState.length; i++) {
    cells.push({
      num: i,
      col: i % cols,
      row: Math.round(i / cols),
      alive: Math.random() < 0.1 ? true : false
    })
  }


  return cells
}


export { NextState }
