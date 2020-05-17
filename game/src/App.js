import React from 'react';
import { Button } from 'semantic-ui-react'
import useWindowSize from './Utils/useWindowSize';
import Grid from './Grid/Grid.js';

const mainStyle = {
  backgroundColor: 'blue',
  width: '100%',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

const mainStyleMobile = {
  backgroundColor: 'green',
  width: '100%',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

const gameBoardStyle = {

}

function App() {
  const windowSize = useWindowSize()

  return (
    <div style={windowSize.width < 650 ? mainStyleMobile : mainStyle}>
      Conway Game
      <Button> Hello </Button>
      <Grid windowSize={windowSize}/>
    </div>
  );
}

export default App;
