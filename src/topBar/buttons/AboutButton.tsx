import Button from "@material-ui/core/Button";
import React from "react";

export default ({ openAboutWindow }: { openAboutWindow: () => void }) => (
  <Button size="small" mini variant="outlined" onClick={openAboutWindow}>
    About
  </Button>
);
