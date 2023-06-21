import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  const isLoggedIn = sessionStorage.getItem('userSession') !== null;

  const handleLogout = () => {
    // Clear the user session in the backend
    // Redirect the user to the login page or home page
    sessionStorage.removeItem('userSession');
    // Redirect logic goes here
  };

  return (
    <nav className="bg-gray-800 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex space-x-4">
          <li>
            <Link
              to="/"
              className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/pages"
              className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
            >
              Pages
            </Link>
          </li>
          {isLoggedIn ? (
            <li>
              <button
                onClick={handleLogout}
                className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </li>
          ) : (
            <li>
              <Link
                to="/login"
                className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
