import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      passwordRep: "",
      errorMsg: "",
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
    if (!this.state.password == this.state.passworRep) {
      this.setState({
        errorMsg: "Passwords do not match...",
      });
      event.preventDefault();
    } else {
      axios
        .post("http://localhost:8080/api/signup", {
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
        });
      event.preventDefault();
    }
  }

  render() {
    return (
      <div className="login-container">
        <h2>Register</h2>
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
            <input
              type="password"
              name="passwordRep"
              placeholder="Repeat password"
              value={this.state.passwordRep}
              onChange={this.handleChange}
              required
            />
            <button type="submit">Send</button>
          </form>
          <div className="separator">
            <p>OR</p>
            <div className="underline"></div>
          </div>
          <h2>
            <Link to="/login">LOG IN</Link>
          </h2>
          <p className="errorMsg">{this.state.errorMsg}</p>
        </div>
      </div>
    );
  }
}
export default Register;
