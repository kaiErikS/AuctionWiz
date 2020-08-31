import React, { Component } from "react";
import axios from "axios";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
    };

    this.handleLogOut = this.handleLogOut.bind(this);
    this.checksUser = this.checksUser.bind(this);
  }

  componentDidMount() {
    this.checksUser();
  }

  checksUser() {
    this.setState({ userName: this.props.userId });
  }

  handleLogOut() {
    axios
      .post("http://localhost:8080/api/logout")
      .then((response) => {
        console.log("RESPONSE: ", response);
      })
      .catch((error) => {
        console.log("ERROR: ", error);
      });
    window.location.href = "/login";
  }

  render() {
    return (
      <div className="header-container">
        <nav id="main-nav">
          <ul className="pages">
            <li className="page-items">
              <a href="/home" className="pagelink">
                Home
              </a>
            </li>
            <li className="page-items">
              <a href="/auctions" className="pagelink">
                My Auctions
              </a>
            </li>
            <li className="page-items">
              <a href="/new" className="pagelink">
                New item
              </a>
            </li>
          </ul>
          <h1 id="header-title">AuctionWizard</h1>
          <div className="logout" onClick={this.handleLogOut}>
            {this.props.userId === "" ? <p>Log in</p> : <p>Log out</p>}
          </div>
        </nav>

        <div className="greeting">
          {this.props.userId === "" ? (
            <h3>You must be logged in to make a bid...</h3>
          ) : (
            <h3>Welcome, {this.props.userId}</h3>
          )}
        </div>
      </div>
    );
  }
}
export default Header;
