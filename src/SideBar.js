import React, {Component} from 'react'
import Drawer from "@material-ui/core/Drawer/Drawer";
import { withStyles } from '@material-ui/core/styles';
import { drawerWidth } from './constants'
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import NumberInput from "./NumberInput";
import Button from "@material-ui/core/Button/Button";
import ShapesList from "./ShapesList";
import Paper from "@material-ui/core/Paper/Paper";

const styles = theme => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
});

class SideBar extends Component{
    constructor(props) {
        super(props);
        this.state = {
            rows: this.props.rows,
            columns: this.props.columns
        }
    }

    newBoard = () => this.props.setBoardSize(this.state.rows, this.state.columns);


    render(){
        const isPlaying = this.props.isPlaying();
        const { classes } = this.props;
        return (
            <Drawer
                variant='persistent'
                anchor='left'
                open={!isPlaying}
                className={classes.drawer}
                classes={{
                    paper: classes.drawerPaper
                }}
            >
                <Grid
                    container
                    direction='column'
                    alignItems='center'
                >
                    <Grid item>
                        <Typography variant='h6'>Edit controls</Typography>
                    </Grid>
                    <Grid item>
                        <Paper style={{margin: '5px', padding: '5px'}}>
                        <Typography variant='subtitle1'>board size</Typography>
                            <Grid container direction='row'>
                            <Grid item>
                            <NumberInput
                                label='rows'
                                value={this.state.rows}
                                onChange={value => this.setState({rows: parseInt(value)})}/>
                            </Grid>
                            <Grid item>
                            <NumberInput
                                label='columns'
                                value={this.state.columns}
                                onChange={value => this.setState({columns: parseInt(value)})}/>
                            </Grid>
                        </Grid>
                    <Grid item>
                        <Button
                            variant='contained'
                            onClick={this.newBoard}>
                            New Board
                        </Button>
                    </Grid>
                        </Paper>
                    </Grid>
                     <Grid item>
                         <Paper style={{margin: '5px', padding: '5px'}}>
                             <Typography variant='subtitle1'>Shapes </Typography>
                             <ShapesList/>
                         </Paper>
                    </Grid>
                </Grid>
            </Drawer>
        )
    }
}

export default withStyles(styles, {withTheme: true})(SideBar)