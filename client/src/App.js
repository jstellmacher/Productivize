import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Nav from "./components/Nav";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dash from "./components/Dash";
import Forgot from "./components/Forgot";
import { AppContext } from "./context/AppC";
import About from "./components/About";
import Profile from "./components/Profile"; 
import "./index.css";

const App = () => {
  const { user, logout } = useContext(AppContext);

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
            <Route path="/dash">
              {user ? <Dash /> : <Redirect to="/login" />}
            </Route>
            <Route path="/login">
              {user ? <Redirect to="/dash" /> : <Login />}
            </Route>
            <Route path="/signup">
              {user ? <Redirect to="/dash" /> : <Signup />}
            </Route>
            <Route path="/forgot">
              <Forgot />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/profile"> // Add a new route for the profile page
              {user ? <Profile /> : <Redirect to="/login" />}
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
