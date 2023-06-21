import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-gray-800 shadow-xl rounded-xl py-10 px-6 sm:px-12 lg:px-24">
      <h1 className="bg-gray-100 p-2 rounded-md flex justify-center text-2xl md:text-6xl font-bold mb-8">Welcome to&nbsp; <u><b>Productivize</b></u></h1>
      <p className="flex justify-center text-2xl md:text-xl leading-7 mb-8">
        The App for Incentivizing Productivity
      </p>
      <p className="bg-gray-100 p-2 rounded-md text-lg md:text-xl leading-7 mb-8">
        Productivize is a web application that empowers users with productivity and note-taking tools, task management, project tracking, and collaboration capabilities, offering a unique blend of functionality and personalized features. It is designed to provide users with a versatile platform for organizing their work, managing tasks and projects, and collaborating with others. With a touch of personalization and innovative features, Productivize aims to enhance the user experience and boost productivity.
      </p>
      <h2 className="bg-gray-100 p-2 rounded-md text-2xl md:text-4xl font-bold mb-4">Key Features</h2>
      <ul className="bg-gray-100 p-2 rounded-md list-disc list-inside mb-8">
        <li className="text-lg md:text-xl leading-7">Organize your tasks and projects efficiently</li>
        <li className="text-lg md:text-xl leading-7">Collaborate with others in real-time</li>
        <li className="text-lg md:text-xl leading-7">Manage and customize your content with ease</li>
        <li className="text-lg md:text-xl leading-7">Stay productive and organized with a user-friendly interface</li>
      </ul>
      <h2 className="bg-gray-100 p-2 rounded-md text-2xl md:text-4xl font-bold mb-4">Pages and Blocks Overview</h2>
      <p className="bg-gray-100 p-2 rounded-md text-lg md:text-xl leading-7 mb-8">
        Create multiple pages to categorize and group your content. Each page can contain various blocks such as text, images, to-do lists, tables, and more. Customize the blocks to suit your needs and organize your information in a structured and intuitive manner.
      </p>
      <h2 className="bg-gray-100 p-2 rounded-md text-2xl md:text-4xl font-bold mb-4">Get Started Now</h2>
      <p className="bg-gray-100 p-2 rounded-md text-lg md:text-xl leading-7 mb-8">
        Sign up or log in to start using our Notion clone and experience the benefits of staying organized and productive.
      </p>
      <div className="flex justify-center">
        <Link to="/login">
        <button className="bg-gradient-to-tl from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-gray-800 font-bold py-8 px-16 rounded-full focus:outline-none focus:shadow-outline transition-colors duration-300 ease-in-out">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
