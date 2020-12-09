import React, { Component } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

class Cart extends Component {
  state = {};

  render() {
    let total = 0;
    let itemsCount = this.props.cartItems.length;
    return (
      <div>
        <Modal open={this.props.open} onClose={this.props.onCloseModal}>
          {!itemsCount ? (
            <h2 className="pt-4">Your Cart is Empty</h2>
          ) : (
            <h2 className="pt-4">
              There are {itemsCount} products in your Cart
            </h2>
          )}
          {this.props.cartItems.map((product) => {
            total += product.Price;
            return (
              <div>
                <h6>
                  {product.Name}: {product.Price}
                </h6>
              </div>
            );
          })}

          {itemsCount ? (
            <>
              <h3>Total amount to be paid: {total}</h3>
              <button
                onClick={() => {
                  this.props.onCloseModal();
                  this.props.emptyCart();
                }}
              >
                Pay and Proceed
              </button>
            </>
          ) : null}
        </Modal>
      </div>
    );
  }
}

export default Cart;
