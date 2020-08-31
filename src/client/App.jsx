import React, { Component, Fragment } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NewAuction from "./pages/NewAuction";
import MyAuctions from "./pages/MyAuctions";

import axios from "axios";

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogged: "NOT_LOGGED",
      userId: "",
    };

    this.updateLoggedInUserId = this.updateLoggedInUserId.bind(this);
  }

  componentDidMount() {
    console.log("checking user");
    this.checkLoggedUser();
  }

  async checkLoggedUser() {
    axios
      .get("http://localhost:8080/api/user")
      .then((response) => {
        console.log("RESPONSE: ", response.data.userId);
        this.setState({
          isLogged: "IS_LOGGED",
          userId: response.data.userId,
        });
      })
      .catch((error) => {
        console.log("ERROR: ", error);
      });
  }

  updateLoggedInUserId(userId, isLogged) {
    this.setState({
      userId: userId,
      isLogged: isLogged,
    });
  }

  notFound() {
    return (
      <div>
        <h2>NOT FOUND: 404</h2>
        <p>ERROR: the page you requested in not available.</p>
        <p>"LINK TO LOGIN"</p>
      </div>
    );
  }

  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <Login
                  {...props}
                  isLogged={this.state.isLogged}
                  updateLoggedInUserId={this.updateLoggedInUserId}
                />
              )}
            />
            <Route
              path="/login"
              render={(props) => (
                <Login
                  {...props}
                  isLogged={this.state.isLogged}
                  updateLoggedInUserId={this.updateLoggedInUserId}
                />
              )}
            />
            <Route
              exact
              path="/register"
              render={(props) => (
                <Register
                  {...props}
                  isLogged={this.state.isLogged}
                  updateLoggedInUserId={this.updateLoggedInUserId}
                />
              )}
            />
            <Route
              exact
              path="/home"
              render={(props) => (
                <Home
                  {...props}
                  isLogged={this.state.isLogged}
                  userId={this.state.userId}
                />
              )}
            />
            <Route
              exact
              path="/auctions"
              render={(props) => (
                <MyAuctions
                  {...props}
                  isLogged={this.state.isLogged}
                  userId={this.state.userId}
                />
              )}
            />
            <Route
              exact
              path="/new"
              render={(props) => (
                <NewAuction
                  {...props}
                  isLogged={this.state.isLogged}
                  userId={this.state.userId}
                />
              )}
            />
            <Route component={this.notFound} />
          </Switch>
        </Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
