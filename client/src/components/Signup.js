import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { RiArrowGoBackLine } from "react-icons/ri";
import { AppContext } from "../context/AppC";

const Signup = () => {
  const { signup } = useContext(AppContext);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await signup(formData);

      if (response.ok) {
        // Signup successful
        // history.push("/"); // Redirect to the home page or desired route
      } else {
        // Signup failed
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      setErrorMessage("An error occurred while signing up. Please try again.");
    }
  };

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <div className="min-h-screen bg-milky bg-no-repeat bg-cover flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="bg-gray-100 py-8 px-4 shadow-xl rounded-lg mx-auto w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
        <div className="flex justify-center mb-4">
          <button
            onClick={handleGoBack}
            className="flex items-center text-indigo-600 hover:text-indigo-800"
          >
            <RiArrowGoBackLine className="mr-2" />
            Back
          </button>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="">
            {errorMessage && (
              <p className="mb-4 text-red-500 text-sm">{errorMessage}</p>
            )}
            <form className="space-y-6" onSubmit={handleSignup}>
              {/* Signup form fields */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="username"
                    autoComplete="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>


              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>


              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    id="email"
                    autoComplete="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>


              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="firstName"
                    autoComplete="given-name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>


              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="lastName"
                    autoComplete="family-name"
                    name="lastName"
                    value={formData.lastName}
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
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Signup;