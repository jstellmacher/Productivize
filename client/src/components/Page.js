import React, { useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import { BlockTypes } from './BlockTypes';
import { FiTrash2, FiSquare, FiCircle, FiTriangle } from 'react-icons/fi';
import PageBlock from './PageBlock';

const Page = ({ page }) => {
  const [blocks, setBlocks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/pages/${page.id}/blocks`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error fetching blocks');
        }
        return response.json();
      })
      .then((data) => {
        console.log('API response:', data);
        setBlocks(data.blocks);
        setError(null);
      })
      .catch((error) => {
        console.error('Error fetching blocks:', error);
        setError(error.message);
      });
  }, [page.id]);

  const handleDrop = (blockId) => {
    console.log(`Block ${blockId} dropped on Page ${page.id}`);
  };

  const [, drop] = useDrop({
    accept: Object.values(BlockTypes), // Pass an array of accepted types
    drop: (item) => handleDrop(item.id),
  });
  
  // const [, drop] = useDrop({
  //   accept: BlockTypes.BLOCK,
  //   drop: (item) => handleDrop(item.id),
  // });

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div ref={drop} className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-4">{page.title}</h3>
      <div className="grid grid-cols-2 gap-4">
        {blocks.length === 0 ? (
          <div className="bg-gray-200 rounded p-4">No blocks available</div>
        ) : (
          blocks.map((block) => (
            <PageBlock
              key={block.id}
              block={block}
              onDrop={() => handleDrop(block.id)}
              className="bg-gray-200 rounded p-4"
            />
          ))
        )}
      </div>
      <div className="lock-to-grid bg-white rounded-lg shadow-xl p-4 mt-4">
        <div className="inner-grid bg-gray-100 rounded-lg p-4 shadow-2xl">
          {/* Grid lines or any other design elements for the lock-to-grid area */}
        </div>
      </div>
      <div className="flex items-center mt-4">
        <div
          className="flex items-center justify-center h-8 w-8 rounded-full bg-red-500 text-white cursor-pointer"
          title="Trash Bin"
        >
          <FiTrash2 size={16} />
        </div>
        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 text-gray-600 ml-2">
          <FiSquare size={16} />
        </div>
        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 text-gray-600 ml-2">
          <FiCircle size={16} />
        </div>
        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 text-gray-600 ml-2">
          <FiTriangle size={16} />
        </div>
      </div>
    </div>
  );
};

const Pages = () => {
  const [pages, setPages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // Add a flag to track the mounted state

    fetch('/pages')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error fetching pages');
        }
        return response.json();
      })
      .then((data) => {
        if (isMounted) {
          // Check if the component is still mounted before updating the state
          console.log('API response:', data);
          setPages(data.pages);
          setError(null);
        }
      })
      .catch((error) => {
        console.error('Error fetching pages:', error);
        setError(error.message);
      });

    return () => {
      isMounted = false; // Cleanup function to update the mounted state when the component unmounts
    };
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">
      <h2 className="text-2xl font-bold mb-8">Pages</h2>
      <div className="grid grid-cols-2 gap-4">
        {pages.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold mb-4">Placeholder Page</h3>
            <div className="bg-gray-200 rounded p-4">No blocks available</div>
          </div>
        ) : (
          pages.map((page) => <Page key={page.id} page={page} />)
        )}
      </div>
    </div>
  );
};

export default Pages;
