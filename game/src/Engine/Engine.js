
//Takes state, runs through rule algorithm and then returns the next state

function NextState(currentState){
  //RULES
  //if dead and has 3 alive neighbours -> becomes alive
  //if alive and has less than 2 neighbours -> dies
  //if alive cell has over 3 neighbours -> dies
  console.log("update state")
  var newState = [...currentState]
  var newAlive = []
  var newDead = []
  var curAlive = []
  var ca = currentState.filter(c => c.alive)
  ca.forEach(c => curAlive.push(c.num))
  console.log(curAlive)

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
  return newState
  //callback(newState)
  //return { newState, newAlive, newDead }
}


export { NextState }
