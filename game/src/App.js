import React, {useState} from 'react';
import {
  Button,
  Icon,
  Select
} from 'semantic-ui-react'
import useWindowSize from './Utils/useWindowSize';
import Grid from './Grid/Grid.js';

const mainStyle = {
  backgroundColor: '#383838',
  width: '100%',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px'
};

const mainStyleMobile = {
  backgroundColor: '#383838',
  width: '100%',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px'
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
  { key: 'af', value: 'af', text: 'Afghanistan' },
  { key: 'ax', value: 'ax', text: 'Aland Islands' },
  { key: 'al', value: 'al', text: 'Albania' },
]

function App() {
  const windowSize = useWindowSize()
  const [play, setPlay] = useState(false)

  return (
    <div style={windowSize.width < 650 ? mainStyleMobile : mainStyle}>
    <h1> Conway Game of Life </h1>
    <p> lfdksjhl;asdjflkjasdl;fj ljsdkl; jskfjdsahfk ashfsdf h hsfkh k  sdkfhadlskfshdh ka </p>
      <div style={{
        border: '2px solid rgba(255, 255, 255, 1)',
        width: windowSize.width < 650 ? '95%' : '75%',
        maxWidth: 1000,
        minHeight: 500,
        borderRadius: '6px',
        padding: '10px  '
      }}>
      <div style={controls}>
      <Select placeholder='Select your country' options={startConfigurations} />
      <Button icon>
        {
          play ?
          <Icon name='pause' />
          :
          <Icon name='caret right' />
        }
      </Button>
      </div>
      <Grid windowSize={windowSize}/>
      </div>
    </div>
  );
}

export default App;
