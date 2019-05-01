import React, { ReactChild } from "react";
import styled from "styled-components";
import { colors } from "../colors";

const StyledHeader = styled.h2`
  color: ${colors.grey};
  font-size: 1rem;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 400;
  line-height: 1.75;
`;

interface IProps {
  children: ReactChild;
}
const Header2 = ({ children }: IProps) => (
  <StyledHeader>{children}</StyledHeader>
);
export default Header2;
