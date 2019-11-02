import React, { useContext } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { Pause, PlayArrow } from '@material-ui/icons';
import { AppContext } from '../../AppContext';

export default () => {
  const {
    state: { isPlaying },
    dispatch
  } = useContext(AppContext);
  return (
    <IconButton
      color="inherit"
      onClick={() => dispatch({ type: 'togglePlay', isPlaying: !isPlaying })}
    >
      {isPlaying ? <Pause /> : <PlayArrow />}
    </IconButton>
  );
};
