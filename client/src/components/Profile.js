import React from "react";
import { useAppContext } from "../context/AppC";

const Profile = () => {
  const { user } = useAppContext();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <div className="flex items-center mb-8">
          <img
            src={user?.profilePicture}
            alt="Profile"
            className="rounded-full h-16 w-16 mr-4"
          />
          <h2 className="text-xl font-semibold">{user?.name}</h2>
        </div>
        <div className="mb-8">
          <label htmlFor="profilePicture" className="block text-gray-700 font-semibold mb-2">
            Profile Picture:
          </label>
          <input
            type="text"
            id="profilePicture"
            defaultValue={user?.profilePicture}
            className="w-full border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-indigo-300"
          />
        </div>
        <div className="mb-8">
          <label htmlFor="bio" className="block text-gray-700 font-semibold mb-2">
            Bio:
          </label>
          <textarea
            id="bio"
            defaultValue={user?.bio}
            className="w-full border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-indigo-300"
          />
        </div>
        <button className="bg-indigo-500 text-white rounded-md px-4 py-2" onClick={() => {}}>
          Save Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
