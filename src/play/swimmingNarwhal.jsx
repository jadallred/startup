import React from 'react';
import styled from "styled-components";
import { useEffect, useState } from "react";
import './swimmingNarwhal.css';

const NARWHAL_HEIGHT = 28;
const NARWHAL_WIDTH = 33;
const WALL_HEIGHT = 600;
const WALL_WIDTH = 400;
const GRAVITY = 8;
const OBJ_WIDTH = 52;
const OBJ_SPEED = 6;
const OBJ_GAP = 200;
function App() {
  const [isStart, setIsStart] = useState(false);
  const [narwhalpos, setBirspos] = useState(300);
  const [objHeight, setObjHeight] = useState(0);
  const [objPos, setObjPos] = useState(WALL_WIDTH);
  const [score, setScore] = useState(0);
  useEffect(() => {
    let intVal;
    if (isStart && narwhalpos < WALL_HEIGHT - NARWHAL_HEIGHT) {
      intVal = setInterval(() => {
        setBirspos((narwhalpos) => narwhalpos + GRAVITY);
      }, 24);
    }
    return () => clearInterval(intVal);
  });

  useEffect(() => {
    let objval;
    if (isStart && objPos >= -OBJ_WIDTH) {
      objval = setInterval(() => {
        setObjPos((objPos) => objPos - OBJ_SPEED);
      }, 24);

      return () => {
        clearInterval(objval);
      };
    } else {
      setObjPos(WALL_WIDTH);
      setObjHeight(Math.floor(Math.random() * (WALL_HEIGHT - OBJ_GAP)));
      if (isStart) setScore((score) => score + 1);
    }
  }, [isStart, objPos]);

  useEffect(() => {
    let topObj = narwhalpos >= 0 && narwhalpos < objHeight;
    let bottomObj =
      narwhalpos <= WALL_HEIGHT &&
      narwhalpos >=
        WALL_HEIGHT - (WALL_HEIGHT - OBJ_GAP - objHeight) - NARWHAL_HEIGHT;

    if (
      objPos >= OBJ_WIDTH &&
      objPos <= OBJ_WIDTH + 80 &&
      (topObj || bottomObj)
    ) {
      setIsStart(false);
      setBirspos(300);
      setScore(0);
    }
  }, [isStart, narwhalpos, objHeight, objPos]);
  const handler = () => {
    if (!isStart) setIsStart(true);
    else if (narwhalpos < narwhal_HEIGHT) setBirspos(0);
    else setBirspos((narwhalpos) => narwhalpos - 50);
  };
  return (
    <Home onClick={handler}>
      <span>Score: {score}</span>
      <Background height={WALL_HEIGHT} width={WALL_WIDTH}>
        {!isStart ? <Startboard>Click To Start</Startboard> : null}
        <Obj
          height={objHeight}
          width={OBJ_WIDTH}
          left={objPos}
          top={0}
          deg={180}
        />
        <narwhal
          height={NARWHAL_HEIGHT}
          width={NARWHAL_WIDTH}
          top={narwhalpos}
          left={100}
        />
        <Obj
          height={WALL_HEIGHT - OBJ_GAP - objHeight}
          width={OBJ_WIDTH}
          left={objPos}
          top={WALL_HEIGHT - (objHeight + (WALL_HEIGHT - OBJ_GAP - objHeight))}
          deg={0}
        />
      </Background>
    </Home>
  );
}

export default App;

const Home = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Background = styled.div`
  background-image: url("/Users/jadallred/startup/public/underwater.jpg");
  background-repeat: no-repeat;
  background-size: ${(props) => props.width}px ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  position: relative;
  overflow: hidden;
  border: 2px solid black;
`;

const narwhal = styled.div`
  position: absolute;
  background-image: url("/Users/jadallred/startup/public/narwhal.png");
  background-repeat: no-repeat;
  background-size: ${(props) => props.width}px ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
`;

const Obj = styled.div`
  position: relative;
  background-image: url("/Users/jadallred/startup/public/pipe-green.png");
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  left: ${(props) => props.left}px;
  top: ${(props) => props.top}px;
  transform: rotate(${(props) => props.deg}deg);
`;

const Startboard = styled.div`
  position: relative;
  top: 49%;
  background-color: black;
  padding: 10px;
  width: 100px;
  left: 50%;
  margin-left: -50px;
  text-align: center;
  font-size: 20px;
  border-radius: 10px;
  color: #fff;
  font-weight: 600;
`;

const ScoreShow = styled.div`
  text-align: center;
  background: transparent;
`;