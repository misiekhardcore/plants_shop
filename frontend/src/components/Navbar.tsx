import React from "react";
import { useAppSelector } from "../hooks/hooks";
import { selectCart } from "../redux/slices/cartSlice";
import getTotalAmount from "../redux/utils/getTotalAmount";

import "./Navbar.scss";

export const Navbar: React.FC = () => {
  const cart = useAppSelector(selectCart);
  const totalAmount = getTotalAmount(cart);
  return (
    <div className="navbar">
      <nav>
        <h1 className="logo">Plant House</h1>
        <ul>
          <li>Cart {totalAmount > 0 && `(${totalAmount})`}</li>
          <li>Profile</li>
          <li>Log out</li>
        </ul>
      </nav>
    </div>
  );
};
