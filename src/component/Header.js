import React from "react";
import { FaOpencart } from "react-icons/fa";

const Header = (props) => {
  return (
    <div>
      <div className="header">
        <h3 className="header-text my-auto">Make an Order</h3>

        <div className="cart-container">
          <div className="cart-no-box">
            <p className="cart-no">{props.cartItems.length}</p>
          </div>

          <FaOpencart className="cart-icon" onClick={props.onOpenModal} />
        </div>
      </div>
    </div>
  );
};

export default Header;
