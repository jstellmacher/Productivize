import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppC';
import { FiMail, FiGithub, FiLinkedin, FiLock } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Login = () => {
  const { login } = useContext(AppContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      username: username,
      password: password,
    };
    login(userData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-milky">
      <div className="max-w-3xl w-full bg-white rounded-lg shadow-md p-8">
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          <form onSubmit={handleSubmit} className="lg:w-1/2">
            <h1 className="text-4xl font-semibold mb-8">Login Below</h1>
            <div className="mb-4">
              <label htmlFor="username" className="block text-lg font-medium text-gray-700">
                Username
              </label>
              <div className="flex items-center bg-white border border-blue-500 rounded-lg shadow-sm">
                <span className="text-gray-500 mx-2">
                  <FiMail />
                </span>
                <input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full py-2 px-4 outline-none text-lg"
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-lg font-medium text-gray-700">
                Password
              </label>
              <div className="flex items-center bg-white border border-blue-500 rounded-lg shadow-sm">
                <span className="text-gray-500 mx-2">
                  <FiLock />
                </span>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full py-2 px-4 outline-none text-lg"
                />
              </div>
            </div>
            <div className="flex items-center justify-start">
              <button
                type="submit"
                className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Log In
              </button>
            </div>
            <div className="mt-4 text-blue-500 text-lg md:flex md:space-x-4 lg:justify-start">
              <div className="flex items-center">
                <Link to="/forgot" className="block md:inline-block">Forgot password?</Link>
              </div>
              <div className="flex items-center mx-2">
                <p className="text-gray-500">Or</p>
              </div>
              <div className="flex items-center">
                <Link to="/signup" className="block md:inline-block">Create Account</Link>
              </div>
            </div>
            <div className="flex justify-center md:space-x-4 mt-4 sm:mb-4">
              <a href="https://github.com/jstellmacher">
                <FiGithub className="text-3xl text-gray-500 hover:text-blue-500" />
              </a>
              <a href="https://www.linkedin.com/in/jaichuang-stellmacher/">
                <FiLinkedin className="text-3xl text-gray-500 hover:text-blue-500" />
              </a>
            </div>
          </form>
          <div className="lg:w-1/2">
            <img
              src="https://picsum.photos/1200/800"
              alt="Placeholder"
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
