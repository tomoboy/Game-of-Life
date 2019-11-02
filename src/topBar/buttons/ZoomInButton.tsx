import ZoomIn from '@material-ui/icons/ZoomIn';
import IconButton from '@material-ui/core/IconButton';
import React, { useContext } from 'react';
import { AppContext } from '../../AppContext';

export default () => {
  const { dispatch } = useContext(AppContext);

  return (
    <IconButton
      color="inherit"
      onClick={() => dispatch({ type: 'zoom', zoom: 1 })}
    >
      <ZoomIn />
    </IconButton>
  );
};
