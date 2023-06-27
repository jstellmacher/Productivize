import React from 'react';
import { useDrag } from 'react-dnd';
import { BlockTypes } from './BlockTypes';

const PageBlock = ({ block, blockType, onDrop }) => {
  const [{ isDragging }, drag] = useDrag({
    type: BlockTypes[blockType],
    item: { id: block.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleDrop = () => {
    onDrop();
  };

  const renderBlockContent = () => {
    switch (block.type) {
      case BlockTypes.TEXT:
        return <p className="text-gray-800">{block.content}</p>;
      case BlockTypes.HEADING:
        return <h1 className="text-2xl font-bold">{block.content}</h1>;
      case BlockTypes.IMAGE:
        return <img src={block.content} alt={block.title} />;
      case BlockTypes.VIDEO:
        return (
          <div className="video-container">
            <iframe
              title={block.title}
              src={block.content}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        );
      case BlockTypes.BULLETED_LIST:
        return (
          <ul className="list-disc pl-4">
            {block.content.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        );
      case BlockTypes.NUMBERED_LIST:
        return (
          <ol className="list-decimal pl-4">
            {block.content.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        );
      case BlockTypes.TOGGLE:
        return <div>Toggle Block Content</div>;
      case BlockTypes.QUOTE:
        return (
          <blockquote className="text-xl italic border-l-4 pl-4 border-gray-500">
            {block.content}
          </blockquote>
        );
      case BlockTypes.DIVIDER:
        return <hr />;
      case BlockTypes.CALLOUT:
        return (
          <div className="bg-yellow-200 p-4 rounded-lg">
            <p>{block.content}</p>
          </div>
        );
      case BlockTypes.CODE:
        return (
          <pre className="bg-gray-900 text-white p-4 rounded-lg">
            <code>{block.content}</code>
          </pre>
        );
      default:
        return null;
    }
  };
  

  const renderInputs = () => {
    if (block.inputs) {
      return block.inputs.map(input => (
        <div key={input.id}>
          <label>{input.label}</label>
          <input
            type="text"
            value={input.value}
            placeholder={input.placeholder}
            readOnly
          />
        </div>
      ));
    }
    return null;
  };
  

  return (
    <div
      ref={drag}
      className={`border p-2 ${isDragging ? 'opacity-50' : ''}`}
      onDrop={handleDrop}
    >
      <p>{block.title}</p>
      {renderBlockContent()}
      {renderInputs()}
    </div>
  );
};

export default PageBlock;
