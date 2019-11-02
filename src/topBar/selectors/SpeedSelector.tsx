import { ValueType } from 'react-select/lib/types';
import { SpeedOption, speedOptions } from '../speedOptions';
import Select from 'react-select';
import React, { useContext } from 'react';
import styled from 'styled-components';
import selectorTheme from './selectorTheme';
import { AppContext } from '../../AppContext';

const Label = styled.span`
  margin-bottom: 4px;
`;
const BaseLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100px;
`;

export default () => {
  const {
    state: { tickTime },
    dispatch
  } = useContext(AppContext);
  const speedChange = (value: number) => {
    if (value !== tickTime) {
      dispatch({ type: 'newTickTime', tickTime: value });
    }
  };
  const selectedSpeedOption =
    speedOptions.find(e => e.value === tickTime) || speedOptions[0];

  return (
    <BaseLayout>
      <Label>Speed:</Label>
      <Select
        value={selectedSpeedOption}
        onChange={(selected: ValueType<SpeedOption>) =>
          selected && speedChange((selected as SpeedOption).value)
        }
        options={speedOptions}
        defaultValue={speedOptions[2]}
        isClearable={false}
        isSearchable={false}
        name="speed"
        theme={selectorTheme}
      />
    </BaseLayout>
  );
};
