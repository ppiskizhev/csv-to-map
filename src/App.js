import React, { Component } from 'react';
import Papa from 'papaparse';
import styled from 'styled-components';
import SideBar from './components/SideBar';
import Map from './components/Map';

const AppFrame = styled.div`
  display: flex;
  height: 100%;
`;

const palette = ['#f48c42', '#1edb63'];

class App extends Component {
  state = { 
    files: {}
  }

  handleAddFiles = data => {
    const updateState = (file, name, index) => {
      const coords = file.data.filter(item => Number(item[0])).map(item => [Number(item[1]), Number(item[0])]);

      const newFile = {
        coords,
        isActive: false,
        color: palette[index]
      };

      const updatedFiles = {
        ...this.state.files, 
        [name]: newFile
      };

      this.setState({
        files: updatedFiles
      });
    }

    Object.keys(data).forEach((number, index) => {
      const name = data[number].name;
      Papa.parse(data[number], {
        complete: result => {
          updateState(result, name, index);
        }
      });
    });
  }

  handleToggle = name => {
    const files = {...this.state.files};
    files[name].isActive = !files[name].isActive;
    this.setState({ files });
  }

  handleDelete = name => {
    const files = {...this.state.files};
    delete files[name];
    this.setState({ files });
  }

  render() {
    return (
      <AppFrame>
        <SideBar 
          files={this.state.files}
          onAddFiles={this.handleAddFiles}
          handleDelete={this.handleDelete}
          handleToggle={this.handleToggle}            
        />
        <Map files={this.state.files} />
      </AppFrame>
    );
  }
}

export default App;