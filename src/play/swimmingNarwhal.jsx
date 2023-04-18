import React from 'react';

import { GameEvent, GameNotifier } from './gameNotifier';
import './swimmingNarwhal.css';

import React, { useState, useEffect, useRef } from 'react';

import './style.css';

const MoveSpeed = 2;
const Gravity = 0.24;

function NarwhalGame() {
  const [gameState, setGameState] = useState('Start');
  const [score, setScore] = useState(0);

  const [narwhalPosition, setNarwhalPosition] = useState({ top: '40vh' });
  const [narwhalVelocity, setNarwhalVelocity] = useState(0);
  const [isJumping, setIsJumping] = useState(false);

  const [pipes, setPipes] = useState([]);

  const scoreRef = useRef(null);
  const messageRef = useRef(null);

  useEffect(() => {
    if (gameState === 'Play') {
      // Remove pipes that have left the screen
      setPipes((pipes) => pipes.filter((pipe) => pipe.left > -100));

      // Create new pipe
      if (Math.random() < 0.01) {
        const pipePos = Math.floor(Math.random() * 43) + 8;
        setPipes((pipes) => [
          ...pipes,
          { top: pipePos - 70 + 'vh', left: '100vw', type: 'top' },
          { top: pipePos + 50 + 'vh', left: '100vw', type: 'bottom', scored: false },
        ]);
      }

      // Check collision with pipes
      const narwhalRect = document.getElementById('narwhal').getBoundingClientRect();
      pipes.forEach((pipe) => {
        const pipeRect = document.getElementById(pipe.type).getBoundingClientRect();

        if (
          narwhalRect.left < pipeRect.left + pipeRect.width &&
          narwhalRect.left + narwhalRect.width > pipeRect.left &&
          narwhalRect.top < pipeRect.top + pipeRect.height &&
          narwhalRect.top + narwhalRect.height > pipeRect.top
        ) {
          endGame();
        } else if (!pipe.scored && pipe.left < narwhalRect.left) {
          setScore((score) => score + 1);
          pipe.scored = true;
        }
      });
    }
  }, [gameState, pipes]);

  useEffect(() => {
    if (gameState === 'Play') {
      // Update narwhal position based on velocity
      const newTop = narwhalPosition.top + narwhalVelocity;
      setNarwhalPosition((pos) => ({ ...pos, top: newTop + 'px' }));

      // Apply gravity
      setNarwhalVelocity((vel) => vel + Gravity);

      // Check if narwhal has gone out of screen bounds
      const backgroundRect = document.querySelector('.background').getBoundingClientRect();
      const narwhalRect = document.getElementById('narwhal').getBoundingClientRect();
      if (narwhalRect.top <= 0 || narwhalRect.bottom >= backgroundRect.bottom) {
        endGame();
      }
    }
  }, [gameState, narwhalPosition, narwhalVelocity]);

  function startGame() {
    setScore(0);
    setNarwhalPosition({ top: '40vh' });
    setNarwhalVelocity(0);
    setIsJumping(false);
    setPipes([]);
    setGameState('Play');
  }

  function endGame() {
    setGameState('End');
    const scoreDisplay = scoreRef.current;
    const messageDisplay = messageRef.current;
  }
}
