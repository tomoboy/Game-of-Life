import React from "react";
import styled from "styled-components";

const SpanLayout = styled.span`
  position: fixed;
  top: 10px;
  right: 100px;
`;

const GenerationLayout = styled.span`
  position: fixed;
  top: 10px;
  right: 10px;
`;
export const GenerationCounter = ({ generation }: { generation: number }) => {
  return (
    <>
      <SpanLayout>Generation: </SpanLayout>
      <GenerationLayout>{generation}</GenerationLayout>
    </>
  );
};
