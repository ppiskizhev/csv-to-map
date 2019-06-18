import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import SideBar from './components/SideBar';
import Map from './components/Map';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';

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
    files: [],
    isDrawerOpen: false,
  };

  componentDidMount = () => {
    this.fetchData();
  };

  fetchData = () => {
    fetch('http://localhost/get')
      .then(res => res.json())
      .then(data => this.setData(data))
      .catch(err => console.log(err));
  };

  addData = files => {
    const formData = new FormData();
    Object.keys(files).forEach((file, i) => formData.append('file', files[i]));
    axios
      .post('http://localhost/add', formData)
      .then(({ data }) => this.setData(data))
      .catch(err => console.log(err));
  };

  handleFileToggle = name => {
    const { files } = this.state;
    const updatedFiles = files.map(file => {
      if (file.name === name) {
        const isActive = !file.isActive;
        return { ...file, isActive };
      }

      return file;
    });

    this.setState({
      files: updatedFiles,
    });

    axios
      .post('http://localhost/toggle', { name })
      .then(res => res)
      .catch(err => console.log(err));
  };

  handleFileDelete = name => {
    const { files } = this.state;
    const updatedFiles = files.filter(file => file.name !== name);

    this.setState({
      files: updatedFiles,
    });

    axios
      .post('http://localhost/remove', { name })
      .then(res => res)
      .catch(err => console.log(err));
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ isDrawerOpen: !state.isDrawerOpen }));
  };

  setData = data => {
    const { files } = this.state;
    const newNames = data.map(sale => sale.name);

    const newFiles = files.filter(sale => !newNames.includes(sale.name));

    newFiles.push(...data);

    this.setState({
      files: newFiles,
    });
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
          handleAddFiles={this.addData}
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
