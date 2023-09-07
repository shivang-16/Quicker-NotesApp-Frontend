import React, { useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { server } from "../main";
import "../styles/login.css";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../main";
import Spinner from "./Spinner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated, isLoading, setIsLoading } =
    useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/users/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      toast.success(data.message);
      setIsLoading(false);
      setIsAuthenticated(true);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLoading(false);
      setIsAuthenticated(false);
    }
  };

  if (isAuthenticated) return <Navigate to={"/"} />;

  return (
    <>
      <main id="main-body">
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="login-box">
            <div className="login-card">
              <div className="login-header">
                <h1>Login</h1>
              </div>
              <div className="login-content">
                <form action="" onSubmit={handleLogin}>
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button className="login-btn" type="submit">
                    Login
                  </button>
                </form>
                <div className="signup-button">
                  <p>Do not have account?</p>
                  <Link to="/signup">
                    <button className="login-btn">SignUp</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default Login;
