import React from 'react';

import { Button } from 'react-bootstrap';
import { delay } from './delay';
import { GameEvent, GameNotifier } from './gameNotifier';
import './swimmingNarwhal.css';

export function SwimmingNarwhal(props) {
  const userName = props.userName;

  const [allowPlayer, setAllowPlayer] = React.useState(false);
  const [sequence, setSequence] = React.useState([]);
  const [playbackPos, setPlaybackPos] = React.useState(0);

  function Game() {
    const [moveSpeed, setMoveSpeed] = useState(2);
    const [gravity, setGravity] = useState(0.24);
    const [gameState, setGameState] = useState('Start');
    const [score, setScore] = useState(0);
    const [pipes, setPipes] = useState([]);
    const [narwhalDy, setNarwhalDy] = useState(0);
  
    useEffect(() => {
      const handleKeyDown = (e) => {
        if (e.key === 'Enter' && gameState !== 'Play') {
          setPipes([]);
          setGameState('Play');
          setScore(0);
          play();
        }
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [gameState]);
  
    useEffect(() => {
      const handleKeyUp = (e) => {
        if (e.key === 'ArrowUp' || e.key === ' ') {
          document.getElementById('narwhal-1').src = 'narwhal.png';
        }
      };
      document.addEventListener('keyup', handleKeyUp);
      return () => {
        document.removeEventListener('keyup', handleKeyUp);
      };
    }, []);
  
    const handleNarwhalClick = () => {
      if (gameState === 'Play') {
        setNarwhalDy(-7.7);
        document.getElementById('narwhal-1').src = 'narwhal-2.png';
      }
    };
  
    const play = () => {
      function move() {
        if (gameState !== 'Play') return;
        setPipes((prevPipes) => {
          return prevPipes
            .map((pipe) => {
              pipe.left -= moveSpeed;
              return pipe;
            })
            .filter((pipe) => pipe.right > 0);
        });
        requestAnimationFrame(move);
      }
      requestAnimationFrame(move);
  
      function applyGravity() {
        if (gameState !== 'Play') return;
        setNarwhalDy((prevDy) => prevDy + gravity);
        if (
          narwhalRef.current &&
          (narwhalRef.current.offsetTop <= 0 ||
            narwhalRef.current.getBoundingClientRect().bottom >=
              backgroundRef.current.getBoundingClientRect().bottom)
        ) {
          endGame();
          return;
        }
        requestAnimationFrame(applyGravity);
      }
      requestAnimationFrame(applyGravity);
  
      let pipeSeperation = 160;
      let pipeGap = 50;
      function createPipe() {
        if (gameState !== 'Play') return;
        if (pipeSeperation > 190) {
          pipeSeperation = 0;
          const pipePosi = Math.floor(Math.random() * 43) + 8;
          const newPipe = {
            top: pipePosi - 70 + 'vh',
            left: '100vw',
            increaseScore: true,
          };
          setPipes((prevPipes) => [...prevPipes, newPipe]);
          const newPipe2 = {
            top: pipePosi + pipeGap + 'vh',
            left: '100vw',
            increaseScore: false,
          };
          setPipes((prevPipes) => [...prevPipes, newPipe2]);
        }
        pipeSeperation++;
        requestAnimationFrame(createPipe);
      }
      requestAnimationFrame(createPipe);
      function App() {
        const [count, setCount] = useState(0);
        const incrementCount = () => setCount(count + 1);
        const decrementCount = () => setCount(count - 1);
        
        return (
          <div>
            <h1>Counter App</h1>
            <p>Current Count: {count}</p>
            <button onClick={incrementCount}>Increment</button>
            <button onClick={decrementCount}>Decrement</button>
          </div>
        );
      }
    }      


  return (
    <div className='game'>
      <div className='button-container'>
        <>{buttonArray}</>
        <div className='controls center'>
          <div className='game-name'>
            Simon<sup>&reg;</sup>
          </div>
          <div className='score center'>{sequence.length === 0 ? '--' : sequence.length - 1}</div>
          <Button variant='primary' onClick={() => reset()}>
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
  }
}