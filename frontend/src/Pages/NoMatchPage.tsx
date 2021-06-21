import React from "react";
import { Link } from "react-router-dom";
import { CenterContainer } from "../components/Common";

const NoMatchPage: React.FC = () => {
  return (
    <CenterContainer>
      <h1>404 Not Found</h1>
      <Link style={{ color: "inherit" }} to="/">
        Go back home
      </Link>
    </CenterContainer>
  );
};

export default NoMatchPage;
