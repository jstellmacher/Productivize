import React, { useEffect, useState } from 'react';
import PageItem from './PageItem';

const Pages = () => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    fetch('/pages')
      .then(response => response.json())
      .then(data => setPages(data))
      .catch(error => console.error('Error fetching pages:', error));
  }, []);

  const handleDrop = (pageId, blockId) => {
    console.log(`Block ${blockId} dropped on Page ${pageId}`);
  };

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
          pages.map(page => (
            <div key={page.id} className="bg-white rounded-lg shadow p-4">
              <h3 className="text-lg font-semibold mb-4">{page.title}</h3>
              <div className="grid grid-cols-2 gap-4">
                {page.blocks.map(block => (
                  <PageItem
                    key={block.id}
                    block={block}
                    onDrop={() => handleDrop(page.id, block.id)}
                    className="bg-gray-200 rounded p-4"
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Pages;
