import { Shape, Shapes } from "../types";
import Select from "react-select";
import React from "react";
import { shapes } from "../shapes";
import { ValueType } from "react-select/lib/types";
import { dispatchAction } from "../baseStream$";
import {changeSelectedShape} from "./actions";

const shapesOptions = Object.keys(shapes as Shapes).map((category: string) => ({
  label: category,
  options: (shapes as Shapes)[category].map((shape: Shape) => ({
    value: shape,
    label: shape.name
  }))
}));

interface ShapeOption {
  value: Shape;
  label: string;
}

export default ({
  selectedShape,
  isPlaying
}: {
  selectedShape: Shape;
  isPlaying: boolean;
}) => {
  const selectedShapeCategory = shapesOptions.find(
    option => option.label === selectedShape.category
  );
  const selectedShapeOption =
    selectedShapeCategory &&
    selectedShapeCategory.options.find(
      subOption => subOption.label === selectedShape.name
    );

  const onChange = (newSelectedShape: Shape) => {
    if (newSelectedShape.name !== selectedShape.name) {
      dispatchAction(changeSelectedShape({ shape: newSelectedShape }));
    }
  };

  return (
    <div style={{ width: "200px" }}>
      <Select
        value={selectedShapeOption}
        onChange={(selected: ValueType<ShapeOption>) =>
          selected && onChange((selected as ShapeOption).value)
        }
        options={shapesOptions}
        // defaultValue={speedOptions[2]}
        isDisabled={isPlaying}
        isClearable={false}
        isSearchable={true}
        name="shapes"
      />
    </div>
  );
};
