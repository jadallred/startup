import React from 'react';

import { Button } from 'react-bootstrap';
import { delay } from './delay';
import { GameEvent, GameNotifier } from './gameNotifier';
import './swimming/narwhal.css';

export function SwimmingNarwhal(props) {
  const userName = props.userName;
  const buttons = new Map();
  const mistakeSound = new Audio(`/error.mp3`);

  const [allowPlayer, setAllowPlayer] = React.useState(false);
  const [sequence, setSequence] = React.useState([]);
  const [playbackPos, setPlaybackPos] = React.useState(0);


  function Game() {
      const [move_speed, setMoveSpeed] = useState(2);
      const [gravity, setGravity] = useState(0.24);
      const [gameState, setGameState] = useState('Start');
      const [score, setScore] = useState(0);
  
      useEffect(() => {
          const narwhal = document.querySelector('.narwhal');
          const img = document.getElementById('narwhal-1');
          const soundPoint = new Audio('sounds effect/point.mp3');
          const soundDie = new Audio('sounds effect/die.mp3');
  
          // getting narwhal element properties
          const narwhalProps = narwhal.getBoundingClientRect();
          // This method returns DOMReact -> top, right, bottom, left, x, y, width and height
          const background = document.querySelector('.background').getBoundingClientRect();
          const scoreVal = document.querySelector('.score_val');
          const message = document.querySelector('.message');
          const scoreTitle = document.querySelector('.score_title');
          img.style.display = 'none';
          message.classList.add('messageStyle');
          document.addEventListener('keydown', (e) => {
              if(e.key == 'Enter' && gameState != 'Play'){
                  document.querySelectorAll('.pipe_sprite').forEach((e) => {
                      e.remove();
                  });
                  img.style.display = 'block';
                  narwhal.style.top = '40vh';
                  setGameState('Play');
                  message.innerHTML = '';
                  scoreTitle.innerHTML = 'Score : ';
                  scoreVal.innerHTML = '0';
                  message.classList.remove('messageStyle');
                  play();
              }
          });
  
          function play(){
            function move(){
                if(gameState != 'Play') return;
                let pipeSprite = document.querySelectorAll('.pipe_sprite');
                pipeSprite.forEach((element) => {
                    let pipeSpriteProps = element.getBoundingClientRect();
                    narwhalProps = narwhal.getBoundingClientRect();
                    if(pipeSpriteProps.right <= 0){
                        element.remove();
                    }else{
                        if(narwhalProps.left < pipeSpriteProps.left + pipeSpriteProps.width && narwhalProps.left + narwhalProps.width > pipeSpriteProps.left && narwhalProps.top < pipeSpriteProps.top + pipeSpriteProps.height && narwhalProps.top + narwhalProps.height > pipeSpriteProps.top){
                            setGameState('End');
                            message.innerHTML = 'Game Over'.fontcolor('red') + '<br>Press Enter To Restart';
                            message.classList.add('messageStyle');
                            img.style.display = 'none';
                            soundDie.play();
                            return;
                        }else{
                            if(pipeSpriteProps.right < narwhalProps.left && pipeSpriteProps.right + move_speed >= narwhalProps.left && element.increase_score == '1'){
                                setScore(score + 1);
                                soundPoint.play();
                            }
                            element.style.left = pipeSpriteProps.left - move_speed + 'px';
                        }
                    }
                });
                requestAnimationFrame(move);
            }
            requestAnimationFrame(move);

            let narwhalDY = 0;
            function applyGravity(){
                if(gameState != 'Play') return;
                narwhalDY = narwhalDY + gravity;
                document.addEventListener('keydown', (e) => {
                    if(e.key == 'ArrowUp' || e.key == ' '){
                        img.src = 'narwhal-2.png';
                        narwhalDY = -7.7
                    }
                });
                let narwhalTop = narwhalProps.top + narwhalDY;
                if(narwhalTop <= background.top || narwhalTop + narwhalProps.height >= background.bottom){
                    setGameState('End');
                    message.innerHTML = 'Game Over'.fontcolor('red') + '<br>Press Enter To Restart';
                    message.classList.add('messageStyle');
                    img.style.display = 'none';
                    soundDie.play();
                    return;
                }else{
                    narwhal.style.top = narwhalTop + 'px';
                }
                requestAnimationFrame(applyGravity);
            }
            requestAnimationFrame(applyGravity);

            let count = 0;
            function createPipe(){
                if(gameState != 'Play') return;
                count++;
                if(count % 100 == 0){
                    let pipeSpriteHeight = 100 + Math.floor(Math.random() * 200);
                    let pipeBottom = document.createElement('div');
                    let pipeTop = document.createElement('div');
                    pipeBottom.setAttribute('class', 'pipe_sprite');
                    pipeTop.setAttribute('class', 'pipe_sprite');
                    pipeBottom.style.height = pipeSpriteHeight + 'px';
                    pipeBottom.style.left = '110vw';
                    pipeTop.style.bottom = pipeSpriteHeight + 150 + 'px';
                    pipeTop.style.left = '110vw';
                    pipeTop.style.transform = 'rotate(180deg)';
                    pipeTop.increase_score = '1';
                    document.querySelector('.background').appendChild(pipeBottom);
                    document.querySelector('.background').appendChild(pipeTop);
                }
                requestAnimationFrame(createPipe);
            }
            requestAnimationFrame(createPipe);
        }

        // cleanup
        return () => {
            document.removeEventListener('keydown');
        }
    }, [gameState]);

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
