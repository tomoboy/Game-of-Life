import { Shape } from '../../types';
import Select, { components } from 'react-select';
import React, { useContext, useRef } from 'react';
import { shapes } from '../../patterns/shapes';
import { ValueType } from 'react-select/lib/types';
import styled from 'styled-components';
import selectorTheme from './selectorTheme';
import { AppContext } from '../../AppContext';

const shapesOptions = Object.keys(shapes).map((category: string) => ({
  label: category,
  options: shapes[category].map((shape: Shape) => ({
    value: shape,
    label: shape.name
  }))
}));

interface ShapeOption {
  value: Shape;
  label: string;
}

const Label = styled.span`
  margin-bottom: 4px;
`;
const BaseLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  margin-left: 10px;
`;

export default () => {
  const {
    state: { selectedShape },
    dispatch
  } = useContext(AppContext);
  const currentPreviewShape = useRef<Shape | null>(null);

  const CustomOption = (props: any) => (
    <div
      onMouseOver={() => {
        if (props.value !== currentPreviewShape.current) {
          currentPreviewShape.current = props.value;
          dispatch({ type: 'previewShape', previewShape: props.value });
        }
      }}
      onMouseLeave={() => {
        currentPreviewShape.current = null;
        dispatch({ type: 'previewShape', previewShape: null });
      }}
    >
      <components.Option {...props} />
    </div>
  );

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
      dispatch({
        type: 'changeSelectedShape',
        selectedShape: newSelectedShape
      });
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
        isClearable={false}
        isSearchable={true}
        name="shapes"
        theme={selectorTheme}
        styles={{
          groupHeading: base => ({
            ...base,
            fontSize: '90%',
            fontWeight: 400,
            color: '#7c006e'
          })
        }}
      />
    </BaseLayout>
  );
};
