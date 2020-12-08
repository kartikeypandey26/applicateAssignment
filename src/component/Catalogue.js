import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { MdAddShoppingCart, MdRemoveShoppingCart } from "react-icons/md";
import { BsCardImage } from "react-icons/bs";
import Select from "react-select";
import data from "../Data/MyData";

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
    };
  }
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
  render() {
    return (
      <div className="my-container">
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
                    <MdRemoveShoppingCart className="my-auto mx-2" />
                    <p className="my-auto">{"0"}</p>
                    <MdAddShoppingCart className="my-auto mx-2" />
                  </div>
                );
              })
            ) : (
              <h6>No data</h6>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

export default Catalogue;
