import React from 'react';

const DraggableItem = ({ children }) => {
  return (
    <div
      className="draggable-item-content"
      style={{
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #ccc',
        marginBottom: '5px',
        padding: '10px',
        backgroundColor: 'hsla(0, 0%, 100%, 0.4)',
      }}
    >
      <div style={{ flex: 1 }}>{children}</div>
      <div
        className="drag-zone"
        style={{
          width: '40px',
          height: '40px',
          backgroundColor: '#ddd',
          cursor: 'move',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: '10px',
        }}
        draggable={true} // Make the drag zone draggable
      >
        ☰
      </div>
    </div>
  );
};

export default DraggableItem;
