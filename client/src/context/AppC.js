import React, { createContext, useEffect, useState } from 'react';

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  
  const [user, setUser] = useState();


  useEffect(() => {
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

    checkAuthentication();
  }, []);

  const login = async (userData) => {
    try {
      const response = await fetch('/users/login', {
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
        console.error('Login failed:', response);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };


  const signup = async (userData) => {
    try {
      const response = await fetch('/users/signup', {
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
      const response = await fetch('/users/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
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

  return (
    <AppContext.Provider value={{ user, login, signup, logout }}>      
    {children}
    </AppContext.Provider>
  );
};
