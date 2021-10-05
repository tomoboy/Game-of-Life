import React, {
  MouseEvent,
  useEffect,
  useState,
  useRef,
  useContext,
  RefObject
} from 'react';
import { ChangedState, BoardState } from './types';
import { GenerationCounter } from './GenerationCounter';
import {
  createEmptyBoardState,
  createNextHoverState,
  getHeatMap
} from './utils';
import {
  drawFullBoard,
  drawHoverState,
  drawNextGeneration
} from './drawFunctions';
import { Wrapper } from './BoardWrapper';
import { AppContext } from '../AppContext';
import { getNextGeneration } from './gameLogic';

const getCellLifeStatus = (boardState: RefObject<BoardState>) => {
  return boardState.current && boardState.current.currentBoard;
};

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

  const drawFunctionArgs = {
    canvasRef,
    tileSize,
    isSoundOn: true,
    boardState: boardState.current,
    generation,
    hoverState
  };

  useEffect(() => {
    if (newGame) {
      boardState.current = createEmptyBoardState(rows, columns);
      drawFullBoard(drawFunctionArgs);
      removeHoverState();
      setGeneration(0);
      dispatch({ type: 'setNewGame', newGame: false });
    } else {
      drawFullBoard(drawFunctionArgs);
    }
    // eslint-disable-next-line
  }, [newGame]);

  useEffect(() => {
    if (hoverState.length) {
      drawHoverState(drawFunctionArgs);
    } else {
      drawFullBoard(drawFunctionArgs);
    }
    // eslint-disable-next-line
  }, [hoverState]);

  useEffect(() => {
    if (generation > 0) {
      const { currentBoard, history, changes } = getNextGeneration(
        boardState.current,
        generation
      );
      const newBoardState = {
        ...boardState.current,
        currentBoard,
        history,
        heatMap: getHeatMap(boardState.current)
      };
      boardState.current = newBoardState;

      drawNextGeneration({
        ...drawFunctionArgs,
        boardState: newBoardState,
        changes
      });
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
    drawFullBoard(drawFunctionArgs);
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
          if (!isPlaying && getCellLifeStatus(boardState)) {
            hoverState.forEach(
              ({ y, x, alive }) =>
                (getCellLifeStatus(boardState)![y][x] = alive)
            );
          }
        }}
      />
    </Wrapper>
  );
};
