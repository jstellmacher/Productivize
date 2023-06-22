import React, { useEffect, useState } from 'react';
import PageItem from './PageItem';
import { useDrag, useDrop } from 'react-dnd';


//! Considerations for myself:
// Pages serve as containers to organize and categorize your content.
// Each page represents a separate entity, such as a document, a project, a note, or any other organizational unit.
// Pages can have a hierarchical structure, with parent pages and child pages.
// You can create multiple pages within your application to represent different categories or topics.
// Pages provide an intuitive way to navigate and access your content.

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
          {pages.map(page => (
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
          ))}
        </div>
      </div>
    );
  };
  
  export default Pages;

// const Pages = () => {
//     const [pages, setPages] = useState([]);
  
//     useEffect(() => {
//       fetch('/pages') // Update the URL to match your API endpoint
//         .then(response => response.json())
//         .then(data => setPages(data))
//         .catch(error => console.error('Error fetching pages:', error));
//     }, []);
  
//     return (
//       <div>
//         <h2>Pages</h2>
//         <ul>
//           {pages.map(page => (
//             <PageItem key={page.id} page={page} />
//           ))}
//         </ul>
//       </div>
//     );
//   };
  
//   export default Pages;