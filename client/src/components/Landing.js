import React from "react";
import { Link } from "react-router-dom";
import { FaArrowDown } from "react-icons/fa";
import { BiLogInCircle } from "react-icons/bi";
import {AiOutlineForm} from "react-icons/ai"
import cardData from "../pCards.json"
// import  Signup  from "./Signup.js";


const gradientColor = "from-pink-500 to-yellow-500";
const buttonPrimary = "bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 sm:py-2 sm:px-4 md:py-3 md:px-6 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 transition-colors duration-300 ease-in-out";

const buttonSecondary = "bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-full ";
const cardContainer = "bg-gray-100 overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300 h-full";
const cardContent = "space-y-4 p-2";

const cardImage = "h-32 w-full object-cover";
const cardTitle = "font-semibold";
const cardDescription = "mt-2 text-sm text-gray-500";
const cardButton = "";


const loginButton = "text-xl inline-flex items-center space-x-2";

const Card = ({ imageSrc, title, description, link }) => {
  return (
    <Link to={link}>
      <div className={cardContainer}>
        <img src={imageSrc} alt="Placeholder" className={cardImage} />
        <div className={cardContent}>
          <h3 className={cardTitle}>{title}</h3>
          <p className={cardDescription}>{description}</p>
          <div className={cardButton}>
            <button className={buttonSecondary}>Learn More</button>
          </div>
        </div>
      </div>
    </Link>
  );
};

const Landing = () => {
  const scrollToNextSection = () => {
    const nextSection = document.getElementById("features");
    nextSection.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className={`bg-gradient-to-tr ${gradientColor} h-screen`}>
        <div className="min-h-screen max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center lg:text-center lg:justify-center space-y-4 py-[50%]">
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
              Welcome to&nbsp;<span className="text-indigo-600 motion-safe:animate-bounce">Productivize</span>
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-white sm:text-2xl md:mt-5 md:text-3xl">
              The App for Incentivizing Productivity
            </p>
            <button className={`${buttonPrimary}`} onClick={scrollToNextSection}>
              <FaArrowDown className="inline-block mr-2" />
              Scroll to App Details!
            </button>
            <div className="w-[50%] mx-auto">
              <Link to="/login">
                <div className={`${buttonPrimary}`}>
                  <div className={`${loginButton}`}>
                  <h1 className="inline-block text-xl sm:text-3xl md:text-xl tracking-tight text-white">
                      Log in&nbsp;<BiLogInCircle className="inline-block" />
                    </h1>
                    <p className="text-gray-300 text-sm sm:text-base">to access your personalized workspace</p>

                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div id="features" className="py-40 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center space-y-10">
            <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
              App Features
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:text-2xl">
              Explore the powerful features of Productivize to enhance the user experience and boost productivity.
            </p>
          </div>

          <div className={`rounded-lg mt-10 bg-gradient-to-br ${gradientColor} p-8`}>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {cardData.map((card, index) => (
              <Card
                key={index}
                imageSrc={card.imageSrc}
                title={card.title}
                description={card.description}
                link={card.link}
              />
            ))}
          </div>
        </div>
      <Link to="/signup">
        <div className="flex items-center justify-center my-20">
  <button className="flex items-center justify-center px-4 py-2 text-white bg-indigo-500 hover:bg-indigo-600 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 transition-colors duration-300 ease-in-out">
    <p className="mr-2">Click Me To Sign Up!</p>
    <AiOutlineForm className="w-5 h-5" />
  </button>
  </div>
</Link>
        </div>
      </div>
      {/* <Signup /> */}

      
    </div>
  );
};

export default Landing;
