import React, { useState } from "react";
import styled from "styled-components";
import Header2 from "../atomicComponents/Header2";
import { dispatchAction } from "../baseStream$";
import { Button, StyledInput } from "../atomicComponents/StyledInput";
import { DEFAULT_COLUMNS, DEFAULT_ROWS } from "../constants";
import {newBoard} from "./actions";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
  min-width: 180px;
  label {
    float: left;
    margin-bottom: 10px;
  }
  input {
    float: right;
  }
`;

const MIN_SIZE = 54;
const MAX_SIZE = 2000;
const NumberInput = ({
  label,
  value,
  onChange
}: {
  label: string;
  value: number;
  onChange: (e: any) => void;
}) => {
  return (
    <label>
      {label}
      <StyledInput
        type="number"
        value={value}
        min={MIN_SIZE}
        max={MAX_SIZE}
        onChange={onChange}
      />
    </label>
  );
};

export const BoardSizeControl = () => {
  const [rows, setRows] = useState<number>(DEFAULT_ROWS);
  const [columns, setColumns] = useState<number>(DEFAULT_COLUMNS);
  const submit = () => {
    dispatchAction(newBoard({ columns, rows }));
  };
  return (
    <>
      <Header2>Board size</Header2>
      <Layout>
        <NumberInput
          label="Rows: "
          value={rows}
          onChange={e => setRows(e.target.value)}
        />
        <NumberInput
          label="Columns: "
          value={columns}
          onChange={e => setColumns(e.target.value)}
        />
        <Button type="submit" value="New Board" onClick={submit} />
      </Layout>
    </>
  );
};
