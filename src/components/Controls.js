import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  buttonTop: {
    margin: 10,
  },
  buttonBot: {
    margin: 10,
    marginTop: 0
  },
  container: {
    display: 'flex',
    alignItems: 'center'
  },
  input: {
    display: 'none'
  }
});

class Controls extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: 0
    };

    this.input = React.createRef();
  }

  invokeInput = () => {
    this.input.current.click();
  }

  handleSelect = (e) => {
    const amount = e.target.files.length;

    this.setState({
      amount
    })
  }

  handleAdd = () => {
    
  }
  
  render() {
    const { classes } = this.props;

    return (
      <div>
        <input
            accept=".csv"
            className={classes.input}
            id="file-input"
            multiple
            type="file"
            ref={this.input}
            onChange={this.handleSelect}
        />
        <div className={classes.container}>
          <Button 
            variant="contained" 
            className={classes.buttonTop} 
            size='small'
            onClick={this.invokeInput}>
              Выбрать файлы
          </Button>
          <Typography>
            {this.state.amount > 0 
              ? `Число файлов: ${this.state.amount}`
              : `Файл не выбран`
            }
          </Typography>
        </div>
        <Button 
          variant="contained" 
          className={classes.buttonBot} 
          disabled={this.state.amount > 0 ? false : true}
          size='small'>
            Добавить
        </Button>
      </div>
    );
  }
};

export default withStyles(styles)(Controls);