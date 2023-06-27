import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Nav from "./components/Nav";
import Landing from "./components/Landing";
import Pages from "./components/Page";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dash from "./components/Dash";
import { AppContext } from "./context/AppC";
import "./index.css";

const App = () => {
  const { user, login, logout } = useContext(AppContext);

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
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
