import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Nav from "./components/Nav";
import Landing from "./components/Landing";
import Pages from "./components/Pages";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dash from "./components/Dash";
import { AppContext } from "./context/AppC";
import "./index.css";

const App = () => {
  const { user, login, logout } = useContext(AppContext);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await fetch("/users", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const userData = await response.json();
          login(userData); // Handle user login in the UsersContext
        } else {
          logout(); // Clear the logged-in user
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        logout(); // Clear the logged-in user
      }
    };

    checkAuthentication();
  }, [login, logout]);

  const handleLogout = async () => {
    await logout();
  };

  if (user === undefined) {
    return <p>Loading...</p>;
  }

  return (
    <Router>
      <div className="">
        {user && <Nav onLogout={handleLogout} />}

        <div className="container mx-auto px-4">
          <Switch>
            <Route exact path="/">
              {user ? <Redirect to="/dash" /> : <Landing />}
            </Route>
            <Route path="/dash" component={Pages} />
            <Route path="/dash">
              {user ? <Dash /> : <Redirect to="/login" />}
            </Route>
            <Route path="/login">
              {user ? <Redirect to="/dash" /> : <Login />}
            </Route>
            <Route path="/signup">
              {user ? <Redirect to="/dash" /> : <Signup />}
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
