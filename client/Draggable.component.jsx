// import React, { useEffect, useState, cloneElement } from 'react';

// const DraggableList = ({
//   children,
//   onSort,
//   dynamic = true,
//   disabled = false,
// }) => {
//   const [items, setItems] = useState(React.Children.toArray(children));
//   const [draggedIndex, setDraggedIndex] = useState(null);

//   useEffect(() => {
//     if (dynamic) {
//       setItems(React.Children.toArray(children));
//     }
//   }, [children, dynamic]);

//   const handleDragStart = (index, event) => {
//     if (disabled) return;

//     setDraggedIndex(index);

//     const dragItem = event.target.closest('.draggable-item-content');
//     const dragImage = dragItem.cloneNode(true);

//     dragImage.style.position = 'absolute';
//     dragImage.style.top = '-9999px';
//     document.body.appendChild(dragImage);

//     const rect = dragItem.getBoundingClientRect();
//     const offsetX = event.clientX - rect.left;
//     const offsetY = event.clientY - rect.top;

//     event.dataTransfer.setDragImage(dragImage, offsetX, offsetY);

//     dragItem.style.opacity = '0';
//   };

//   const handleDragOver = (index) => {
//     if (disabled || draggedIndex === index) return;

//     const reorderedItems = [...items];
//     const draggedItem = reorderedItems.splice(draggedIndex, 1)[0];
//     reorderedItems.splice(index, 0, draggedItem);

//     setDraggedIndex(index);
//     setItems(reorderedItems);
//   };

//   const handleDragEnd = (event) => {
//     if (disabled) return;

//     const dragImage = event.dataTransfer.getData('drag-image-id');
//     if (dragImage) {
//       document.body.removeChild(dragImage);
//     }

//     const dragItem = event.target.closest('.draggable-item-content');
//     if (dragItem) {
//       dragItem.style.opacity = '1';
//     }

//     setDraggedIndex(null);

//     const sortedItems = items.map((item) => item.props.sortData);

//     if (onSort) {
//       onSort(sortedItems);
//     }
//   };

//   return (
//     <div>
//       {items.map((item, index) => {
//         const dragZone = (
//           <div
//             className="drag-zone"
//             style={{
//               width: '40px',
//               height: '40px',
//               backgroundColor: '#ddd',
//               cursor: disabled ? 'not-allowed' : 'move',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               marginLeft: '10px',
//             }}
//             draggable={!disabled}
//             onDragStart={(e) => handleDragStart(index, e)}
//             onDragOver={(e) => {
//               e.preventDefault();
//               e.stopPropagation();
//               handleDragOver(index);
//             }}
//             onDragEnd={handleDragEnd}
//           >
//             ☰
//           </div>
//         );
//         return (
//           <div
//             key={item.key || index}
//             className="draggable-item-content"
//             style={{
//               display: 'flex',
//               alignItems: 'center',
//               border: '1px solid #ccc',
//               marginBottom: '5px',
//               backgroundColor:
//                 draggedIndex === index
//                   ? 'hsla(0, 0%, 100%, 0.6)'
//                   : 'hsla(0, 0%, 100%, 0.4)',
//               cursor: disabled ? 'not-allowed' : 'default',
//             }}
//           >
//             {React.isValidElement(item)
//               ? React.cloneElement(item, { dragZone })
//               : item}
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default DraggableList;

import React, { useEffect, useState } from 'react';

import './styles.css';

const DraggableList = ({
  children,
  onSort,
  dynamic = true,
  disabled = false,
}) => {
  const [items, setItems] = useState(children);
  const [draggedIndex, setDraggedIndex] = useState(null);

  useEffect(() => {
    if (dynamic) {
      setItems(children);
    }
  }, [children, dynamic]);

  const copyComputedStyles = (source, target) => {
    const computedStyle = getComputedStyle(source);
    for (let key of computedStyle) {
      target.style[key] = computedStyle[key];
    }
  };

  const handleDragStart = (index, event) => {
    if (disabled) return;

    // Set the dragged index
    setDraggedIndex(index);

    // Create a drag image that represents the entire item visually
    const dragItem = event.target.closest('.draggable-item');
    const dragImage = dragItem.cloneNode(true);

    // Copy computed styles from the original item to the drag image
    copyComputedStyles(dragItem, dragImage);

    // Apply styles to make sure the drag image looks like the original item
    dragImage.style.position = 'absolute';
    dragImage.style.top = '-9999px'; // Position it off-screen to avoid flicker
    document.body.appendChild(dragImage);

    // Calculate the offset if the drag zone is placed after the content
    const rect = dragItem.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;

    event.dataTransfer.setDragImage(dragImage, offsetX, offsetY);

    // Store the drag image for cleanup later
    event.dataTransfer.setData('drag-image-id', dragImage);

    // Hide the original item during dragging
    dragItem.style.opacity = '0';
  };

  const handleDragOver = (index) => {
    if (disabled || draggedIndex === index) return;

    const reorderedItems = [...items];
    const draggedItem = reorderedItems.splice(draggedIndex, 1)[0];
    reorderedItems.splice(index, 0, draggedItem);

    setDraggedIndex(index);
    setItems(reorderedItems);
  };

  const handleDragEnd = (event) => {
    if (disabled) return;

    // Clean up the drag image
    const dragImage = event.dataTransfer.getData('drag-image-id');
    if (dragImage) {
      document.body.removeChild(dragImage);
    }

    // Reset the opacity of the original item
    const dragItem = event.target.closest('.draggable-item');
    if (dragItem) {
      dragItem.style.opacity = '1';
    }

    setDraggedIndex(null);

    const sortedItems = items.map((item) => item.props.sortData);

    if (onSort) {
      onSort(sortedItems);
    }
  };

  return (
    <div>
      {items.map((item, index) => (
        <div
          key={item.key}
          className="draggable-item"
          style={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid #ccc',
            borderBottom: '1px solid #cfcfcf',
            marginBottom: '5px',
            backgroundColor:
              draggedIndex === index
                ? 'hsla(0, 0%, 100%, 0.6)'
                : 'hsla(0, 0%, 100%, 0.4)',
            cursor: disabled ? 'not-allowed' : 'default',
            opacity: draggedIndex === index ? 0 : 1, // Apply opacity change
          }}
        >
          {item}
          <div
            className="drag-zone"
            style={{
              width: '40px',
              height: '40px',
              backgroundColor: '#ddd',
              cursor: disabled ? 'not-allowed' : 'move',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: '10px',
            }}
            draggable={!disabled} // Make only the drag zone draggable
            onDragStart={(e) => handleDragStart(index, e)}
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleDragOver(index);
            }}
            onDragEnd={handleDragEnd}
          >
            ☰
          </div>
        </div>
      ))}
    </div>
  );
};

export default DraggableList;
