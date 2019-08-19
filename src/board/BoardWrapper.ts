import styled, { keyframes } from "styled-components";

const slideIn = (width: number) => keyframes`
from {
left: -${width - 40}px
}
to {
left: 0;
}
`;

export const Wrapper = styled.div<{ height: number; width: number }>`
  overflow: auto;
  padding: 20px;
  position: absolute;
  width: ${props => props.width - 40}px;
  height: ${props => props.height - 175}px;
  animation: ${props => slideIn(props.width)} 1s linear;
`;
