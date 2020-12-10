import React, { Component } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

class Cart extends Component {
  state = {
    thanksOpen: false,
  };
  thanksForShopping = () => {
    this.setState({
      thanksOpen: !this.state.thanksOpen,
    });
  };
  render() {
    let total = 0;
    let itemsCount = this.props.cartItems.length;
    return (
      <div>
        <Modal open={this.props.open} onClose={this.props.onCloseModal}>
          {!itemsCount ? (
            <h3 className="pt-4">Your Cart is Empty</h3>
          ) : (
            <h4 className="pt-4">{itemsCount} item(s)</h4>
          )}
          {this.props.cartItems.map((product) => {
            total += product.Price;
            return (
              <div>
                <h4>
                  {product.Name}: {product.Price}₹
                </h4>
              </div>
            );
          })}

          {itemsCount ? (
            <>
              <h3>Total amount to be paid: {total}₹</h3>
              <button
                onClick={() => {
                  this.props.onCloseModal();
                  this.thanksForShopping();
                  setTimeout(() => {
                    this.thanksForShopping();
                    this.props.emptyCart();
                  }, 2000);
                }}
              >
                Pay and Proceed
              </button>
            </>
          ) : null}
        </Modal>
        <Modal
          open={this.state.thanksOpen}
          onClose={this.thanksForShopping}
          center
        >
          <h2 className="pt-4">Your order has been placed successfully</h2>
          <h5>Thanks for shopping</h5>
        </Modal>
      </div>
    );
  }
}

export default Cart;
