import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-dark-slate-gray text-vanilla py-10 px-6 sm:px-12 lg:px-24">
      <h1 className="text-4xl md:text-6xl font-bold mb-8">Welcome to Your Notion Clone</h1>
      <p className="text-lg md:text-xl leading-7 mb-8">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque hendrerit ultricies felis, ac dapibus libero
        dapibus nec. Sed congue facilisis nunc, sed egestas ex fermentum et. Nulla facilisi. Duis venenatis faucibus
        facilisis. Sed venenatis, libero non maximus consectetur, ligula lectus efficitur ligula, non luctus odio libero
        ac justo. Sed sem sapien, sagittis in semper at, ultrices vitae ipsum. Aliquam eleifend, urna nec bibendum
        semper, purus justo vestibulum enim, nec vestibulum risus turpis id libero. Curabitur egestas tristique libero,
        ut bibendum nulla vestibulum non. Etiam pharetra orci sed vestibulum ullamcorper. Sed nec sagittis lacus.
        Vestibulum in ante non massa pharetra varius. Sed faucibus viverra facilisis.
      </p>
      <h2 className="text-2xl md:text-4xl font-bold mb-4">Key Features</h2>
      <ul className="list-disc list-inside mb-8">
        <li className="text-lg md:text-xl leading-7">Organize your tasks and projects efficiently</li>
        <li className="text-lg md:text-xl leading-7">Collaborate with others in real-time</li>
        <li className="text-lg md:text-xl leading-7">Manage and customize your content with ease</li>
        <li className="text-lg md:text-xl leading-7">Stay productive and organized with a user-friendly interface</li>
      </ul>
      <h2 className="text-2xl md:text-4xl font-bold mb-4">Pages and Blocks Overview</h2>
      <p className="text-lg md:text-xl leading-7 mb-8">
        Create multiple pages to categorize and group your content. Each page can contain various blocks such as text,
        images, to-do lists, tables, and more. Customize the blocks to suit your needs and organize your information in a
        structured and intuitive manner.
      </p>
      <h2 className="text-2xl md:text-4xl font-bold mb-4">Get Started Now</h2>
      <p className="text-lg md:text-xl leading-7 mb-8">
        Sign up or log in to start using our Notion clone and experience the benefits of staying organized and
        productive.
      </p>
      <Link to="/login">
        <button className="bg-hunyadi-yellow hover:bg-auburn text-dark-slate-gray font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline">
          Login
        </button>
      </Link>
    </div>
  );
};

export default Home;
