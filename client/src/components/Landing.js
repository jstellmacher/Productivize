import React from "react";
import { Link } from "react-router-dom";
import { FaArrowDown } from "react-icons/fa";
import { BiLogInCircle } from "react-icons/bi";


const Home = () => {
  const scrollToNextSection = () => {
    const nextSection = document.getElementById("features");
    nextSection.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gradient-to-tr from-pink-500 to-yellow-500 py-12 h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
              Welcome to&nbsp;<span className="text-indigo-600 motion-safe:animate-bounce ">Productivize</span>
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-white sm:text-2xl md:mt-5 md:text-3xl">
              The App for Incentivizing Productivity
            </p>
            <button
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-full mt-8 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 transition-colors duration-300 ease-in-out"
              onClick={scrollToNextSection}
            >
              <FaArrowDown className="inline-block mr-2" />
              Scroll to Next Section
            </button>
          </div>
        </div>
      </div>

      <div className="py-12 bg-white h-screen" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <p className="text-base text-gray-500 leading-6">
              Productivize is a web application that empowers users with productivity and note-taking tools, task
              management, project tracking, and collaboration capabilities, offering a unique blend of functionality and
              personalized features. It is designed to provide users with a versatile platform for organizing their work,
              managing tasks and projects, and collaborating with others. With a touch of personalization and innovative
              features, Productivize aims to enhance the user experience and boost productivity.
            </p>
          </div>

          <div className="mt-10 bg-gradient-to-br from-red-200 to-red-400">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
              <Link to="/task-organizer">
                <div className="bg-gray-100 overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300 h-full">
                  <img src="https://picsum.photos/200" alt="Placeholder" className="h-32 w-full object-cover" />
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium text-gray-900">Organize Tasks</h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Organize your tasks and projects efficiently to stay on top of your work and boost productivity.
                    </p>
                    <div className="mt-4 flex justify-center">
                      <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 transition-colors duration-300 ease-in-out">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Repeat the same pattern for other cards */}
              <Link to="/real-time-collaboration">
                <div className="bg-gray-100 overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300 h-full">
                  <img src="https://picsum.photos/200" alt="Placeholder" className="h-32 w-full object-cover" />
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium text-gray-900">Collaborate in Real-time</h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Collaborate with team members and work together in real-time to achieve your goals faster.
                    </p>
                    <div className="mt-4 flex justify-center">
                      <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 transition-colors duration-300 ease-in-out">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Repeat the same pattern for other cards */}
              <Link to="/customize-content">
                <div className="bg-gray-100 overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300 h-full">
                  <img src="https://picsum.photos/200" alt="Placeholder" className="h-32 w-full object-cover" />
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium text-gray-900">Customize Your Content</h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Manage and customize your content with ease to create a personalized and organized workspace.
                    </p>
                    <div className="mt-4 flex justify-center">
                      <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 transition-colors duration-300 ease-in-out">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              </Link>

              <Link to="/user-friendly-interface">
                <div className="bg-gray-100 overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300 h-full">
                  <img src="https://picsum.photos/200" alt="Placeholder" className="h-32 w-full object-cover" />
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium text-gray-900">User-Friendly Interface</h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Stay productive and organized with a user-friendly interface that simplifies your workflow.
                    </p>
                    <div className="mt-4 flex justify-center">
                      <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 transition-colors duration-300 ease-in-out">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div className="mt-10">
            <div className="text-center">
              <p className="text-xl text-gray-500 leading-6">
                Create multiple pages to categorize and group your content. Each page can contain various blocks such as
                text, images, to-do lists, and more.
              </p>
              <Link to="/login">
              <button
                className="mb-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-full mt-8 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 transition-colors duration-300 ease-in-out"
                              >
                Get Started
                <BiLogInCircle className="inline-block justify-between h-[50px] w-[50px]" />
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
