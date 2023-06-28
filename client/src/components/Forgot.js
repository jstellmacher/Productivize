import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMail } from 'react-icons/fi';

const Forgot = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(`Hello, ${data.username}! Reset password email sent.`);
      } else {
        setMessage('Failed to send reset password email.');
        console.error('Request failed:', response);
      }
    } catch (error) {
      setMessage('An error occurred while sending the request.');
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-milky">
      <div className="max-w-3xl w-full bg-white rounded-lg shadow-md p-8">
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          <form onSubmit={handleSubmit} className="lg:w-1/2">
            <h1 className="text-4xl font-semibold mb-8">Forgot Username or Password</h1>
            {message && <p className="text-lg text-green-500 mb-4">{message}</p>}
            <div className="mb-4">
              <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                Email
              </label>
              <div className="flex items-center bg-white border border-blue-500 rounded-lg shadow-sm">
                <span className="text-gray-500 mx-2">
                  <FiMail />
                </span>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                Submit
              </button>
            </div>
            <div className="mt-4 text-blue-500 text-lg">
              <Link to="/login">Back to Login</Link>
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

export default Forgot;
