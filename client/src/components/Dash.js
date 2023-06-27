import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppC';
import { TiPlus } from 'react-icons/ti';
import { useHistory } from 'react-router-dom';

const Dash = () => {
  const { user } = useContext(AppContext);
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    if (user) {
      fetchUserPages(user.id);
    }
  }, [user]);

  const fetchUserPages = (userId) => {
    // Make a fetch request to retrieve the user's pages based on the user ID
    // Replace the URL and request options with your actual API endpoint
    fetch(`/pages/${user.id}`)
      .then((response) => response.json())
      .then((data) => {
        setPages(data.pages);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const handleAddPage = () => {
    // Make a fetch request to add a new page for the user
    // Replace the URL and request options with your actual API endpoint
    fetch(`/pages/${user.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((data) => {
        setPages([...pages, data.page]);
      })
      .catch((error) => console.log(error));
  };

  const handleDeletePage = (pageId) => {
    // Make a fetch request to delete a page for the user
    // Replace the URL and request options with your actual API endpoint
    fetch(`/pages/${pageId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          setPages(pages.filter((page) => page.id !== pageId));
        } else {
          console.log('Error deleting page');
        }
      })
      .catch((error) => console.log(error));
  };

  const handlePageClick = (pageId) => {
    history.push(`/page/${pageId}`);
  };

  const title = 'font-semibold';

  return (
    <div className="space-y-5">
      <h1 className="font-bold text-3xl mt-2">Dashboard</h1>
      <div>
  {user ? (
    <h2 className={title}>Welcome, {user.username}</h2>
  ) : user === null ? (
    <h2 className={`${title} text-red-500`}>LOG IN NOW</h2>
  ) : (
    <h2 className={`${title} text-red-500`}>User undefined</h2>
  )}
</div>

  
      {loading ? (
        <p>Loading...</p> // Display a loading state
      ) : (
        <div className="space-y-5">
          <p className="text-center">No pages found. Click on the button below to create a new page!</p>
          <div className="rounded-xl shadow-xl bg-gray-400 border-slate-900 h-[80vh] p-4">
            <div className="container mx-auto">
              {pages && Array.isArray(pages) && pages.length === 0 ? (
                <div className="bg-white rounded-lg shadow-xl p-2 cursor-pointer hover:bg-blue-300 hover:shadow-inner w-28 h-28 sm:w-40 sm:h-40 flex flex-col items-center justify-center" onClick={handleAddPage}>
                  <div className="flex items-center justify-center">
                    <TiPlus className="h-10 w-10 sm:h-14 sm:w-14 text-blue-500" />
                  </div>
                </div>
              ) : (
                pages.map((page) => (
                  <div
                    key={page.id}
                    className="bg-white rounded-lg shadow-md p-4 cursor-pointer"
                    onClick={() => handlePageClick(page.id)}
                  >
                    <h3 className="text-lg font-semibold">{page.title}</h3>
                    {/* Additional page content */}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
  
      <div>
        <p>Have fun exploring the dashboard!</p>
        <p>More exciting features coming soon.</p>
      </div>
    </div>
  );
  
};

export default Dash;
