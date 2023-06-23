import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './components/Home';
import Pages from './components/Pages';
import Login from './components/Login';
import Signup from './components/Signup';
import Dash from './components/Dash';
import { UsersProvider, UsersContext } from './context/Users';
import { AuthProvider, AuthContext } from './context/Auth';
import './index.css';

const App = () => {
  const { isLoggedIn, login, logout } = useContext(UsersContext);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await fetch('/users', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const userData = await response.json();
          login(userData); // Handle user login in the UsersContext
        } else {
          logout(); // Clear the logged-in user
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        logout(); // Clear the logged-in user
      }
    };

    checkAuthentication();
  }, [login, logout]);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <Router>
      <div>
        <UsersProvider>
          <AuthProvider>
            {isLoggedIn && <Nav onLogout={handleLogout} />}

            <div className="container mx-auto px-4">
              <Switch>
                <Route exact path="/">
                  {isLoggedIn ? <Redirect to="/dash" /> : <Home />}
                </Route>
                <Route path="/home">{isLoggedIn ? <Pages /> : <Home />}</Route>
                <Route path="/dash">
                  {isLoggedIn ? <Dash /> : <Redirect to="/login" />}
                </Route>
                <Route path="/login">
                  {isLoggedIn ? <Redirect to="/dash" /> : <Login />}
                </Route>
                <Route path="/signup">
                  {isLoggedIn ? <Redirect to="/dash" /> : <Signup />}
                </Route>
              </Switch>
            </div>
          </AuthProvider>
        </UsersProvider>
      </div>
    </Router>
  );
};

export default App;
