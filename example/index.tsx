import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Count from './components/Count';
import MinusButton from './components/MinusButton';
import PlusButton from './components/PlusButton';

const App = () => {
  return (
    <div className="App">
      <Count />
      <div>
        <MinusButton />
        <PlusButton />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
