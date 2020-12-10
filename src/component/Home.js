import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { FaOpencart } from "react-icons/fa";
import Catalogue from "./Catalogue";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div className="container pt-5">
        <Link to="/Dashboard">
          <button>Que 1</button>
        </Link>
        <Link to="/Order">
          <button>Que 2</button>
        </Link>
      </div>
    );
  }
}

export default Home;
