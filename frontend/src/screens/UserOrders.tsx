import React from "react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { getOrders, selectOrder } from "../redux/slices/orderSlice";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Product = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  border: 1px solid red;
  padding: 1rem;
`;

export const UserOrders: React.FC = () => {
  const { orders } = useAppSelector(selectOrder);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);
  return (
    <div>
      <ul>
        {orders.map((order) => (
          <Product>
            <p>
              order no:
              <Link to={`/orders/${order._id}`}>{order._id}</Link>
            </p>
            <p>
              ordered at:
              {new Date(order.createdAt).toLocaleString()}
            </p>
            <p>
              paid at:
              {order.paid
                ? new Date(order.paymentDate || "").toLocaleString()
                : "not paid"}
            </p>
            <p>
              delivered at:
              {order.delivered
                ? new Date(order.deliveryDate || "").toLocaleString()
                : "not delivered"}
            </p>
          </Product>
        ))}
      </ul>
    </div>
  );
};
