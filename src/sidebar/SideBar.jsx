import React from "react";
import Drawer from "@material-ui/core/Drawer/Drawer";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import { BACKGROUND_COLOUR, DRAWER_WIDTH } from "../constants";
import { ShapesList } from "./ShapesList";
import { BoardSizeControl } from "./BoardSizeControl";

const styles = theme => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: DRAWER_WIDTH,
      flexShrink: 0,
      overflow: "hidden"
    }
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
    backgroundColor: BACKGROUND_COLOUR,
    border: "0px",
    overflow: "hidden"
  }
});

const SideBar = ({ classes}) => {
  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={true}
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <Grid
        style={{ marginLeft: "5px" }}
        container
        direction="column"
        wrap="nowrap"
        alignItems="flex-start"
      >
        <Grid item>
          <Typography variant="h6">Settings</Typography>
        </Grid>
        <Grid item>
          <BoardSizeControl />
        </Grid>
        <Grid item>
          <Typography variant="subtitle1">Shapes </Typography>
          <ShapesList />
        </Grid>
      </Grid>
    </Drawer>
  );
};

export default withStyles(styles, { withTheme: true })(SideBar);
