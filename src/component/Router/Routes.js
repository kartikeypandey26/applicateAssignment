import React, { Component } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Cart from "../Cart";
import Order from "../Order";

class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/Cart" component={Cart}></Route>

          <Route exact path="/" component={Order}></Route>
          <Route component={Order}></Route>
        </Switch>
      </Router>
    );
  }
}

export default Routes;
