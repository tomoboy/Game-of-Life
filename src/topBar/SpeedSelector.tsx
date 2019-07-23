import { ValueType } from "react-select/lib/types";
import { SpeedOption, speedOptions } from "./speedOptions";
import Select from "react-select";
import React from "react";
import { dispatchAction } from "../baseStream$";
import { newTickTime } from "./actions";

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
    <div style={{ width: "75px" }}>
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
    </div>
  );
};
