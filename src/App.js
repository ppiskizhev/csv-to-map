import React, { Component } from 'react';
import styled from 'styled-components';
import SideBar from './components/SideBar';
import Map from './components/Map';

const AppFrame = styled.div`
  display: flex;
  height: 100%;
`;

class App extends Component {
  render() {
    return (
      <AppFrame>
        <SideBar />
        <Map />
      </AppFrame>
    );
  }
}

export default App;