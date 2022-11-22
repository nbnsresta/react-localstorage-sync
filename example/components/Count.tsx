import * as React from 'react';
import useLocalStorage from '../../dist';

function Count() {
  const [count] = useLocalStorage('count');
  return <div>{count || 0}</div>;
}

export default Count;
