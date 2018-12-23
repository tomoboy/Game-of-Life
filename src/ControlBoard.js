import React, {Component} from 'react'
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Button from "@material-ui/core/Button/Button";
import IconButton from "@material-ui/core/IconButton/IconButton";
import PlayArrow from '@material-ui/icons/PlayArrow'
import Pause from '@material-ui/icons/Pause'
import Typography from "@material-ui/core/Typography/Typography";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput/OutlinedInput";
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from 'classnames';
import { drawerWidth } from './constants'



const styles = theme => ({
    root: {
        display: 'flex'
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })},
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        })
    }
});




class ControlBoard extends Component{
    constructor(props) {
        super(props);
        this.state = {
            intervalId: 0
            , defaultTick: 500
            , tickTime: 500
            , generation: 0
        };
    }

    startTicking = () => {
        let id = setInterval(this.onTick, this.state.tickTime);
        this.props.togglePlay();
        this.setState({intervalId: id})
    };

    onTick = () => {
        this.setState({generation: this.state.generation + 1});
        this.props.onTick();
    };

    speedChange = ({target}) => {
        this.setState({tickTime: target.value});
        return new Promise(resolve => setTimeout(resolve, 300)).then(() => { //Hack to make setinterval work properly
                if (this.props.isPlaying) {
                    clearInterval(this.state.intervalId);
                    this.startTicking();
                }
            }
        );
    };



    stopTicking = () => {
        clearInterval(this.state.intervalId);
        this.props.togglePlay()
    };

    render(){
        const { classes, isPlaying } = this.props;
        return (
            <AppBar
                color='default'
                position='fixed'
                className={classNames(classes.appBar, {
                    [classes.appBarShift]: !isPlaying,
                })}>
                <Toolbar style={{marginTop: '5px'}} disableGutters={isPlaying}>
                    <Button variant='contained'
                            disabled={isPlaying} onClick={this.onTick}>
                        <Typography variant='h6' >Tick</Typography>
                    </Button>
                    <form autoComplete='off'>
                        <FormControl style={{margin:'5px'}}>
                            <InputLabel ref={ref => {this.inputLabelref = ref}}  htmlFor='speed-simple'>   Speed</InputLabel>
                            <Select
                                value={this.state.tickTime}
                                onChange={this.speedChange}
                                input={
                                    <OutlinedInput
                                        labelWidth={0}
                                        name='speed'
                                        id='speed-simple'
                                        />
                                }
                            >
                                <MenuItem value={this.state.defaultTick}> 1x  </MenuItem>
                                <MenuItem value={this.state.defaultTick / 2}> 2x  </MenuItem>
                                <MenuItem value={this.state.defaultTick / 5}> 5x  </MenuItem>
                                <MenuItem value={this.state.defaultTick / 10}> 10x </MenuItem>
                                <MenuItem value={this.state.defaultTick * 2}> 0.5x </MenuItem>
                            </Select>
                        </FormControl>
                    </form>
                    {(!isPlaying) ?
                        < IconButton color='inherit' onClick={this.startTicking}>
                            <PlayArrow/>
                        </IconButton>
                        :
                        < IconButton color='inherit' onClick={this.stopTicking}>
                            <Pause/>
                        </IconButton>
                    }
                    <Typography variant='h6'>Generation: {this.state.generation} </Typography>
                </Toolbar>
            </AppBar>
        )
    }
}
export default withStyles(styles, { withTheme: true })(ControlBoard);

