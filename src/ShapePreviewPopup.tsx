import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';

import { CELL_COLOUR } from './colors';
import { AppContext } from './AppContext';
const backgroundColor = 'whiteSmoke';

const ShapePreviewPopup = styled.div`
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

export const PreviewShapePopup = () => {
  const {
    state: { previewShape }
  } = useContext(AppContext);

  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const { columns, rows, pattern } =
    previewShape !== null
      ? previewShape
      : { columns: 0, rows: 0, pattern: [[]] };

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas && (canvas.getContext('2d') as CanvasRenderingContext2D);
    pattern.forEach((row, y) =>
      row.forEach((alive, x) => {
        ctx.fillStyle = alive ? CELL_COLOUR.living : backgroundColor;
        ctx.fillRect(x * tileSize, y * tileSize, cellSize, cellSize);
      })
    );
  });

  console.log('previewShape', previewShape);
  return previewShape !== null ? (
    <ShapePreviewPopup>
      <canvas
        id="previewShapeCanvas"
        ref={canvasRef}
        width={columns * 10}
        height={rows * 10}
      />
    </ShapePreviewPopup>
  ) : null;
};
