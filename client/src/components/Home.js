import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gradient-to-tr from-pink-500 to-yellow-500 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
              Welcome to&nbsp;<span className="text-indigo-400">Productivize</span>
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-white sm:text-2xl md:mt-5 md:text-3xl">
              The App for Incentivizing Productivity
            </p>
          </div>
        </div>
      </div>
      <div className="py-12 bg-white">
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
          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
              <div className="bg-gray-100 overflow-hidden shadow rounded-lg">
                <img src="https://picsum.photos/200" alt="Placeholder" className="h-32 w-full object-cover" />
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900">Organize Tasks</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Organize your tasks and projects efficiently to stay on top of your work and boost productivity.
                  </p>
                </div>
              </div>

              <div className="bg-gray-100 overflow-hidden shadow rounded-lg">
                <img src="https://picsum.photos/200" alt="Placeholder" className="h-32 w-full object-cover" />
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900">Collaborate in Real-time</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Collaborate with team members and work together in real-time to achieve your goals faster.
                  </p>
                </div>
              </div>

              <div className="bg-gray-100 overflow-hidden shadow rounded-lg">
                <img src="https://picsum.photos/200" alt="Placeholder" className="h-32 w-full object-cover" />
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900">Customize Your Content</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Manage and customize your content with ease to create a personalized and organized workspace.
                  </p>
                </div>
              </div>

              <div className="bg-gray-100 overflow-hidden shadow rounded-lg">
                <img src="https://picsum.photos/200" alt="Placeholder" className="h-32 w-full object-cover" />
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900">User-Friendly Interface</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Stay productive and organized with a user-friendly interface that simplifies your workflow.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <div className="text-center">
              <p className="text-xl text-gray-500 leading-6">
                Create multiple pages to categorize and group your content. Each page can contain various blocks such as
                text, images, to-do lists, tables, and more. Customize the blocks to suit your needs and organize your
                information in a structured and intuitive manner.
              </p>
              <p className="mt-4 text-xl text-gray-500 leading-6">
                Sign up or log in to start using our Notion clone and experience the benefits of staying organized and
                productive.
              </p>
              <div className="mt-6">
                <Link to="/login">
                  <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-8 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 transition-colors duration-300 ease-in-out">
                    Get Started
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
