import React from 'react';

import '../css/Counter.css';

const Counter = ({ value, onIncrement, onDecrement, onIncrementAsync }) =>
  <div>
    <button onClick={onIncrement}>
      Increment
    </button>
    {' '}
    <button onClick={onDecrement}>
      Decrement
    </button>
    <hr />
    <div>
      Clicked:
      {' '}
      {Number(value)}
      {' '}
      times
    </div>
  </div>;

export default Counter;
