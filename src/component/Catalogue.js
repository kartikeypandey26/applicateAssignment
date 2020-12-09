import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { MdAddShoppingCart, MdRemoveShoppingCart } from "react-icons/md";
import { BsCardImage, BsThreeDotsVertical } from "react-icons/bs";
import Select from "react-select";
import Cart from "./Cart";
import Header from "./Header";
import data from "../Data/MyData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const allProducts = data.allProducts;
const options = data.options;
class Catalogue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      selectedCategory: "All Products",
      dataShowing: [],
      rawData: [],
      cartItems: [],
      isCartOpen: false,
    };
  }
  notifyAdd = (item) => toast.success(`${item.Name} Added to cart`);
  notifyRemove = (item) => toast.error(`${item.Name} removed from cart`);
  handleAddToCart = (item) => {
    console.log("check: ", item);

    let temp = [...this.state.cartItems];
    let isPresent = temp.find((newItem) => newItem.id == item.id);
    if (!isPresent) {
      temp.push(item);
      this.setState(
        {
          cartItems: temp,
        },
        () => {
          this.notifyAdd(item);
        }
      );
    }
  };

  handleRemoveFromCart = (item) => {
    let temp = [...this.state.cartItems];
    let isPresent = temp.find((newItem) => newItem.id == item.id);
    if (isPresent) {
      temp = temp.filter((prop) => prop.id != item.id);
      this.setState(
        {
          cartItems: temp,
        },
        () => {
          this.notifyRemove(item);
        }
      );
    }
  };
  componentDidMount() {
    this.filterByCategory();
  }
  handleSearch = (e) => {
    console.log(e.target.value);
  };
  handleCategoryChange = (e) => {
    this.setState(
      {
        selectedCategory: e.value,
      },
      () => {
        this.filterByCategory();
      }
    );
  };
  emptyCart = () => {
    this.setState({
      cartItems: [],
    });
  };
  filterByCategory = () => {
    const { selectedCategory } = this.state;
    let myData = [];
    allProducts.map((item) => {
      if (
        selectedCategory == item.category ||
        selectedCategory == "All Products"
      )
        myData.push(item);
    });
    console.log("test: ", myData);
    this.setState({
      dataShowing: myData,
      rawData: myData,
    });
  };
  filterBySearch = (e) => {
    const { dataShowing, rawData } = this.state;
    let myText = e.target.value.toLowerCase();
    console.log("raw", rawData);
    let filteredData = rawData.filter((item) =>
      item.Name.toLowerCase().includes(myText)
    );
    this.setState({
      dataShowing: filteredData,
    });
  };
  handleCartOpenModal = () => {
    this.setState({ isCartOpen: true });
  };

  handleCartCloseModal = async () => {
    await this.setState({ isCartOpen: false });
  };
  render() {
    return (
      <div className="my-container">
        <ToastContainer position="top-left" autoClose={2000} />
        <Header
          cartItems={this.state.cartItems}
          onOpenModal={this.handleCartOpenModal}
        />
        <Row className="pl-3 pt-3">
          <Col>
            <h3>Catalogue</h3>
          </Col>
          <Col className="pr-5">
            <Select
              options={options}
              className="category"
              onChange={this.handleCategoryChange}
              placeholder="All Products"
            />
          </Col>
        </Row>
        <Row className="pl-3">
          <Col>
            <input
              type="text"
              placeholder="Search Product"
              onChange={this.filterBySearch}
            />

            {this.state.dataShowing.length ? (
              this.state.dataShowing.map((item) => {
                return (
                  <div id={item.id} className="productsList">
                    <BsCardImage size={65} className="product-image" />
                    <h6 className="product-title">{item.Name}</h6>
                    <h6 className="product-title">
                      {item.Price}
                      {"₹"}
                    </h6>
                    <button
                      onClick={() => {
                        this.handleRemoveFromCart(item);
                      }}
                      className="add-cart-buttons"
                    >
                      <MdRemoveShoppingCart className="my-auto mx-2" />
                    </button>
                    {/* 
                    <p className="my-auto">{"0"}</p> */}
                    <button
                      onClick={() => {
                        this.handleAddToCart(item);
                      }}
                      className="add-cart-buttons"
                    >
                      <MdAddShoppingCart className="my-auto mx-2" />
                    </button>
                  </div>
                );
              })
            ) : (
              <h6>No data</h6>
            )}
          </Col>
        </Row>
        <Cart
          open={this.state.isCartOpen}
          onCloseModal={this.handleCartCloseModal}
          cartItems={this.state.cartItems}
          emptyCart={this.emptyCart}
        />
      </div>
    );
  }
}

export default Catalogue;
