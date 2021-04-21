import React from "react";
import { Link } from "react-router-dom";
import "./Hero.scss";

export const Hero: React.FC = () => {
  return (
    <div className="hero">
      <div className="hero__dark"></div>
      <div className="hero__cta">
        <h2>Find plants that will suit your place</h2>
        <Link to="/products">
          <button>Start searching</button>
        </Link>
        <a href="/">Check how it works</a>
      </div>
    </div>
  );
};
