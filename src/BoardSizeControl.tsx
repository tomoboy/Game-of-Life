import React, { Fragment, SyntheticEvent } from "react";
import styled from "styled-components";
import { newBoard } from "./actions/appActions";
import Header2 from "./atomicComponents/Header2";
import { dispatchAction } from "./baseStream$";
import { Button, StyledInput } from "./atomicComponents/StyledInput";
import { connect } from "./streamUtils";
import { appSettings$ } from "./AppSettings$";
const MIN_SIZE = 54;

interface IProps {
  rows: number;
  columns: number;
}
interface INumberInputProps {
  label: string;
  placeholder: number;
}

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

const NumberInput = ({ label, placeholder }: INumberInputProps) => {
  return (
    <label>
      {label}
      <StyledInput
        type="number"
        placeholder={placeholder.toString()}
        min={MIN_SIZE}
        max="2000"
      />
    </label>
  );
};

const SubmitButton = () => <Button type="submit" value="New Board" />;
const onSubmit = (event: SyntheticEvent) => {
  event.preventDefault();
  dispatchAction(
    newBoard({ columns: event.target[1].value, rows: event.target[0].value })
  );
};

const BoardSizeControl = ({ rows, columns }: IProps) => {
  return (
    <Fragment>
      <Header2>Board size</Header2>
      <form onSubmit={onSubmit}>
        <Layout>
          <NumberInput label="Rows: " placeholder={rows} />
          <NumberInput label="Columns: " placeholder={columns} />
          <SubmitButton />
        </Layout>
      </form>
    </Fragment>
  );
};
export default connect(
  BoardSizeControl,
  appSettings$
);
