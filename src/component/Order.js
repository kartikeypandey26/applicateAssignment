import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { FaOpencart } from "react-icons/fa";
import Header from "./Header";
import Catalogue from "./Catalogue";

class Order extends Component {
  render() {
    return (
      <div className="my-container">
        <Header />
        <Catalogue />
      </div>
    );
  }
}

export default Order;
