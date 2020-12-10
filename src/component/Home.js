import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { FaOpencart } from "react-icons/fa";
import Catalogue from "./Catalogue";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div className="container">
        <Link to="/Dashboard">
          <h3>Que 1</h3>
        </Link>
        <Link to="/Order">
          <h3>Que 2</h3>
        </Link>
      </div>
    );
  }
}

export default Home;
