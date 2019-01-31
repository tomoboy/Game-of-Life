import React from 'react';
import Drawer from '@material-ui/core/Drawer/Drawer';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid/Grid';
import Typography from '@material-ui/core/Typography/Typography';
import Button from '@material-ui/core/Button/Button';
import { BACKGROUND_COLOUR, DRAWER_WIDTH } from './constants';
import ShapesList from './ShapesList';
import BoardSizeControl from './BoardSizeControl';

const styles = theme => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: DRAWER_WIDTH,
      flexShrink: 0,
      overflow: 'hidden'
    }
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
    backgroundColor: BACKGROUND_COLOUR,
    border: '0px',
    overflow: 'hidden'
  }
});

const SideBar = ({
  classes,
  isPlaying,
  rows,
  columns,
  setBoardSize,
  setPreviewShape,
  setSelectedShape,
  reportError,
  startCustomShapeMode,
  customShapeMode,
  saveCustomShape
}) => {
  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={!isPlaying}
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <Grid
        style={{ marginLeft: '5px' }}
        container
        direction="column"
        wrap="nowrap"
        alignItems="flex-start"
      >
        <Grid item>
          <Typography variant="h6">Settings</Typography>
        </Grid>
        <Grid item>
          <BoardSizeControl
            reportError={reportError}
            rows={rows}
            columns={columns}
            newBoard={setBoardSize}
          />
        </Grid>
        <Grid item>
          <Typography variant="subtitle1">Shapes </Typography>
          <ShapesList
            rows={rows}
            columns={columns}
            setPreviewShape={setPreviewShape}
            setSelectedShape={setSelectedShape}
          />
        </Grid>
        {customShapeMode ? (
          <Grid item>
            <Button
              size="small"
              mini
              variant="outlined"
              style={{ marginLeft: '5px' }}
              onClick={() => startCustomShapeMode(false)}
            >
              Cancel{' '}
            </Button>
            <Button
              size="small"
              color="primary"
              mini
              variant="outlined"
              style={{ marginLeft: '5px' }}
              onClick={() => saveCustomShape}
            >
              Save
            </Button>
          </Grid>
        ) : (
          <Button
            size="small"
            mini
            variant="outlined"
            style={{ marginLeft: '5px' }}
            onClick={() => {
              startCustomShapeMode(true);
            }}
          >
            Save Custom shape
          </Button>
        )}
      </Grid>
    </Drawer>
  );
};

export default withStyles(styles, { withTheme: true })(SideBar);
