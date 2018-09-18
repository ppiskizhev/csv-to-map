import React, { Component } from 'react';
import Papa from 'papaparse';
import styled from 'styled-components';
import SideBar from './components/SideBar';
import Map from './components/Map';

const AppFrame = styled.div`
  display: flex;
  height: 100%;
`;

class App extends Component {
  state = {
    files: {},
  };

  componentDidMount = () => {
    this.getFromLocalStorage('files');
  };

  getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  updateState = (file, name) => {
    const color = this.getRandomColor();
    const geoData = file.data.filter(item => Number(item[0])).map(item => ({
      coords: [parseFloat(item[1]), parseFloat(item[0])],
      partner: item[2],
      address: item[4],
      weight: Math.round(parseFloat(item[5]) * 10) / 10,
      sum: Math.round(parseFloat(item[7].replace(/\s/g, '')) * 10) / 10,
      task: item[8],
    }));

    console.log('data', geoData);

    const newFile = {
      geoData,
      color,
      isActive: false,
    };

    const updatedFiles = {
      ...this.state.files,
      [name]: newFile,
    };

    this.setState({
      files: updatedFiles,
    });

    localStorage.setItem('files', JSON.stringify(updatedFiles));
  };

  parseData = data => {
    Object.keys(data).forEach(number => {
      const name = data[number].name.replace('.csv', '');

      if (!this.state.files.hasOwnProperty(name)) {
        Papa.parse(data[number], {
          complete: result => {
            this.updateState(result, name);
          },
        });
      }
    });
  };

  handleToggle = name => {
    const files = { ...this.state.files };
    files[name].isActive = !files[name].isActive;
    this.setState({ files });
    localStorage.setItem('files', JSON.stringify(files));
  };

  handleDelete = name => {
    const files = { ...this.state.files };
    delete files[name];
    this.setState({ files });
    localStorage.setItem('files', JSON.stringify(files));
  };

  getFromLocalStorage = key => {
    let value = localStorage.getItem(key) || {};
    try {
      value = JSON.parse(value);
      this.setState({ [key]: value });
    } catch (e) {
      this.setState({ [key]: {} });
    }
  };

  render() {
    return (
      <AppFrame>
        <SideBar
          files={this.state.files}
          handleAddFiles={this.parseData}
          handleDelete={this.handleDelete}
          handleToggle={this.handleToggle}
        />
        <Map files={this.state.files} />
      </AppFrame>
    );
  }
}

export default App;
