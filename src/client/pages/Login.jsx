import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorMsg: "",
      isLogged: "NOT_LOGGED",
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
    axios
      .post("http://localhost:8080/api/login", {
        userId: this.state.email,
        password: this.state.password,
      })
      .then((response) => {
        console.log("RESPONSE: ", response);
        this.props.updateLoggedInUserId(this.state.email, "IS_LOGGED");
        this.props.history.push("/home");
      })
      .catch((error) => {
        console.log("ERROR: ", error);
        this.setState({ errorMsg: "Wrong username or password" });
      });
    event.preventDefault();
  }

  render() {
    return (
      <div className="login-container">
        <h2>Log in</h2>
        <div className="login-content">
          <form className="login-form" onSubmit={this.handleSubmit}>
            <input
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
            <button type="submit">Log in!</button>
          </form>
          <div className="separator">
            <p>OR</p>
            <div className="underline"></div>
          </div>
          <h2>
            <Link to="/register">REGISTER</Link>
          </h2>
          <p className="errorMsg">{this.state.errorMsg}</p>
        </div>
      </div>
    );
  }
}
export default Login;
