import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';

import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import Button from '@material-ui/core/Button/Button';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import IconButton from '@material-ui/core/IconButton/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField/TextField';
import styled from 'styled-components';

const CanvasWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

export default class NewShapeDialog extends Component {
  canvasRef = React.createRef();

  state = {
    name: '',
    category: ''
  };

  componentDidUpdate(nextProps, prevState) {
    const { shape } = this.props;
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');
    shape.forEach((row, y) =>
      row.forEach((cell, x) => {
        ctx.fillStyle = cell ? 'black' : 'white';
        ctx.fillRect(x * 10, y * 10, 9, 9);
      })
    );
  }

  saveShape = data =>
    fetch(`${window.location.origin}/shapes`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => console.log(res))
      .catch(res => {
        console.log(res);
        const reportError = this.props;
        reportError('Could not save file, please try again later.');
      });

  render() {
    const { open, handleClose, shape } = this.props;
    const { name, category } = this.state;
    return (
      <Dialog open={open} onClose={handleClose}>
        <HeaderWrapper>
          <DialogTitle>Define custom shape</DialogTitle>
          <IconButton aria-label="Close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </HeaderWrapper>
        <DialogContent>
          <CanvasWrapper>
            <canvas
              id="boardCanvas"
              ref={this.canvasRef}
              style={{ margin: '0 auto' }}
              width={shape[0].length * 10}
              height={shape.length * 10}
            />
          </CanvasWrapper>
        </DialogContent>

        <InputWrapper>
          <form noValidate autoComplete="off">
            <TextField
              id="outlined-name"
              label="Name"
              value={name}
              onChange={({ target }) =>
                this.setState({
                  name: target.value
                })
              }
              margin="normal"
              variant="outlined"
            />
          </form>
          <form noValidate autoComplete="off">
            <TextField
              id="outlined-category"
              label="Category"
              value={category}
              onChange={({ target }) =>
                this.setState({
                  category: target.value
                })
              }
              margin="normal"
              variant="outlined"
            />
          </form>
        </InputWrapper>
        <DialogActions>
          <Button
            size="small"
            mini
            variant="outlined"
            onClick={() => {
              this.saveShape({ name, category, shape });
              handleClose();
            }}
          >
            save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
