import { ValueType } from "react-select/lib/types";
import { SpeedOption, speedOptions } from "./speedOptions";
import Select from "react-select";
import React from "react";
import { dispatchAction } from "../baseStream$";
import { newTickTime } from "./actions";
import styled from "styled-components";

const Label = styled.span`
  margin-bottom: 4px;
`;
const BaseLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 75px;
`;

export default ({
  tickTime,
  isPlaying
}: {
  tickTime: number;
  isPlaying: boolean;
}) => {
  const speedChange = (value: number) => {
    if (value !== tickTime) {
      dispatchAction(newTickTime({ tickTime: value }));
    }
  };
  const selectedSpeedOption =
    speedOptions.find(e => e.value === tickTime) ||
    (speedOptions[0] as SpeedOption);

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
        isDisabled={isPlaying}
        isClearable={false}
        isSearchable={false}
        name="speed"
      />
    </BaseLayout>
  );
};
