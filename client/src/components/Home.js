import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-gray-800 shadow-xl rounded-xl py-10 px-6 sm:px-12 lg:px-24">
      <h1 className="bg-gray-100 p-2 rounded-md flex justify-center text-4xl md:text-6xl font-bold mb-8">Welcome to &nbsp; <br></br><u><b>Productivize</b></u></h1>
      <p className="flex justify-center text-2xl md:text-xl leading-7 mb-8">
        The App for Incentivizing Productivity
      </p>
      <p className="bg-gray-100 p-2 rounded-md text-lg md:text-xl leading-7 mb-8">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque hendrerit ultricies felis, ac dapibus libero
        dapibus nec. Sed congue facilisis nunc, sed egestas ex fermentum et. Nulla facilisi. Duis venenatis faucibus
        facilisis. Sed venenatis, libero non maximus consectetur, ligula lectus efficitur ligula, non luctus odio libero
        ac justo. Sed sem sapien, sagittis in semper at, ultrices vitae ipsum. Aliquam eleifend, urna nec bibendum
        semper, purus justo vestibulum enim, nec vestibulum risus turpis id libero. Curabitur egestas tristique libero,
        ut bibendum nulla vestibulum non. Etiam pharetra orci sed vestibulum ullamcorper. Sed nec sagittis lacus.
        Vestibulum in ante non massa pharetra varius. Sed faucibus viverra facilisis.
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
        Create multiple pages to categorize and group your content. Each page can contain various blocks such as text,
        images, to-do lists, tables, and more. Customize the blocks to suit your needs and organize your information in a
        structured and intuitive manner.
      </p>
      <h2 className="bg-gray-100 p-2 rounded-md text-2xl md:text-4xl font-bold mb-4">Get Started Now</h2>
      <p className="bg-gray-100 p-2 rounded-md text-lg md:text-xl leading-7 mb-8">
        Sign up or log in to start using our Notion clone and experience the benefits of staying organized and
        productive.
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
