import { Shape, Shapes } from "../../types";
import Select, { components } from "react-select";
import React from "react";
import { shapes } from "../../shapes";
import { ValueType } from "react-select/lib/types";
import { dispatchAction } from "../../baseStream$";
import { changeSelectedShape, previewShape } from "../actions";
import styled from "styled-components";
import selectorTheme from "./selectorTheme";

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

const CustomOption = (props: any) => (
  <div
    onMouseOver={() =>
      dispatchAction(previewShape({ previewShape: props.value }))
    }
    onMouseLeave={() => dispatchAction(previewShape({ previewShape: null }))}
  >
    <components.Option {...props} />
  </div>
);

const Label = styled.span`
  margin-bottom: 4px;
`;
const BaseLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  margin-left: 10px;
`;

export default ({ selectedShape }: { selectedShape: Shape }) => {
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
      dispatchAction(previewShape({ previewShape: null }));
    }
  };

  return (
    <BaseLayout>
      <Label>Shape:</Label>
      <Select
        value={selectedShapeOption}
        components={{ Option: CustomOption }}
        onChange={(selected: ValueType<ShapeOption>) =>
          selected && onChange((selected as ShapeOption).value)
        }
        options={shapesOptions}
        // isDisabled={isPlaying}
        isClearable={false}
        isSearchable={true}
        name="shapes"
        theme={selectorTheme}
        styles={{
          groupHeading: base => ({
            ...base,
            fontSize: "90%",
            fontWeight: 400,
            color: "#7c006e"
          })
        }}
      />
    </BaseLayout>
  );
};
