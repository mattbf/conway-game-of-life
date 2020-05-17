import React from 'react';
import { Button } from 'semantic-ui-react'
import useWindowSize from './Utils/useWindowSize';

const mainStyle = {
  backgroundColor: 'blue',
  width: '100%',
  height: '100vh',
};

const mainStyleMobile = {
  backgroundColor: 'green',
  width: '100%',
  height: '100vh',
};

const gameBoardStyle = {

}

function App() {
  const windowSize = useWindowSize()

  return (
    <div style={windowSize.width < 650 ? mainStyleMobile : mainStyle}>
      Conway Game
      <Button> Hello </Button>
    </div>
  );
}

export default App;
