import React, { useState } from 'react';
import { interval } from 'rxjs';
import { startWith } from 'rxjs/operators';
import logo from './logo.svg';
import './App.css';

function App() {
  const [output, setOutput] = useState('');
  const [style, setStyle] = useState({});
  const [disable, setDisable] = React.useState(false);
  const symb = 'abcdefghijklmnopqrstuvwxyz0123456789';

  const getValue = () => {
    let newStr = '';
    // раскомментировать стр 15 и закомментировать стр 18-20 чтоб проверить как применяются стили к паллиндрому
    // let newStr = 'fa7af';
    // раскомментировать стр 17 и закомментировать стр 18-20 чтоб проверить как применяются стили к паллиндрому
    // let newStr = '78945';
    setDisable(true);
    for (let i = 0; i < 5; i++) {
      newStr += symb[Math.floor(Math.random() * (symb.length - 1))];
    }
    setOutput(newStr);
    if (newStr.includes('0')) {
      setOutput('');
      console.log('includes zero');
    } else if (!/[a-zA-Z]/i.test(newStr)) {
      setStyle({ color: 'blue' });
      setOutput(newStr);
      console.log('only num');
    } else if (newStr === newStr.split('').reverse().join('')) {
      setStyle({ color: 'red' });
      setOutput(newStr);
      console.log('pallindrome');
    } else {
      setStyle({ color: 'yellow' });
      setOutput(newStr);
      console.log('common str');
    }
  };
  const observable$ = interval(3000).pipe(startWith(output));

  return (
    <div className="App">
      <header className="App-header">
        <div className="number" style={style}>
          {output}
        </div>
        <button
          className="number"
          disabled={disable}
          onClick={() => {
            observable$.subscribe(getValue);
          }}
        >
          Start
        </button>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
