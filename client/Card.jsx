import React from 'react';

import SVG from './icon.svg';
import * as styles from './card.module.scss';

export const Card = () => {
  // console.log({ styles });
  return (
    <div>
      <SVG width="100" height="100" viewBox="0 0 100 100" />
      <h3>Card title example</h3>
      <p>Card description</p>
      <button className={styles['primary-button']}>Submit12</button>
    </div>
  );
};
