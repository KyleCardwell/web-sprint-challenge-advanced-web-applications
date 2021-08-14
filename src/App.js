import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./components/Login";
import PrivateRoute from './components/PrivateRoute'
import BubblePage from './components/BubblePage'
import "./styles.scss";

function App() {

  const logoutClick = () => {
    localStorage.removeItem('token');
    window.location.href='/login'
  }

  return (
    <Router>
      <div className="App">
        <header>
          Color Picker Sprint Challenge
          <a data-testid="logoutButton" href="#" onClick={logoutClick}>logout</a>
        </header>

        <Route path="/login">
          <Login />
        </Route>

        <Route exact path="/">
          <Login />
        </Route>

        <PrivateRoute exact path="/BubblePage"
          component={() => <BubblePage />}        
        />

      </div>
    </Router>
  );
}

export default App;

//Task List:
//1. Add in two routes that link to the Login Component, one for the default path '/' and one for the '/login'.
//2. Render BubblePage as a PrivateRoute
//2. Build the logout button to call the logout endpoint, remove the localStorage Item and redirect to the login page.