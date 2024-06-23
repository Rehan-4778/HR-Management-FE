import React from "react";
import "./HomeNav.css";
import Button from "../Buttons/Button";
import { Link, useNavigate } from "react-router-dom";

const HomeNav = () => {
  const navigate = useNavigate();
  return (
    <div>
      <nav className="nav">
        <div className="px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="nav-logo">Logo</h1>
              </div>
              <div className="hidden sm:block sm:ml-6">
                <ul className="flex space-x-4">
                  <li className="nav-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/services">Services</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/about">Why Us</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/contact">About</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/contact">Contact</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <Button
                  classnames="nav-button"
                  tertiary
                  outline
                  rounded
                  onClick={() => navigate("/login")}
                >
                  Log In
                </Button>
                <Button
                  classnames="nav-button text-white"
                  tertiary
                  rounded
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default HomeNav;
