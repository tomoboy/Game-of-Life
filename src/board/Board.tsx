import React, {
  MouseEvent,
  useEffect,
  useState,
  useRef,
  useContext
} from 'react';
import { ChangedState, BoardState } from './types';
import { GenerationCounter } from './GenerationCounter';
import { createEmptyBoardState, createNextHoverState } from './utils';
import { getDrawFunctions } from './drawFunctions';
import { Wrapper } from './BoardWrapper';
import { AppContext } from '../AppContext';

export const Board = () => {
  const {
    state: {
      tileSize,
      isPlaying,
      rows,
      columns,
      newGame,
      selectedShape,
      tickTime,
      isSoundOn
    },
    dispatch
  } = useContext(AppContext);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boardState = useRef<BoardState>(createEmptyBoardState(rows, columns));
  const lastMousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const [hoverState, setHoverState] = useState<ChangedState[]>([]);
  const [[screenWidth, screenHeight], setScreenSize] = useState<
    [number, number]
  >([window.innerWidth, window.innerHeight]);

  const [generation, setGeneration] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<number>(0);

  const handleMouse = (e: MouseEvent<HTMLCanvasElement>) => {
    if (isPlaying) {
      return;
    }
    const canvas = canvasRef.current as HTMLCanvasElement;
    const rect = canvas.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    const [x, y] = [
      (offsetX - (offsetX % tileSize)) / tileSize,
      (offsetY - (offsetY % tileSize)) / tileSize
    ];
    if (
      !isPlaying &&
      (x !== lastMousePosition.current.x ||
        y !== lastMousePosition.current.y) &&
      x < columns &&
      y < rows
    ) {
      setHoverState(
        createNextHoverState(
          x,
          y,
          rows,
          columns,
          selectedShape,
          boardState.current,
          hoverState
        )
      );
      lastMousePosition.current = { x, y };
    }
  };
  const removeHoverState = () => {
    if (!isPlaying) setHoverState([]);
  };

  const {
    drawFullBoard,
    drawHoverState,
    drawNextGeneration
  } = getDrawFunctions(canvasRef, tileSize, isSoundOn);

  useEffect(() => {
    if (newGame) {
      boardState.current = createEmptyBoardState(rows, columns);
      drawFullBoard(boardState.current);
      removeHoverState();
      setGeneration(0);
      dispatch({ type: 'setNewGame', newGame: false });
    } else {
      drawFullBoard(boardState.current);
    }
    // eslint-disable-next-line
  }, [newGame]);

  useEffect(() => {
    if (hoverState.length) {
      drawHoverState(hoverState);
    } else {
      drawFullBoard(boardState.current);
    }
    // eslint-disable-next-line
  }, [hoverState]);

  useEffect(() => {
    if (generation > 0) {
      drawNextGeneration(boardState.current);
    } // eslint-disable-next-line
  }, [generation]);

  const startGame = () =>
    setIntervalId(
      setInterval(() => setGeneration(generation => generation + 1), tickTime)
    );

  useEffect(() => {
    //Change speed
    if (isPlaying) {
      clearInterval(intervalId);
      startGame();
    }
  }, [tickTime]);

  useEffect(() => {
    if (isPlaying) {
      clearInterval(intervalId);
    }
    drawFullBoard(boardState.current);
    if (isPlaying) {
      startGame();
    }
  }, [tileSize]);

  useEffect(() => {
    //start/stop game
    if (isPlaying && !intervalId) {
      startGame();
    } else if (!isPlaying && intervalId) {
      clearInterval(intervalId);
      setIntervalId(0);
    }
    return () => clearInterval(intervalId);
    // eslint-disable-next-line
  }, [isPlaying]);

  useEffect(() => {
    const screenSizeChangeHandler = () => {
      if (
        window.innerWidth !== screenWidth ||
        window.innerHeight !== screenHeight
      ) {
        setScreenSize([window.innerWidth, window.innerHeight]);
      }
    };
    window.addEventListener('resize', screenSizeChangeHandler);
    return () => window.removeEventListener('resize', screenSizeChangeHandler);
  }, []);

  return (
    <Wrapper width={screenWidth} height={screenHeight}>
      <GenerationCounter generation={generation} />
      <canvas
        id="boardCanvas"
        ref={canvasRef}
        width={columns * tileSize}
        height={rows * tileSize}
        onMouseMove={handleMouse}
        onMouseLeave={removeHoverState}
        onClick={() => {
          if (!isPlaying) {
            hoverState.forEach(
              ({ y, x, alive }) => (boardState.current[y][x] = alive)
            );
          }
        }}
      />
    </Wrapper>
  );
};
