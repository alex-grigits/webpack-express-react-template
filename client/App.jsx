import React, { useEffect, useState } from 'react';

import { Card } from './Card';

import './styles.module.css';

const App = () => {
  const [message, setMessage] = useState('');
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchMessage = async () => {
      const url = '/api/example';

      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log({ data });
        setMessage(data.message);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMessage();
  }, []);

  return (
    <div>
      <h1>Hello, React, Webpack and Express!!</h1>
      <p>{message}</p>
      <button onClick={() => setCount((prev) => prev + 1)}>
        Count {count}
      </button>
      <div>
        <Card />
      </div>
    </div>
  );
};

export default App;
