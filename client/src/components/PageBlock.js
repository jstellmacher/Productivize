import React from 'react';
import { useDrag } from 'react-dnd';

const PageBlock = ({ block, onDrop }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: 'block', id: block.id },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleDrop = () => {
    onDrop();
  };

  return (
    <div
      ref={drag}
      className={`border p-2 ${isDragging ? 'opacity-50' : ''}`}
      onDrop={handleDrop}
    >
      <p>{block.title}</p>
      {/* Render additional block content */}
    </div>
  );
};

export default PageBlock;
