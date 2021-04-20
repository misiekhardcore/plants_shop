import React from "react";
import { Link } from "react-router-dom";

const NoMatchPage: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        color: "black",
        flex: 1,
      }}
    >
      <h1>404 Not Found</h1>
      <Link style={{color:'inherit'}} to="/">Go back home</Link>
    </div>
  );
};

export default NoMatchPage;
