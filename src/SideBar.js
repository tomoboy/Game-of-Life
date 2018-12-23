import React, {Component} from 'react'
import Drawer from "@material-ui/core/Drawer/Drawer";
import { withStyles } from '@material-ui/core/styles';
import { drawerWidth } from './constants'
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import ShapesList from "./ShapesList";
import Paper from "@material-ui/core/Paper/Paper";
import BoardSizeControl from "./BoardSizeControl";

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
    render(){
        const { classes, isPlaying, rows, columns, setBoardSize, setPreviewShape, setSelectedShape } = this.props;
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
                        <BoardSizeControl
                            rows={rows}
                            columns={columns}
                            newBoard={setBoardSize}/>
                    </Grid>
                     <Grid item>
                         <Paper style={{margin: '5px', padding: '5px'}}>
                             <Typography variant='subtitle1'>Shapes </Typography>
                             <ShapesList
                                 setPreviewShape={setPreviewShape}
                                 setSelectedShape={setSelectedShape}/>
                         </Paper>
                    </Grid>
                </Grid>
            </Drawer>
        )
    }
}

export default withStyles(styles, {withTheme: true})(SideBar)