import React, { useState } from 'react';

import * as styles from './card.module.scss';

export const Card = ({ title, desc, children, dragZone }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div className={styles.card}>
        <div className={styles.info}>
          <h3>{title}</h3>
          <p>{desc}</p>
          <button
            className={styles['primary-button']}
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? 'Close' : 'Open'}
          </button>
          {dragZone}
        </div>
        {expanded && <div className={styles.expandable}>{children}</div>}
      </div>
    </>
  );
};
