import React, { Component } from "react";
import { Row, Col, Table } from "reactstrap";
import Select from "react-select";
import { users, orders, optionsForRegion as options } from "../Data/MyData";

import "../Dashboard.css";
class Dashboard extends Component {
  state = {
    selectedRegion: "All Region",

    myOrder: orders,
    myUser: users,
  };

  dates = {
    convert: function (d) {
      return d.constructor === Date
        ? d
        : d.constructor === Array
        ? new Date(d[0], d[1], d[2])
        : d.constructor === Number
        ? new Date(d)
        : d.constructor === String
        ? new Date(d)
        : typeof d === "object"
        ? new Date(d.year, d.month, d.date)
        : NaN;
    },
    compare: function (a, b) {
      return isFinite((a = this.convert(a).valueOf())) &&
        isFinite((b = this.convert(b).valueOf()))
        ? (a > b) - (a < b)
        : NaN;
    },
    inRange: function (d, start, end) {
      return isFinite((d = this.convert(d).valueOf())) &&
        isFinite((start = this.convert(start).valueOf())) &&
        isFinite((end = this.convert(end).valueOf()))
        ? start <= d && d <= end
        : NaN;
    },
  };

  componentDidMount() {}
  todaysOrders = () => {
    let { myOrder, myUser } = this.state;
    let currentDate = new Date().toISOString().split("T")[0];
    let todaysOrders = myOrder.filter((order) => order.date == currentDate);
    let myData = {
      count: todaysOrders.length,
      totalAmount: todaysOrders.length && todaysOrders[0].totalAmount,
    };

    return myData;
  };

