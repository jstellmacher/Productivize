import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppC";
import { FiMail, FiLock } from "react-icons/fi";

//  useHistory,

const Signup = () => {
  const { signup } = useContext(AppContext);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  // const history = useHistory();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // Prevent form submission if there are validation errors
    }

    try {
      const response = await signup(formData);

      if (response.ok) {
        
      } else {
        
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      setErrorMessage("An error occurred while signing up. Please try again.");
    }
  };

  const validateForm = () => {
    const errors = {};

    if (formData.username.trim() === "") {
      errors.username = "Username is required";
    }

    if (formData.password.trim() === "") {
      errors.password = "Password is required";
    }

    if (formData.email.trim() === "") {
      errors.email = "Email is required";
    }

    return errors;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-milky">
      <div className="max-w-3xl w-full bg-white rounded-lg shadow-md p-8">
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          <form onSubmit={handleSignup} className="lg:w-1/2">
            <h1 className="text-4xl font-semibold mb-8">Sign Up</h1>
            {errorMessage && (
              <p className="mb-4 text-red-500 text-sm">{errorMessage}</p>
            )}
            <div className="mb-4">
              <label htmlFor="username" className="block text-lg font-medium text-gray-700">
                Username<span className="text-red-500">*</span>
              </label>
              <div className={`flex items-center bg-white border border-blue-500 rounded-lg shadow-sm ${errors.username ? 'border-red-500' : ''}`}>
                <span className="text-gray-500 mx-2">
                  <FiMail />
                </span>
                <input
                  id="username"
                  type="text"
                  autoComplete="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  className="w-full py-2 px-4 outline-none text-lg"
                  placeholder="Enter your username"
                />
              </div>
              {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-lg font-medium text-gray-700">
                Password<span className="text-red-500">*</span>
              </label>
              <div className={`flex items-center bg-white border border-blue-500 rounded-lg shadow-sm ${errors.password ? 'border-red-500' : ''}`}>
                <span className="text-gray-500 mx-2">
                  <FiLock />
                </span>
                <input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full py-2 px-4 outline-none text-lg"
                  placeholder="Enter your password"
                />
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                Email<span className="text-red-500">*</span>
              </label>
              <div className={`flex items-center bg-white border border-blue-500 rounded-lg shadow-sm ${errors.email ? 'border-red-500' : ''}`}>
                <span className="text-gray-500 mx-2">
                  <FiMail />
                </span>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full py-2 px-4 outline-none text-lg"
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <div className="flex items-center justify-start">
              <button
                type="submit"
                className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign Up
              </button>
            </div>
            <div className="mt-4 text-blue-500 text-lg md:flex md:space-x-4 lg:justify-start">
              <div className="flex items-center">
                <Link to="/login" className="block md:inline-block">Already have an account?</Link>
              </div>
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

export default Signup;
