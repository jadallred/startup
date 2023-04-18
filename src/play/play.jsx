import React from 'react';

import { Players } from './players';
import { SwimmingNarwhal } from './swimmingnarwhal';

export function Play(props) {
  return (
    <main className='bg-secondary'>
      <Players userName={props.userName} />
      <SwimmingNarwhal userName={props.userName} />
    </main>
  );
}