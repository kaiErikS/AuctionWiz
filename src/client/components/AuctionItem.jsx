import React, { Component } from "react";

class AuctionItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      errorMsg: "",
      isSold: false,
      currentBid: "",
      isDeleted: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.markAsSold = this.markAsSold.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  componentDidMount() {
    let value = this.props.isSold;
    if (value === "true") {
      value = true;
    } else if (value === "false") {
      value = false;
    }

    this.setState({ isSold: value, currentBid: this.props.currentBid });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  async markAsSold() {
    event.preventDefault();
    let response;
    try {
      response = await fetch(
        "http://localhost:8080/api/sold/" + this.props.id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      this.setState({ errorMsg: "An error occured..." });
    }
    if (response.status === 204) {
      this.setState({ isSold: true });
    }
  }

  async deleteItem() {
    let response;
    try {
      response = await fetch(
        "http://localhost:8080/api/delete/" + this.props.id,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      this.setState({ errorMsg: "An error occured..." });
    }
    if (response.status === 204) {
      this.setState({ isDeleted: true });
    }
  }

  async handleSubmit(event) {
    this.setState({ errorMsg: "" });
    event.preventDefault();
    let sold = false;
    let isHigherThanBuyout =
      parseInt(this.state.amount) >= parseInt(this.props.buyout);
    if (this.state.amount <= this.props.currentBid) {
      this.setState({ errorMsg: "Bid must be higher than the current bid..." });
    } else {
      if (isHigherThanBuyout) {
        sold = true;
      }

      let response;

      try {
        response = await fetch(
          "http://localhost:8080/api/bid/" +
            this.props.id +
            "/" +
            this.props.userId +
            "/" +
            this.state.amount +
            "/" +
            sold,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } catch (error) {
        this.setState({ errorMsg: "An error occured..." });
      }
      if (response.status === 204) {
        this.setState({ currentBid: this.state.amount });
      }

      if (response.status === 403) {
        this.setState({ errorMsg: "Bidding on your items is forbidden..." });
      }
      if (isHigherThanBuyout) {
        this.setState({ isSold: sold });
      }
    }
  }

  render() {
    if (this.state.isDeleted === true) {
      return <div></div>;
    } else {
      return (
        <div className="item-container">
          <img
            className="hammer"
            src="https://img.icons8.com/plasticine/100/000000/auction.png"
          />
          <h2 id="item">{this.props.item}</h2>
          <p id="description">{this.props.description}</p>
          <p id="s-price">STARTING PRICE: {this.props.startingPrice} NOK</p>
          <p id="c-bid">CURRENT BID: {this.state.currentBid} NOK</p>
          <p id="buyout">BUYOUT: {this.props.buyout} NOK</p>
          {this.state.isSold === true ? (
            <h2 className="sold">SOLD!</h2>
          ) : (
            <form onSubmit={this.handleSubmit}>
              <input
                name="amount"
                placeholder="Amount"
                value={this.state.amount}
                onChange={this.handleChange}
                required
              />
              <button type="submit">Bid!</button>
            </form>
          )}
          <p className="errorMsg">{this.state.errorMsg}</p>
          {this.props.editable === true && this.state.isSold === false ? (
            <div>
              <button onClick={this.markAsSold}>Mark as sold</button>
              <button onClick={this.deleteItem}>Delete</button>
            </div>
          ) : (
            <div></div>
          )}
          <div className="seller-field">
            <h4 id="seller">Seller: {this.props.seller}</h4>
          </div>
        </div>
      );
    }
  }
}
export default AuctionItem;
