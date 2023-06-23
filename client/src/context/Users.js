// import React, { createContext, useEffect, useState } from 'react';

// export const UsersContext = createContext(null);

// export const UsersProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const checkAuthentication = async () => {
//       try {
//         const response = await fetch(`/users/current`, {
//           method: 'GET',
//           credentials: 'include',
//         });
  
//         if (response.ok) {
//           const user = await response.json();
//           setUser(user);
//         } else {
//           setUser(null);
//         }
//       } catch (error) {
//         console.error('Error checking authentication:', error);
//       }
//     };
  
//     checkAuthentication();
//   }, []);
  
  

//   const login = async (userData) => {
//     try {
//       const response = await fetch('/users/login', {
//         method: 'POST',
//         credentials: 'include',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(userData),
//       });

//       if (response.ok) {
//         const user = await response.json();
//         setUser(user);
//         setIsLoggedIn(true);
//       } else {
//         console.error('Login failed:', response);
//       }
//     } catch (error) {
//       console.error('Error during login:', error);
//     }
//   };

//   const logout = async () => {
//     try {
//       const response = await fetch('/users/logout', {
//         method: 'POST',
//         credentials: 'include',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.ok) {
//         setUser(null);
//         setIsLoggedIn(false);
//       } else {
//         console.error('Logout failed:', response);
//       }
//     } catch (error) {
//       console.error('Error during logout:', error);
//     }
//   };

//   return (
//     <UsersContext.Provider value={{ user, isLoggedIn, login, logout }}>
//       {children}
//     </UsersContext.Provider>
//   );
// };
