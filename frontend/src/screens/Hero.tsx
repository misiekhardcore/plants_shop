import React from "react";
import "./Hero.scss";

export const Hero: React.FC = () => {
  return (
    <div className="hero">
      <div className="hero__dark"></div>
      <div className="hero__cta">
        <h2>Find plants that will suit your place</h2>
        <button>Start searching</button>
        <a href="/">Check how it works</a>
      </div>
    </div>
  );
};
