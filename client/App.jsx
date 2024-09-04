import React, { useEffect, useState } from 'react';

import { Card } from './Card';
import DraggableList from './Draggable.component';

import './styles.css';

const App = () => {
  const items = [
    <Card key={1} title="test 1" desc="description 1" sortData="sort data 1">
      <div className="flex">
        <div>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod iure
          eaque voluptatibus ea tempora, unde enim suscipit saepe. A, eos.
        </div>
        <div style={{ display: 'flex', padding: '30px' }}>
          <DraggableList>
            <p key={11}>Item 1</p>
            <p key={12}>Item 2</p>
            <p key={13}>Item 3</p>
            <p key={14}>Item 4</p>
          </DraggableList>
        </div>
      </div>
    </Card>,
    <Card key={2} title="test 2" desc="description 2" sortData="sort data 2">
      <div className="flex">
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
          vero.
        </div>
        <div style={{ display: 'flex', padding: '30px' }}>
          <DraggableList>
            <p key={21}>Item 1</p>
            <p key={22}>Item 2</p>
          </DraggableList>
        </div>
      </div>
    </Card>,
  ];

  const onSort = (list) => {
    console.log({ list });
  };

  return (
    <div>
      <h1>React custom dnd</h1>
      <DraggableList onSort={onSort} dynamic>
        {items.map((item) => item)}
      </DraggableList>
    </div>
  );
};

export default App;
