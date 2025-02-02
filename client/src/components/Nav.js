import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { RiHome4Line, RiLogoutCircleLine, RiLoginCircleLine, RiInformationLine, RiUserLine, RiCalendarLine } from 'react-icons/ri';
import { AppContext } from '../context/AppC';

const Nav = () => {
  const { user, logout } = useContext(AppContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-800 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/dash" className="text-white flex items-center space-x-2">
            <RiHome4Line className="text-xl" />
            <span className="text-sm font-medium">Home</span>
          </Link>
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4 5h16v2H4V5zm0 6h16v2H4v-2zm0 6h16v2H4v-2z"
                  />
                )}
              </svg>
            </button>
          </div>
          <ul className={`lg:flex ${isMenuOpen ? 'block' : 'hidden'} space-y-2 lg:space-y-0 lg:space-x-4`}>
            <li>
              <Link
                to="/about"
                className="text-white flex items-center space-x-2 hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
              >
                <RiInformationLine className="text-xl" />
                <span>About</span>
              </Link>
            </li>
            <li>
              <Link
                to="/schedule"
                className="text-white flex items-center space-x-2 hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
              >
                <RiCalendarLine className="text-xl" />
                <span>Schedule</span>
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link
                    to="/profile"
                    className="text-white flex items-center space-x-2 hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    <RiUserLine className="text-xl" />
                    <span>{user.username}</span>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={logout}
                    className="text-white flex items-center space-x-2 hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    <RiLogoutCircleLine className="text-xl" />
                    <span>Logout</span>
                  </button>
                </li>
              </>
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
