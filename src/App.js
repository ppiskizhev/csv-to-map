import React, { Component } from 'react';
import Papa from 'papaparse';
import { withStyles } from '@material-ui/core/styles';
import SideBar from './components/SideBar';
import Map from './components/Map';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import colors from './constants';
import { getColor, round1Decimal } from './helpers';

const styles = theme => ({
  appFrame: {
    display: 'flex',
    height: '100%',
  },
  navIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 2600,
    color: 'rgba(0, 0, 0, 0.8)',
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

class App extends Component {
  state = {
    files: {},
    isDrawerOpen: false,
  };

  componentDidMount = () => {
    this.getFromLocalStorage('files');
  };

  updateState = (file, name) => {
    const color = getColor(this.state.files, colors);
    const geoData = file.data.filter(item => Number(item[0])).map(item => ({
      coords: [parseFloat(item[1]), parseFloat(item[0])],
      partner: item[2],
      address: item[4],
      weight: round1Decimal(parseFloat(item[5])),
      sum: round1Decimal(parseFloat(item[7].replace(/\s/g, ''))),
      task: item[8],
    }));

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

  handleFileToggle = name => {
    const files = { ...this.state.files };
    files[name].isActive = !files[name].isActive;
    this.setState({ files });
    localStorage.setItem('files', JSON.stringify(files));
  };

  handleFileDelete = name => {
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

  handleDrawerToggle = () => {
    this.setState(state => ({ isDrawerOpen: !state.isDrawerOpen }));
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.appFrame}>
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          onClick={this.handleDrawerToggle}
          className={classes.navIcon}
        >
          <MenuIcon />
        </IconButton>
        <SideBar
          files={this.state.files}
          isOpen={this.state.isDrawerOpen}
          handleAddFiles={this.parseData}
          handleDelete={this.handleFileDelete}
          handleToggle={this.handleFileToggle}
          handleDrawerToggle={this.handleDrawerToggle}
        />
        <Map files={this.state.files} />
      </div>
    );
  }
}

export default withStyles(styles)(App);
