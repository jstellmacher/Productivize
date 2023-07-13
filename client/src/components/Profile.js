import React, { useState } from "react";
import { useAppContext } from "../context/AppC";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const Profile = () => {
  const { user } = useAppContext();
  const [username, setUsername] = useState(user?.username);
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(user?.profilePicture || "");
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [crop, setCrop] = useState({ aspect: 1 / 1 });
  const [croppedImage, setCroppedImage] = useState(null);
  const [imageRef, setImageRef] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setProfilePicture(reader.result);
      setCrop({ aspect: 1 / 1 });
      setCroppedImage(null);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleImageCrop = () => {
    const canvas = document.createElement("canvas");
    const scaleX = imageRef.naturalWidth / imageRef.width;
    const scaleY = imageRef.naturalHeight / imageRef.height;
    const ctx = canvas.getContext("2d");
    canvas.width = crop.width;
    canvas.height = crop.height;

    ctx.drawImage(
      imageRef,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    const croppedImageUrl = canvas.toDataURL("image/jpeg");
    setCroppedImage(croppedImageUrl);
  };

  const handleSaveProfile = () => {
    // Perform the PATCH request to update the username, password, and profile picture
    // using the `username`, `password`, and `profilePicture` state values
    // You need to implement the logic for sending the request to the backend.

    fetch("/users", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        profilePicture: croppedImage || profilePicture, // Use the cropped image if available
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the backend, e.g., display a success message
        setData(data);
        setError(null); // Reset error if request succeeds
      })
      .catch((error) => {
        // Handle error, e.g., display an error message
        setError(error);
        setData(null); // Reset data if request fails
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-milky">
      <div className="bg-gray-200 rounded-lg shadow-md p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <div className="flex justify-center items-center mb-8">
          {isImageLoaded && (
            <ReactCrop
              src={profilePicture}
              crop={crop}
              onImageLoaded={(image) => {
                setImageRef(image);
                setIsImageLoaded(true);
              }}
              onChange={(newCrop) => setCrop(newCrop)}
            />
          )}
          {!isImageLoaded && (
            <img
              src={croppedImage || profilePicture || "https://picsum.photos/200/300"}
              alt="Profile"
              className="rounded-full h-50 w-50 mr-4"
            />
          )}
          <h2 className="text-xl font-semibold">{user?.name}</h2>
        </div>
        {profilePicture && !croppedImage && isImageLoaded && (
          <button
            className="bg-indigo-500 text-white rounded-md px-4 py-2"
            onClick={handleImageCrop}
          >
            Crop Image
          </button>
        )}
        <div className="mb-8">
          <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">
            {isUsernameFocused ? "New Username" : "Current Username"}:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            onFocus={() => setIsUsernameFocused(true)}
            onBlur={() => setIsUsernameFocused(false)}
            className="w-full border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-indigo-300"
          />
        </div>
        <div className="mb-8">
          <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
            {isPasswordFocused ? "New Password" : "Current Password"}:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => setIsPasswordFocused(false)}
            className="w-full border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-indigo-300"
          />
        </div>
        <div className="mb-8">
          <label htmlFor="profilePicture" className="block text-gray-700 font-semibold mb-2">
            Profile Picture:
          </label>
          <input
            type="file"
            accept="image/*"
            id="profilePicture"
            onChange={handleProfilePictureChange}
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
        <button className="bg-indigo-500 text-white rounded-md px-4 py-2" onClick={handleSaveProfile}>
          Save Profile
        </button>
        {/* <button className="bg-red-500 text-white rounded-md px-4 py-2" onClick={handleDeleteAccount}>
          Delete Account
        </button> */}
        {error && <p className="text-red-500 mt-4">{error.message}</p>}
        {data && <p className="text-green-500 mt-4">Request successful!</p>}
      </div>
    </div>
  );
};

export default Profile;
