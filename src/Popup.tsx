import React, { useEffect } from "react";
import styled from "styled-components";
import { Shape } from "./types";
import { CELL_COLOUR } from "./colors";
const backgroundColor = "whiteSmoke";

const Popup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 20px;
  border-radius: 10px;
  border: 2px solid;
  background-color: ${backgroundColor};
`;
const tileSize = 10;
const cellSize = 9;

export default ({ previewShape }: { previewShape: Shape }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const { columns, rows, pattern } = previewShape;
  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    pattern.forEach((row, y) =>
      row.forEach((alive, x) => {
        ctx.fillStyle = alive ? CELL_COLOUR.living : backgroundColor;
        ctx.fillRect(x * tileSize, y * tileSize, cellSize, cellSize);
      })
    );
  });

  return (
    <Popup>
      <canvas
        id="previewShapeCanvas"
        ref={canvasRef}
        width={columns * 10}
        height={rows * 10}
      />
    </Popup>
  );
};
