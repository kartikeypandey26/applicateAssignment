import React, { Component } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Cart from "../Cart";
import Order from "../Order";
import Dashboard from "../Dashboard";

import Home from "../Home";

class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/Cart" component={Cart}></Route>
          <Route exact path="/Order" component={Order}></Route>
          <Route exact path="/Dashboard" component={Dashboard}></Route>

          <Route exact path="/" component={Home}></Route>
          <Route component={Home}></Route>
        </Switch>
      </Router>
    );
  }
}

export default Routes;
