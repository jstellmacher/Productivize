import React, { createContext, useEffect, useState } from 'react';

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [location, setLocation] = useState(null);

  const checkAuthentication = async () => {
    try {
      const response = await fetch('/users', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const user = await response.json();
        setUser(user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuthentication();

    const handleLocationChange = () => {
      setLocation(window.location);
    };

    window.addEventListener('popstate', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const login = async (userData) => {
    try {
      const response = await fetch('/users', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const user = await response.json();
        setUser(user);
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const signup = async (userData) => {
    try {
      const response = await fetch('/signup', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const user = await response.json();
        setUser(user);
      } else {
        console.error('Signup failed:', response);
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  const logout = async () => {
    try {
      const response = await fetch('/users', {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        setUser(null);
      } else {
        console.error('Logout failed:', response);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const getBackgroundClass = () => {
    if (location) {
      switch (location.pathname) {
        case '/landing':
          return 'bg-red-500';
        case '/login':
          return 'bg-blue-500';
        case '/signup':
          return 'bg-yellow-500';
        default:
          return 'bg-indigo-500';
      }
    }
    return 'bg-white';
  };

  const backgroundClass = getBackgroundClass();

  return (
    <AppContext.Provider value={{ user, login, signup, logout, checkAuthentication }}>
      <div className={`bg-indigo-500 ${backgroundClass}`}>
        {children}
      </div>
    </AppContext.Provider>
  );
};
