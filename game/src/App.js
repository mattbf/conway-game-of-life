import React, {useState} from 'react';
import { Button, Icon } from 'semantic-ui-react'
import useWindowSize from './Utils/useWindowSize';
import Grid from './Grid/Grid.js';

const mainStyle = {
  backgroundColor: '#313131',
  width: '100%',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

const mainStyleMobile = {
  backgroundColor: '#313131',
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
  const [play, setPlay] = useState(false)

  return (
    <div style={windowSize.width < 650 ? mainStyleMobile : mainStyle}>
      Conway Game
      <Button icon>
        {
          play ?
          <Icon name='pause' />
          :
          <Icon name='caret right' />
        }
      </Button>
      <Grid windowSize={windowSize}/>
    </div>
  );
}

export default App;
