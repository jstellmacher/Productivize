import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppC";
import { TiPlus, TiDelete, TiEdit, TiPuzzle, TiFilter } from "react-icons/ti";
import { useHistory } from "react-router-dom";

const Dash = () => {
  const { user, addPage, removePage, editPageTitle } = useContext(AppContext);
  const [pages, setPages] = useState([]);
  const history = useHistory();
  const [editingPageId, setEditingPageId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [filterOldestFirst, setFilterOldestFirst] = useState(false);

  useEffect(() => {
    // Sort pages based on the created_at field
    let sortedPages = Array.isArray(user?.pages)
      ? [...user.pages]
      : [
          { id: 1, title: "Example Page 1", created_at: new Date() },
          { id: 2, title: "Page 2", created_at: new Date() },
        ];
  
    sortedPages.sort((a, b) => {
      if (filterOldestFirst) {
        return new Date(a.created_at) - new Date(b.created_at);
      } else {
        return new Date(b.created_at) - new Date(a.created_at);
      }
    });
  
    setPages(sortedPages);
  }, [user, filterOldestFirst]);
  

  const handleAddPage = () => {
    const newPage = { title: "New Page" };
    addPage(newPage);
  };


  const handleDeletePage = (event, pageId) => {
    event.stopPropagation();
    removePage(pageId);
  };

  const handleEditPage = (pageId) => {
    history.push(`/page/${pageId}`);
  };

  const handleTitleEdit = (event, pageId) => {
    event.stopPropagation();
    setEditingPageId(pageId);
  };

  const handleTitleChange = (event) => {
    setEditedTitle(event.target.value);
  };

  const handleTitleSave = (event, pageId) => {
    event.stopPropagation();
    if (editedTitle.trim() !== "") {
      editPageTitle(pageId, editedTitle);
    }
    setEditingPageId(null);
    setEditedTitle("");
  };

  useEffect(() => {
    console.log("Pages updated:", pages);
  }, [pages]);

  return (
    <div className="space-y-2">
      <h1 className="font-bold text-3xl mt-2">Dashboard</h1>
      <div>
        {user ? (
          <h2 className="font-semibold flex items-center">
            Welcome, {user.username || "User"}! Happy Building
            <TiPuzzle className="h-10 w-10 mr-2 text-blue-500" />
          </h2>
        ) : (
          <h2 className="font-semibold text-red-500">LOG IN NOW</h2>
        )}
      </div>
      <div className="rounded-xl shadow-xl bg-gray-400 border-slate-900 h-[80vh] p-4 overflow-y-auto">
        <div className="flex items-center justify-end mb-4">
          <div className="flex items-center">
            <TiFilter className="h-6 w-6 text-gray-600" />
            <label className="ml-2 text-gray-700">
              <input
                type="checkbox"
                className="mr-1"
                checked={filterOldestFirst}
                onChange={() => setFilterOldestFirst(!filterOldestFirst)}
              />
              Oldest First
            </label>
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <div
            className="bg-white rounded-lg shadow-xl cursor-pointer flex justify-center items-center w-40 h-40 sm:w-56 sm:h-56 hover:bg-blue-200"
            onClick={handleAddPage}
          >
            <div className="p-2">
              <TiPlus className="h-10 w-10 sm:h-14 sm:w-14 text-blue-500" />
            </div>
          </div>
  
          {user.pages.map((page) => (
            <div key={page.id}>
              <div
                className="relative bg-white rounded-lg shadow-xl cursor-pointer flex flex-col justify-center w-40 h-40 sm:w-56 sm:h-56 hover:bg-blue-200"
                onClick={() => handleEditPage(page.id)}
              >
                {editingPageId === page.id ? (
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={handleTitleChange}
                    onBlur={(event) => handleTitleSave(event, page.id)}
                    className="text-lg font-semibold bg-transparent border-b focus:outline-none focus:border-blue-500"
                    autoFocus
                  />
                ) : (
                  <div className="justify-center text-center">
                    <h3
                      className="text-lg font-semibold cursor-pointer"
                      onClick={(event) => handleTitleEdit(event, page.id)}
                    >
                      {page.title}
                    </h3>
                  </div>
                )}
  
                <div className="flex justify-between absolute top-0 w-full">
                  <button
                    onClick={() => handleEditPage(page.id)}
                    className="text-blue-500"
                  >
                    <TiEdit className="w-8 h-8 sm:w-10 sm:h-10" />
                  </button>
                  <button
                    onClick={(event) => handleDeletePage(event, page.id)}
                    className="text-red-500"
                  >
                    <TiDelete className="w-6 h-6 sm:w-8 sm:h-8 hover:bg-blue-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
  
      <div>
        <p>Have fun exploring the dashboard!</p>
        <p>More exciting features coming soon.</p>
      </div>
    </div>
  );
  
  
};

export default Dash;
