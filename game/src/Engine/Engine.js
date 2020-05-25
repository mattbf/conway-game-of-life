
//Takes state, runs through rule algorithm and then returns the next state

function cellNeighbours(cell, gridSize){
  var above
  var below
  var left
  var right

  var nAliveCount
  var nDeadCount





  return { above, below, left, right, nAliveCount, nDeadCount}
}

function NextState(currentState, cols, rows){
  //RULES
  //if dead and has 3 alive neighbours -> becomes alive
  //if alive and has less than 2 neighbours -> dies
  //if alive cell has over 3 neighbours -> dies

  currentState.forEach(cell => {
    //count alive and dead neighbours

    // &&
    // var neighbours = currentState.filter(c =>
    //   c.col === cell.col || c.col === cell.col + 1 || c.col === cell.col - 1
    //   && c.row === cell.row || c.row === cell.row + 1 || c.row === cell.row - 1
    // )
    var neighbours = []
    var findN = []
    findN.push(currentState.find(c => c.col === cell.col - 1 && c.row === cell.row + 1)) //top left neighbour
    findN.push(currentState.find(c => c.col === cell.col && c.row === cell.row + 1)) //top center neighbour
    findN.push(currentState.find(c => c.col === cell.col + 1 && c.row === cell.row + 1)) //top right neighbour
    findN.push(currentState.find(c => c.col === cell.col - 1 && c.row === cell.row)) // left neighbour
    findN.push(currentState.find(c => c.col === cell.col + 1 && c.row === cell.row)) // right neighbour
    findN.push(currentState.find(c => c.col === cell.col - 1 && c.row === cell.row - 1)) //bottom left neighbour
    findN.push(currentState.find(c => c.col === cell.col && c.row === cell.row - 1)) //bottom center neighbour
    findN.push(currentState.find(c => c.col === cell.col + 1 && c.row === cell.row - 1)) //bottom right neighbour
    neighbours = findN.filter(n => n !== undefined)
    console.log('cell ' + cell.num + " has neighbours ")
    console.log(neighbours)
  })

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
