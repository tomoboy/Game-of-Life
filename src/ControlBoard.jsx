import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import IconButton from '@material-ui/core/IconButton/IconButton';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Pause from '@material-ui/icons/Pause';
import Typography from '@material-ui/core/Typography/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import ZoomIn from '@material-ui/icons/ZoomIn';
import Add from '@material-ui/icons/Add';
import ZoomOut from '@material-ui/icons/ZoomOut';
import CloseIcon from '@material-ui/icons/Close';
import FullScreen from '@material-ui/icons/Fullscreen';
import FullScreenExit from '@material-ui/icons/FullscreenExit';
import Select from 'react-select';
import Button from '@material-ui/core/Button/Button';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import Grid from '@material-ui/core/Grid/Grid';
import { isMobile } from 'react-device-detect';
import GithubLogo from './GitHub-Mark-32px.png';
import AboutWindow from './AboutWindow';
import { BACKGROUND_COLOUR, DRAWER_WIDTH } from './constants';

const defaultTick = 200;
const speedOptions = [
  { value: defaultTick * 2, label: '0.5x' },
  { value: defaultTick, label: '1x' },
  { value: defaultTick / 2, label: '2x' },
  { value: defaultTick / 5, label: '5x' },
  { value: defaultTick / 10, label: '10x' }
];

const selectorStyles = {
  option: (provided, { isSelected }) => ({
    ...provided,
    backgroundColor: BACKGROUND_COLOUR,
    color: isSelected ? 'blue' : 'black'
  }),
  indicatorSeparator: styles => ({
    ...styles,
    backgroundColor: 'black'
  }),
  dropdownIndicator: styles => ({
    ...styles,
    color: 'black'
  }),
  menuList: styles => ({
    ...styles,
    backgroundColor: BACKGROUND_COLOUR
  }),
  control: styles => ({
    ...styles,
    borderColor: 'black',
    backgroundColor: BACKGROUND_COLOUR,
    minWidth: 76,
    margin: 5
  })
};

const boardStyles = theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    boxShadow: 1,
    backgroundColor: BACKGROUND_COLOUR
  },
  appBarShift: {
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    marginLeft: DRAWER_WIDTH,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  }
});

class ControlBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intervalId: 0,
      tickTime: speedOptions[2],
      generation: 0,
      aboutOpen: false,
      wasFull: false
    };
  }

  componentWillReceiveProps({ newGame }) {
    if (newGame) {
      this.setState({ generation: 0 });
    }
  }

  startTicking = () => {
    const { tickTime } = this.state;

    const { togglePlay } = this.props;
    togglePlay();
    this.setState({ intervalId: setInterval(this.onTick, tickTime.value) });
  };

  openModal = () => {
    const { fullscreen, toggleFullscreen } = this.props;
    let wasFull = false;
    if (fullscreen) {
      wasFull = true;
      toggleFullscreen(false);
    }
    this.setState({ wasFull, aboutOpen: true });
  };

  closeModal = () => {
    const { wasFull } = this.state;
    const { toggleFullscreen } = this.props;
    if (wasFull) {
      toggleFullscreen(true);
    }
    this.setState({ wasFull: false, aboutOpen: false });
  };

  onTick = () => {
    const { generation } = this.state;

    const { onTick } = this.props;
    this.setState({ generation: generation + 1 });
    onTick();
  };

  speedChange = selected => {
    this.setState({ tickTime: selected });
  };

  stopTicking = () => {
    const { intervalId } = this.state;

    const { togglePlay } = this.props;
    clearInterval(intervalId);
    togglePlay();
  };

  render() {
    const { tickTime, generation, aboutOpen } = this.state;
    const { classes, isPlaying, zoom, toggleFullscreen, fullscreen } = this.props;
    return (
      <AppBar
        color="default"
        position="fixed"
        className={classNames(classes.appBar, {
          [classes.appBarShift]: !isPlaying
        })}
      >
        <Toolbar style={{ marginTop: '5px' }} disableGutters={isPlaying}>
          <Typography variant="h4">GAME OF LIFE </Typography>
          <Select
            value={tickTime}
            onChange={this.speedChange}
            options={speedOptions}
            defaultValue={speedOptions[2]}
            isDisabled={isPlaying}
            isClearable={false}
            isSearchable={false}
            name="speed"
            styles={selectorStyles}
          />
          <IconButton
            color="inherit"
            onClick={() => (isPlaying ? this.stopTicking() : this.startTicking())}
          >
            {isPlaying ? <Pause /> : <PlayArrow />}
          </IconButton>
          <Typography variant="body1">
            Generation:
            {generation}{' '}
          </Typography>
          <IconButton onClick={this.onTick} disabled={isPlaying}>
            <Add />
          </IconButton>
          <IconButton onClick={() => zoom(1)}>
            <ZoomIn />
          </IconButton>
          <IconButton onClick={() => zoom(-1)}>
            <ZoomOut />
          </IconButton>
          {!isMobile && (
            <IconButton onClick={() => toggleFullscreen(!fullscreen)}>
              {fullscreen ? <FullScreenExit /> : <FullScreen />}
            </IconButton>
          )}
          <Button size="small" mini variant="outlined" onClick={this.openModal}>
            About
          </Button>
          <Dialog open={aboutOpen} onClose={this.closeModal}>
            <DialogTitle>
              <Grid container alignItems="stretch" justify="space-between">
                <Typography variant="h6"> About the Game of Life </Typography>
                <IconButton aria-label="Close" onClick={this.closeModal}>
                  <CloseIcon />
                </IconButton>
              </Grid>
            </DialogTitle>
            <DialogContent>
              <AboutWindow />
            </DialogContent>
          </Dialog>
          <Button
            style={{ marginLeft: '5px' }}
            size="small"
            mini
            variant="outlined"
            target="_blank"
            href="https://github.com/tomoboy"
          >
            <img style={{ width: '15px', marginRight: '5px' }} src={GithubLogo} alt="Github logo" />
            Follow me
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}
export default withStyles(boardStyles, { withTheme: true })(ControlBoard);
