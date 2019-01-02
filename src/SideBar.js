import React from 'react'
import Drawer from "@material-ui/core/Drawer/Drawer";
import { withStyles } from '@material-ui/core/styles';
import {BACKGROUND_COLOUR, DRAWER_WIDTH} from './constants'
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import ShapesList from "./ShapesList";
import BoardSizeControl from "./BoardSizeControl";

const styles = () => ({
    drawer: {
        width: DRAWER_WIDTH,
        flexShrink: 0,
    },
    drawerPaper: {
        width: DRAWER_WIDTH
        , backgroundColor: BACKGROUND_COLOUR
        , border: '0px'
    },
});

function SideBar({ classes, isPlaying, rows, columns, setBoardSize, setPreviewShape, setSelectedShape, reportError }){
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
                style={{marginLeft: '5px'}}
                container
                direction='column'
                wrap={'nowrap'}
                alignItems='flex-start'
            >
                <Grid item>
                    <Typography variant='h6'>Settings</Typography>
                </Grid>
                <Grid item>
                    <BoardSizeControl
                        reportError={reportError}
                        rows={rows}
                        columns={columns}
                        newBoard={setBoardSize}/>
                </Grid>
                <Grid item>
                    <Typography variant='subtitle1'>Shapes </Typography>
                    <ShapesList
                        rows={rows}
                        columns={columns}
                        setPreviewShape={setPreviewShape}
                        setSelectedShape={setSelectedShape}/>
                </Grid>
            </Grid>
        </Drawer>
    )
}

export default withStyles(styles, {withTheme: true})(SideBar)