import React from 'react';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import Button from '@material-ui/core/Button/Button';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';

export default ({ open, handleClose }) => (
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Define custom shape</DialogTitle>
    <DialogContent>
      <DialogContentText>
        To make a custom shape, first select upper left corner where you want to start your shape,
        then select bottom right corner of the shape.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button
        size="small"
        mini
        variant="outlined"
        style={{ marginLeft: '5px' }}
        onClick={handleClose}
      >
        ok
      </Button>
    </DialogActions>
  </Dialog>
);
