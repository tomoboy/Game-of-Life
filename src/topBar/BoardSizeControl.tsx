import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { StyledInput } from './buttons/StyledInput';
import { Button } from '@material-ui/core';
import { AppContext } from '../AppContext';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
  min-width: 180px;
  label {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
  closeDialog
}: {
  closeDialog: () => void;
}) => {
  const {
    state: { rows, columns },
    dispatch
  } = useContext(AppContext);
  const [newRows, setNewRows] = useState<number>(rows);
  const [newColumns, setNewColumns] = useState<number>(columns);
  const submit = () => {
    closeDialog();
    dispatch({ type: 'newBoard', columns: newColumns, rows: newRows });
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
        <Button
          style={{
            fontFamily: 'SF Alien Encounters'
          }}
          size="small"
          mini
          variant="outlined"
          target="_blank"
          onClick={submit}
        >
          New Board
        </Button>
      </Layout>
    </>
  );
};
