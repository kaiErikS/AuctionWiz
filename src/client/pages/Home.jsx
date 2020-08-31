import React, { Component } from "react";
import axios from "axios";
import Header from "../components/Header";
import AuctionItem from "../components/AuctionItem";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: null,
      loading: true,
    };
  }

  componentDidMount() {
    this.getItems();
  }

  async getItems() {
    let response;
    let payload;

    try {
      response = await fetch("http://localhost:8080/api/items");
      payload = await response.json();
    } catch (err) {
      return;
    }

    if (response.status === 200) {
      this.setState({
        items: payload,
        loading: false,
      });
      console.log(payload.data[1]);
    } else {
      console.log("Connection error with status:  " + response.status);
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="home-container">
          <Header {...this.props} />
          <div className="greeting">
            <h3 id="title">Welcome, {this.props.userId}</h3>
          </div>
        </div>
      );
    } else {
      return (
        <div className="home-container">
          <Header {...this.props} />
          <div className="items-container">
            {this.state.items.data.map((item) => (
              <AuctionItem
                key={item.id}
                id={item.id}
                item={item.item}
                description={item.description}
                startingPrice={item.startingPrice}
                currentBid={item.currentBid}
                buyout={item.buyout}
                isSold={item.isSold}
                userId={this.props.userId}
                seller={item.seller}
              />
            ))}
          </div>
        </div>
      );
    }
  }
}
export default Home;
