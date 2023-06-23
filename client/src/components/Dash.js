import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppC';
import { TiPlus } from 'react-icons/ti'; // Import the TiPlus icon from react-icons

const Dash = () => {
  const [pages, setPages] = useState([]);
  const { user } = useContext(AppContext);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await fetch('/pages');

        if (response.ok) {
          const data = await response.json();
          setPages(data.pages);
        } else {
          console.error('Failed to fetch pages:', response);
        }
      } catch (error) {
        console.error('Error fetching pages:', error);
      }
    };

    fetchPages();
  }, []);

  // Shuffle the pages array to move the example page to the end when user has data
  useEffect(() => {
    if (pages.length > 0) {
      const examplePageIndex = pages.findIndex(page => page.title === 'Example Page');
      if (examplePageIndex !== -1) {
        const examplePage = pages.splice(examplePageIndex, 1)[0];
        setPages([...pages, examplePage]);
      }
    }
  }, [pages]);

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        <div>
          <h2>Welcome, {user ? user.username : ''}</h2>
        </div>
        <div className="border-solid border-2 border-sky-500 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Button for adding new pages */}
          <div className="bg-gray-100 rounded-lg p-4 shadow cursor-pointer border-2 border-gray-400">
            <Link to="/new-page" className="flex justify-center items-center">
              <TiPlus className="w-10 h-10 text-gray-400" />
            </Link>
          </div>

          {pages.map((page) => (
            <div
              key={page.id}
              className="bg-gray-100 rounded-lg p-4 shadow"
            >
              <h2 className="text-xl font-semibold mb-2">{page.title}</h2>
              <p className="text-gray-700">{page.content}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-lg">Have fun exploring the dashboard!</p>
          <p className="text-gray-500">More exciting features coming soon.</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg my-8 mx-auto max-w-3xl h-1/2">
        {/* Content of the div goes here */}
      </div>
    </div>
  );
};

export default Dash;
