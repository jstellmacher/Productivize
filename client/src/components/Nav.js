import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { RiHome4Line, RiPagesLine, RiLogoutCircleLine, RiLoginCircleLine } from 'react-icons/ri';
import { UsersContext } from '../context/Users';

const Nav = () => {
  const { isLoggedIn, logout } = useContext(UsersContext);

  return (
    <nav className="bg-gray-800 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-white flex items-center space-x-2">
            <RiHome4Line className="text-xl" />
            <span className="text-sm font-medium">Home</span>
          </Link>
          <ul className="flex space-x-4">
            <li>
              <Link
                to="/pages"
                className="text-white flex items-center space-x-2 hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
              >
                <RiPagesLine className="text-xl" />
                <span>Pages</span>
              </Link>
            </li>
            {isLoggedIn ? (
              <li>
                <button
                  onClick={logout}
                  className="text-white flex items-center space-x-2 hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <RiLogoutCircleLine className="text-xl" />
                  <span>Logout</span>
                </button>
              </li>
            ) : (
              <li>
                <Link
                  to="/login"
                  className="text-white flex items-center space-x-2 hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <RiLoginCircleLine className="text-xl" />
                  <span>Login</span>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
