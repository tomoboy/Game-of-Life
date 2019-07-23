import GithubLogo from "../../GitHub-Mark-32px.png";
import Button from "@material-ui/core/Button";
import React from "react";

export default () => (
  <Button
    style={{ marginLeft: "5px" }}
    size="small"
    mini
    variant="outlined"
    target="_blank"
    href="https://github.com/tomoboy"
  >
    <img
      style={{ width: "15px", marginRight: "5px" }}
      src={GithubLogo}
      alt="Github logo"
    />
    Follow me
  </Button>
);
