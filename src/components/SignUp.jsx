import React, { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { server } from "../main";
import toast from "react-hot-toast";
import { Context } from "../main";
const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated, isLoading, setIsLoading } =
    useContext(Context);
  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/users/register`,
        {
          name,
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
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  };
  if (isAuthenticated) return <Navigate to={"/"} />;

  return (
    <>
      <main id="main-body">
        {
          <div className="login-box">
            <div className="login-card">
              <div className="login-header">
                <h1>Signup</h1>
              </div>
              <div className="login-content">
                <form onSubmit={handleSignUp}>
                  <input
                    type="text"
                    placeholder="Enter Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
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
                  <button
                    className="login-btn"
                    disabled={isLoading}
                    type="submit"
                  >
                    Sign Up
                  </button>
                </form>
                <div className="signup-button">
                  <p>Already have account?</p>
                  <Link to="/login">
                    <button className="login-btn" disabled={isLoading}>
                      Login
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        }
      </main>
    </>
  );
};

export default SignUp;
