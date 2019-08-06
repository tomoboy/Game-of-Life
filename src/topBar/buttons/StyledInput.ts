import styled from "styled-components";

export const StyledInput = styled.input`
  padding: 4px 8px;
  min-width: 64px;
  border: 1px solid rgba(0, 0, 0, 0.23);
  box-sizing: border-box;
  border-radius: 4px;
  background-color: transparent;
  text-transform: uppercase;
`;

export const Button = styled(StyledInput)`
  cursor: pointer;
`;
