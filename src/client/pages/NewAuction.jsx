import React, { Component } from "react";
import Header from "../components/Header";

class NewAuction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: "",
      description: "",
      startingPrice: "",
      buyout: "",
      errorMsg: "",
      success: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();

    this.setState({ errorMsg: "", success: "" });
    if (this.props.userId === "") {
      this.setState({ errorMsg: "You must be logged in..." });
    } else {
      if (this.state.buyout <= this.state.startingPrice) {
        this.setState({
          errorMsg: "Buyout must be higher than starting price...",
        });
      } else if (this.props.userId === undefined) {
        this.setState({
          errorMsg: "You must be logged in to create an auction...",
        });
      } else {
        let response;

        try {
          response = await fetch(
            "http://localhost:8080/api/new/" +
              this.props.userId +
              "/" +
              this.state.item +
              "/" +
              this.state.description +
              "/" +
              this.state.startingPrice +
              "/" +
              this.state.buyout,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        } catch (error) {
          this.setState({ errorMsg: "There was an error..." });
          console.log(error);
        }

        if (response.status === 204) {
          this.setState({
            item: "",
            description: "",
            startingPrice: "",
            buyout: "",
            errorMsg: "",
            success: "SUCCESS",
          });
        }
      }
    }
  }

  render() {
    return (
      <div>
        <Header userId={this.props.userId} />
        <div className="login-container">
          <h2>Create Auction</h2>
          <div className="newAuction-content">
            <form className="newAuction-form" onSubmit={this.handleSubmit}>
              <input
                name="item"
                placeholder="Item"
                value={this.state.item}
                onChange={this.handleChange}
                required
              />
              <input
                name="description"
                placeholder="Description"
                value={this.state.description}
                onChange={this.handleChange}
                required
              />
              <input
                type="number"
                name="startingPrice"
                placeholder="Starting price"
                value={this.state.startingPrice}
                onChange={this.handleChange}
                required
              />
              <input
                type="number"
                name="buyout"
                placeholder="Buyout"
                value={this.state.buyout}
                onChange={this.handleChange}
                required
              />
              <button className="submit" type="submit">
                Send!
              </button>
            </form>

            <p className="errorMsg">{this.state.errorMsg}</p>
            <p className="sold">{this.state.success}</p>
          </div>
        </div>
      </div>
    );
  }
}
export default NewAuction;
