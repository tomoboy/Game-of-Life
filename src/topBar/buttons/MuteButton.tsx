import React, { useContext } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { VolumeOff, VolumeUp } from '@material-ui/icons';
import { AppContext } from '../../AppContext';

export default () => {
  const {
    state: { isSoundOn },
    dispatch
  } = useContext(AppContext);
  return (
    <IconButton
      color="inherit"
      onClick={() => dispatch({ type: 'toggleSound', isSoundOn: !isSoundOn })}
    >
      {isSoundOn ? <VolumeOff /> : <VolumeUp />}
    </IconButton>
  );
};
