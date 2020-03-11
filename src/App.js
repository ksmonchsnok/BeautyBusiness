import React from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import "./style.css";
import Home from "../src/pages/home/home.js"

var hist = createBrowserHistory();

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem("auth") ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

function App() {
  return (
    <div className="App">
      <header>
        <Router history={hist}>
          <Switch>
          <Route exact path="/" component={Home} />
            <Route exact path="/Home" component={Home} />
            {/* <PrivateRoute path="/" component={Layout} /> */}
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
