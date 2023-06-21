import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    console.log("this is actually doing something")
  return (
    
    <div>
      <h1>Welcome to Your Notion Clone</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
        hendrerit ultricies felis, ac dapibus libero dapibus nec. Sed congue
        facilisis nunc, sed egestas ex fermentum et. Nulla facilisi. Duis
        venenatis faucibus facilisis. Sed venenatis, libero non maximus
        consectetur, ligula lectus efficitur ligula, non luctus odio libero ac
        justo. Sed sem sapien, sagittis in semper at, ultrices vitae ipsum.
        Aliquam eleifend, urna nec bibendum semper, purus justo vestibulum enim,
        nec vestibulum risus turpis id libero. Curabitur egestas tristique
        libero, ut bibendum nulla vestibulum non. Etiam pharetra orci sed
        vestibulum ullamcorper. Sed nec sagittis lacus. Vestibulum in ante non
        massa pharetra varius. Sed faucibus viverra facilisis.
      </p>
      <h2>Key Features</h2>
      <ul>
        <li>Organize your tasks and projects efficiently</li>
        <li>Collaborate with others in real-time</li>
        <li>Manage and customize your content with ease</li>
        <li>Stay productive and organized with a user-friendly interface</li>
      </ul>
      <h2>Pages and Blocks Overview</h2>
      <p>
        Create multiple pages to categorize and group your content. Each page
        can contain various blocks such as text, images, to-do lists, tables,
        and more. Customize the blocks to suit your needs and organize your
        information in a structured and intuitive manner.
      </p>
      <h2>Get Started Now</h2>
      <p>
        Sign up or log in to start using our Notion clone and experience the
        benefits of staying organized and productive.
      </p>
      <Link to="/login">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Login
        </button>
      </Link>
    </div>
  );
};

export default Home;
