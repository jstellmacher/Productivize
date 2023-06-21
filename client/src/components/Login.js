import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    errorMessage: '',
    loggedInUsername: '',
  });

  const { username, password, errorMessage, loggedInUsername } = formData;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Login successful
        const { username } = await response.json();
        setFormData({ ...formData, loggedInUsername: username });
      } else {
        // Login failed
        const { message } = await response.json();
        setFormData({ ...formData, errorMessage: message });
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setFormData({
        ...formData,
        errorMessage: 'An error occurred while logging in. Please try again.',
      });
    }
  };

  return (
    <div className="min-h-screen bg-milky flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="flex justify-center bg-gray-100 rounded-md sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="m-4 text-center text-3xl font-extrabold text-gray-900">Log In To Be Productive!</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {errorMessage && <p className="mb-4 text-red-500 text-sm">{errorMessage}</p>}
          {loggedInUsername && (
            <p className="mb-4 text-green-500 text-sm">Logged in successfully as {loggedInUsername}</p>
          )}
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="username"
                  autoComplete="username"
                  name="username"
                  value={username}
                  onChange={handleInputChange}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  name="password"
                  value={password}
                  onChange={handleInputChange}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Log in
              </button>
            </div>

            <div className="mt-2 text-center">
              <p className="text-sm text-gray-600">
                <Link to="/forgot" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot Password/Username?
                </Link>
              </p>
            </div>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
