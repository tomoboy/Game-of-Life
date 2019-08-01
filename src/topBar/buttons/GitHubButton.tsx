import GithubLogo from "../../GitHub-Mark-32px.png";
import Button from "@material-ui/core/Button";
import React from "react";

export default () => (
  <Button
    style={{
      fontFamily: "SF Alien Encounters",
      background: "rgb(255,255,255, 0.4",
      marginLeft: "10px"
    }}
    size="small"
    mini
    variant="outlined"
    target="_blank"
    href="https://github.com/tomoboy/Game-of-Life"
  >
    <img
      style={{ width: "15px", marginRight: "5px" }}
      src={GithubLogo}
      alt="Github logo"
    />
    source code
  </Button>
);
