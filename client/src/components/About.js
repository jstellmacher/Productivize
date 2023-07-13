import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <section className="bg-gray-100">
      <div className="container mx-auto px-4 py-12 bg-gray-200 h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">About Us</h2>
            <p className="text-gray-600">
              Productivize is a web application that empowers users with productivity and note-taking tools, task management, project tracking, and collaboration capabilities, offering a unique blend of functionality and personalized features.
            </p>
            <p className="text-gray-600 mt-4">
              Productivize is a web application designed to provide users with a versatile platform for organizing their work, managing tasks and projects, and collaborating with others. With a touch of personalization and innovative features, Productivize aims to enhance the user experience and boost productivity.
            </p>
            <div className="flex items-center mt-4">
              <div className="w-20 h-20 rounded-full overflow-hidden">
                <img
                  src="https://picsum.photos/200/330"
                  alt="Developer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-4">
                <p className="text-gray-800 font-bold">Jai S</p>
                <a
                  href="https://github.com/johndoe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  My Github!
                </a>
              </div>
            </div>
          </div>
          <div className='flex justify-center items-center'>
            <img
                src="https://picsum.photos/200/300"
                alt="About"
                className="rounded-xl shadow-lg"
            />
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <Link
            to="/landing"
            className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition-colors"
          >
            Visit Landing Page
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;
