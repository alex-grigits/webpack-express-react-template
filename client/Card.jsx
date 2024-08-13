import React from 'react';

import SVG from './icon.svg';
import './card.scss';

export const Card = () => {
  return (
    <div>
      <SVG width="100" height="100" viewBox="0 0 100 100" />
      <h3>Card title example</h3>
      <p>Card description</p>
      <button className="cardButton">Submit</button>
    </div>
  );
};