  currentWeeksOrders = () => {
    let { myOrder, myUser } = this.state;
    var curr = new Date();
    var first = curr.getDate() - curr.getDay();
    var last = first + 6;

    var firstday = new Date(curr.setDate(first)).toUTCString();
    var lastday = new Date(curr.setDate(last)).toUTCString();
    let firstdate = new Date(firstday);
    firstdate.setDate(firstdate.getDate() - 1);

    let currentWeeksOrders = myOrder.filter((order) =>
      this.dates.inRange(order.date, firstdate, lastday)
    );
    var totalAmount = 0;
    currentWeeksOrders.map((order) => {
      totalAmount += order.totalAmount;
    });

    let myData = {
      count: currentWeeksOrders.length,
      totalPrice: totalAmount,
    };

    return myData;
  };
  startOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  };
  startOfPrevMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() - 1, 1);
  };
  endOfPrevMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 0);
  };
  currentMonthsOrders = () => {
    let { myOrder, myUser } = this.state;
    let dateToday = new Date();
    let startOfMonth = this.startOfMonth(dateToday);
    let currentMonthsOrders = myOrder.filter((order) =>
      this.dates.inRange(order.date, startOfMonth, dateToday)
    );
    var totalAmount = 0;
    currentMonthsOrders.map((order) => {
      totalAmount += order.totalAmount;
    });

    let myData = {
      count: currentMonthsOrders.length,
      totalPrice: totalAmount,
    };

    return myData;
  };

  lastMonthsOrders = () => {
    let { myOrder, myUser } = this.state;
    let dateToday = new Date();
    let startOfPrevMonth = this.startOfPrevMonth(dateToday);
    let endOfPrevMonth = this.endOfPrevMonth(dateToday);
    console.log(startOfPrevMonth, endOfPrevMonth);
    let lastMonthsOrders = myOrder.filter((order) =>
      this.dates.inRange(order.date, startOfPrevMonth, endOfPrevMonth)
    );
    var totalAmount = 0;
    lastMonthsOrders.map((order) => {
      totalAmount += order.totalAmount;
    });

    let myData = {
      count: lastMonthsOrders.length,
      totalPrice: totalAmount,
    };

    return myData;
  };
  handleRegionChange = (e) => {
    let { myOrder, myUser } = this.state;
    console.log("test: ", e);
    if (e.value == "All Regions") {
      console.log("test1: ", e);
      this.setState({
        myOrder: orders,
        myUser: users,
      });
    } else {
      console.log("test:2 ", e);
      let currentCityUsers = users.filter((usr) => usr.city == e.value);
      let temp = orders.filter((order) => {
        if (currentCityUsers.find((usr) => usr.userId == order.userId)) {
          return true;
        }
      });
      this.setState({
        myOrder: temp,
        myUser: currentCityUsers,
      });
    }
  };
  render() {
    let { myOrder, myUser } = this.state;
    let count = 0;
    return (
      <div className="px-3 pt-3">
        <Select
          options={options}
          placeholder="Select Region"
          className="region-dropdown"
          onChange={this.handleRegionChange}
        />
        {/* Row 1 starts */}
        <Row>
          <Col className="UpperColumn">
            <Row>Today’s order - {this.todaysOrders().count}</Row>
            <Row>Current Week Order - {this.currentWeeksOrders().count}</Row>
          </Col>

          <Col className="UpperColumn">
            <Row>Today’s order amount - {this.todaysOrders().totalAmount}</Row>
            <Row>
              Current Week amount - {this.currentWeeksOrders().totalPrice}
            </Row>
          </Col>

          <Col className="UpperColumn">
            <Row>MTD order - {this.currentMonthsOrders().count}</Row>
            <Row>Last Month Order - {this.lastMonthsOrders().count}</Row>
          </Col>

          <Col className="UpperColumn">
            <Row>MTD order amount- {this.currentMonthsOrders().totalPrice}</Row>
            <Row>Last month amount- {this.lastMonthsOrders().totalPrice}</Row>
          </Col>
        </Row>
        {/* Row 1 ends */}

        {/* Row 3 starts  */}
        <Row>
          <h3>Top 5 orders</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Order No</th>
                <th>Total Amount</th>
                <th>Total Quantity</th>
                <th>User Name</th>
              </tr>
            </thead>
            <tbody>
              {
                (myOrder.sort(function (a, b) {
                  return a["totalAmount"] - b["totalAmount"];
                }),
                myOrder.reverse(),
                myOrder.map((order) => {
                  if (count < 5) {
                    count++;
                    return (
                      <tr>
                        <td>{count}</td>
                        <td>{order.id}</td>
                        <td>{order.totalAmount}</td>
                        <td>{order.totalQuantity}</td>
                        <td>
                          {
                            myUser.find((usr) => usr.userId == order.userId)
                              .userName
                          }
                        </td>
                      </tr>
                    );
                  } else {
                    return null;
                  }
                }, (count = 0)))
              }
            </tbody>
          </Table>

          <h3>Bottom 5 orders</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Order No</th>
                <th>Total Amount</th>
                <th>Total Quantity</th>
                <th>User Name</th>
              </tr>
            </thead>
            <tbody>
              {
                (myOrder.reverse(),
                myOrder.map((order) => {
                  if (count < 5) {
                    count++;
                    return (
                      <tr>
                        <td>{count}</td>
                        <td>{order.id}</td>
                        <td>{order.totalAmount}</td>
                        <td>{order.totalQuantity}</td>
                        <td>
                          {
                            myUser.find((usr) => usr.userId == order.userId)
                              .userName
                          }
                        </td>
                      </tr>
                    );
                  } else {
                    return null;
                  }
                }, (count = 0)))
              }
            </tbody>
          </Table>
        </Row>

        {/* Row 3 ends  */}

        {/* Row 4 starts */}
        <Row>
          <h3>Top 5 Users</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>User Name</th>
                <th>Total Amount</th>
                <th>Total Quantity</th>
                <th>City</th>
              </tr>
            </thead>
            <tbody>
              {
                ((count = 0),
                myUser.reverse(),
                myUser.map((usr) => {
                  let amount = 0;
                  let qty = 0;
                  if (count < 5) {
                    count++;
                    myOrder.map((order) => {
                      if (order.userId == usr.userId) {
                        amount += order.totalAmount;
                        qty += order.totalQuantity;
                      }
                    });

                    return (
                      <tr>
                        <td>{count}</td>
                        <td>{usr.userName}</td>
                        <td>{amount}</td>
                        <td>{qty}</td>
                        <td>{usr.city}</td>
                      </tr>
                    );
                  } else {
                    return null;
                  }
                }))
              }
            </tbody>
          </Table>

          <h3>Bottom 5 Users</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>User Name</th>
                <th>Total Amount</th>
                <th>Total Quantity</th>
                <th>City</th>
              </tr>
            </thead>
            <tbody>
              {
                ((count = 0),
                myUser.reverse(),
                myUser.map((usr) => {
                  let amount = 0;
                  let qty = 0;
                  if (count < 5) {
                    count++;
                    myOrder.map((order) => {
                      if (order.userId == usr.userId) {
                        amount += order.totalAmount;
                        qty += order.totalQuantity;
                      }
                    });

                    return (
                      <tr>
                        <td>{count}</td>
                        <td>{usr.userName}</td>
                        <td>{amount}</td>
                        <td>{qty}</td>
                        <td>{usr.city}</td>
                      </tr>
                    );
                  } else {
                    return null;
                  }
                }))
              }
            </tbody>
          </Table>
        </Row>
        {/* Row 4 ends */}

        {/* Row 5 start  */}
        <Row>
          <h3>Detailed Order Report</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>User Name</th>
                <th>Order No</th>
                <th>Order Date</th>
                <th>Status</th>
                <th>Total Amount</th>
                <th>Total Quantity</th>
                <th>Total Product Count</th>
              </tr>
            </thead>
            <tbody>
              {
                ((count = 0),
                myOrder.sort(function (a, b) {
                  return a["orderNo"] - b["orderNo"];
                }),
                myOrder.map((order) => {
                  count++;
                  return (
                    <tr>
                      <td>{count}</td>
                      <td>
                        {
                          myUser.find((usr) => usr.userId == order.userId)
                            .userName
                        }
                      </td>
                      <td>{order.orderNo}</td>
                      <td>{order.date}</td>
                      <td>{order.status}</td>
                      <td>{order.totalAmount}</td>
                      <td>{order.totalQuantity}</td>
                      <td>{order.productCount}</td>
                    </tr>
                  );
                }, (count = 0)))
              }
            </tbody>
          </Table>
        </Row>
        {/* Row 5 ends */}
      </div>
    );
  }
}

export default Dashboard;
