import * as React from 'react';
import useLocalStorage from '../../dist';

function MinusButton() {
  const [count, setCount] = useLocalStorage('count');

  return (
    <button
      onClick={() => {
        setCount(String(Number(count) - 1));
      }}
    >
      -
    </button>
  );
}

export default MinusButton;
