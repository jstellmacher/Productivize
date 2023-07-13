import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppC';

const UserInvite = ({ onInvite }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [invitedUsers, setInvitedUsers] = useState([]);
  const { user } = useContext(AppContext);

  const handleInvite = async () => {
    try {
      const response = await fetch(`/usernames?username=${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      console.log('Data:', data);

      if (data.length > 0) {
        console.log('User found:', data[0]);

        if (data[0].id === user?.id) {
          setError('You cannot invite yourself');
          return;
        }

        onInvite(data[0]); // Pass the user object to the parent component
        setUsername('');
        setError('');

        // Add the invited user to the list of invited users
        setInvitedUsers(prevInvitedUsers => [...prevInvitedUsers, data[0].username]);
      } else {
        setError('User not found');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred');
    }
  };

  return (
    <div className="mt-4">
      <h3 className="text-xl font-semibold mb-2">Invite User</h3>
      <div className="flex">
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Enter username"
          className="rounded-l px-4 py-2 border-t border-b border-l text-gray-700 focus:outline-none"
        />
        <button
          onClick={handleInvite}
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-r focus:outline-none"
        >
          Invite
        </button>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}

      {/* Render invited user tags */}
      <div className="mt-4">
        {invitedUsers.map((user, index) => (
          <span
            key={index}
            className="inline-block bg-green-500 text-white rounded-full px-3 py-1 text-sm font-semibold mr-2"
          >
            {user}
          </span>
        ))}
      </div>
    </div>
  );
};

export default UserInvite;
