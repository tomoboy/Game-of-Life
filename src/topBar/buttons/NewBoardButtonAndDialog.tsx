import React, { useState } from "react";
import Typography from "@material-ui/core/Typography/Typography";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import { Close } from "@material-ui/icons";
import { BoardSizeControl } from "../BoardSizeControl";

export default ({ rows, columns }: { rows: number; columns: number }) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const closeDialog = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <Button
        style={{
          fontFamily: "SF Alien Encounters",
          background: "rgb(255,255,255, 0.4"
        }}
        size="small"
        mini
        variant="outlined"
        onClick={() => {
          setDialogOpen(true);
        }}
      >
        New Board
      </Button>
      <Dialog open={dialogOpen} onClose={closeDialog}>
        <DialogTitle>
          <Grid container alignItems="stretch" justify="space-between">
            <Typography variant="h6"> Create New Board </Typography>
            <IconButton
              style={{ position: "absolute", top: 0, right: 0 }}
              aria-label="Close"
              onClick={closeDialog}
            >
              <Close />
            </IconButton>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <BoardSizeControl
            rows={rows}
            columns={columns}
            closeDialog={closeDialog}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
