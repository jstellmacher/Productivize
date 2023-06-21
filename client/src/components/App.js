import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './Nav';
import Home from './Home';
import Pages from './Pages';
import { Login } from './Login';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await fetch('/users', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setIsLoggedIn(false);
      }
    };

    checkAuthentication();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('/users/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        setIsLoggedIn(false);
      } else {
        console.error('Logout failed:', response);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <Router>
      <div>
        {isLoggedIn && <Nav isLoggedIn={isLoggedIn} onLogout={handleLogout} />}

        <div className="container mx-auto px-4">
          <Switch>
            <Route exact path="/">
              <Home isLoggedIn={isLoggedIn} />
            </Route>
            <Route path="/home">
              {isLoggedIn ? (
                <Pages isLoggedIn={isLoggedIn} />
              ) : (
                <Home isLoggedIn={isLoggedIn} />
              )}
            </Route>
            <Route path="/login">
              <Login />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
