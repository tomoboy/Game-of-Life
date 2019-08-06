import React, { useState } from "react";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import { Close } from "@material-ui/icons";
import { BoardSizeControl } from "../BoardSizeControl";
import styled from "styled-components";

const Title = styled.span`
  text-transform: uppercase;
  font-family: "SF Alien Encounters Solid", sans-serif;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  padding: 8px;
`;

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
          background: "rgb(255,255,255, 0.4)"
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
        <Title>
          Create New Board
          <Close
            style={{ fontSize: "20px", cursor: "pointer" }}
            onClick={closeDialog}
          />
        </Title>

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
