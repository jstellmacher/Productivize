import React, { useContext } from "react";
import { AppContext } from "../context/AppC";
import { TiPlus, TiDelete, TiEdit } from "react-icons/ti";
import { useHistory } from "react-router-dom";

const Dash = () => {
  const { user, addPage, removePage } = useContext(AppContext);
  const pages = Array.isArray(user?.pages)
    ? user.pages
    : [
        { id: 1, title: "Example Page 1" },
        { id: 2, title: "Page 2" },
      ];

  const history = useHistory();

  const handleAddPage = () => {
    addPage();
  };

  const handleDeletePage = (pageId) => {
    removePage(pageId);
  };

  const handleEditPage = (pageId) => {
    history.push(`/page/edit/${pageId}`);
  };

  const handlePageClick = (pageId) => {
    history.push(`/page/${pageId}`);
  };

  console.log("User:", user);
  console.log("Pages:", pages);

  return (
    <div className="bg-red-500">
      <h1 className="font-bold text-3xl mt-2">Dashboard</h1>
      <div>
        {user ? (
          <h2 className="font-semibold">Welcome, {user.username || "User"}</h2>
        ) : (
          <h2 className="font-semibold text-red-500">LOG IN NOW</h2>
        )}
      </div>

      <p className="text-center">
        No pages found. Click on the button below to create a new page!
      </p>
      <div className="rounded-xl shadow-xl bg-gray-400 border-slate-900 h-[80vh] p-4">
        <div className="flex flex-wrap gap-4 ">
          <div
            className="bg-white rounded-lg shadow-xl cursor-pointer flex justify-center items-center w-40 h-40 sm:w-56 sm:h-56 hover:bg-blue-200"
            onClick={handleAddPage}
          >
            <div className="p-2">
              <TiPlus className="h-10 w-10 sm:h-14 sm:w-14 text-blue-500" />
            </div>
          </div>

          {pages.map((page) => (
            <div key={page.id} onClick={() => handlePageClick(page.id)}>
              <div className="relative bg-white rounded-lg shadow-xl cursor-pointer flex flex-col justify-center w-40 h-40 sm:w-56 sm:h-56 hover:bg-blue-200">
                <div className="justify-center text-center">
                  <h3 className="text-lg font-semibold">{page.title}</h3>
                </div>

                <div className="flex justify-between absolute top-0 w-full">
                  <button
                    onClick={() => handleEditPage(page.id)}
                    className="text-blue-500"
                  >
                    <TiEdit className="w-8 h-8 sm:w-10 sm:h-10" />
                  </button>
                  <button
                    onClick={() => handleDeletePage(page.id)}
                    className="text-red-500"
                  >
                    <TiDelete className="w-6 h-6 sm:w-8 sm:h-8" />
                  </button>
                </div>
                {/* Additional page content */}
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
