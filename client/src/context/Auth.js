// import React, { createContext, useState } from 'react';

// export const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const checkAuthentication = async () => {
//     try {
//       const response = await fetch('/users', {
//         method: 'GET',
//         credentials: 'include',
//       });

//       if (response.ok) {
//         const userData = await response.json();
//         setIsLoggedIn(true);
//       } else {
//         setIsLoggedIn(false);
//       }
//     } catch (error) {
//       console.error('Error checking authentication:', error);
//       setIsLoggedIn(false);
//     }
//   };

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
//         setIsLoggedIn(false);
//       } else {
//         console.error('Logout failed:', response);
//       }
//     } catch (error) {
//       console.error('Error during logout:', error);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, checkAuthentication, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
