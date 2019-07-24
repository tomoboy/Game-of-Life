import React, { useState } from "react";
import styled from "styled-components";
import { dispatchAction } from "../baseStream$";
import { Button, StyledInput } from "../atomicComponents/StyledInput";
import { newBoard } from "./actions";

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

export const BoardSizeControl = ({
  rows,
  columns,
  closeDialog
}: {
  rows: number;
  columns: number;
  closeDialog: () => void;
}) => {
  const [newRows, setNewRows] = useState<number>(rows);
  const [newColumns, setNewColumns] = useState<number>(columns);
  const submit = () => {
    closeDialog();
    dispatchAction(newBoard({ columns: newColumns, rows: newRows }));
  };
  return (
    <>
      <Layout>
        <NumberInput
          label="Rows: "
          value={newRows}
          onChange={e => setNewRows(parseInt(e.target.value, 10))}
        />
        <NumberInput
          label="Columns: "
          value={newColumns}
          onChange={e => setNewColumns(parseInt(e.target.value, 10))}
        />
        <Button type="submit" value="New Board" onClick={submit} />
      </Layout>
    </>
  );
};
