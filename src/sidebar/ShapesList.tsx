import React, { useState } from "react";
import ListSubheader from "@material-ui/core/ListSubheader/ListSubheader";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import List from "@material-ui/core/List/List";
import { BACKGROUND_COLOUR } from "../constants";
import { dispatchAction } from "../baseStream$";
import { Shape, Shapes } from "../types";
import { shapes } from "./shapes";
import { previewShape, selectedShape } from "./actions";

const listStyle = {
  // position: "relative",
  overflow: "auto",
  maxHeight: "600px"
};

export const ShapesList = () => {
  const singleCell = (shapes as Shapes)[""][0];
  const [selected, setSelected] = useState<Shape>(singleCell);

  const onClick = (shape: Shape) => {
    setSelected(shape);
    dispatchAction(selectedShape({ shape }));
  };
  return (
    <List subheader={<li />} style={listStyle} disablePadding>
      <li key={singleCell.name}>
        <ul>
          <ListItem
            button
            onClick={() => onClick(singleCell)}
            onFocus={() => dispatchAction(previewShape({ shape: singleCell }))}
            onBlur={() => dispatchAction(previewShape({ shape: null }))}
            onMouseOver={() =>
              dispatchAction(previewShape({ shape: singleCell }))
            }
            onMouseLeave={() => dispatchAction(previewShape({ shape: null }))}
            key={singleCell.name}
            selected={selected === singleCell}
          >
            <ListItemText primary={singleCell.name} />
          </ListItem>
        </ul>
      </li>
      {Object.keys(shapes)
        .filter(cat => cat !== "")
        .map(category => (
          <li key={category}>
            <ul>
              <ListSubheader
                style={{ backgroundColor: BACKGROUND_COLOUR, color: "black" }}
              >
                {category}
              </ListSubheader>
              {(shapes as Shapes)[category].map(shape => {
                return (
                  <ListItem
                    button
                    onClick={() => onClick(shape)}
                    onMouseOver={() => () =>
                      dispatchAction(previewShape({ shape }))}
                    onMouseLeave={() => () =>
                      dispatchAction(previewShape({ shape: null }))}
                    onFocus={() => () =>
                      dispatchAction(previewShape({ shape }))}
                    onBlur={() => () =>
                      dispatchAction(previewShape({ shape: null }))}
                    key={shape.name}
                    selected={selected === shape}
                  >
                    <ListItemText primary={shape.name} />
                  </ListItem>
                );
              })}
            </ul>
          </li>
        ))}
    </List>
  );
};
