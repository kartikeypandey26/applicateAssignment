import React, { Component } from "react";

class Cart extends Component {
  state = {};
  render() {
    return (
      <div>
        <p>There are {this.props.cartItems.length} products in your cart</p>
      </div>
    );
  }
}

export default Cart;
