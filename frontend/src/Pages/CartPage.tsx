import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../components/Button";
import { CartProduct } from "../components/CartProduct";
import { CenterContainer, Container, Row } from "../components/Common";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { usePageTitle } from "../hooks/usePageTitle";
import { selectCart } from "../redux/slices/cartSlice";
import { createOrder, selectOrder } from "../redux/slices/orderSlice";
import getTotalAmount from "../redux/utils/getTotalAmount";
import getTotalPrice from "../redux/utils/getTotalPrice";

const CartGrid = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 2rem;
`;

const CartList = styled.ul``;

const CartSummary = styled.section`
  color: white;
  padding: 1rem;
  border-radius: 4px;
  background-color: ${(props) => props.theme.colors.primary};
  height: max-content;
`;

const CartPage: React.FC = () => {
  usePageTitle("Cart");

  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCart);
  const totalAmount = getTotalAmount(cart);
  const totalPrice = getTotalPrice(cart).toFixed(2);

  const { order } = useAppSelector(selectOrder);

  if (!cart.length)
    return (
      <CenterContainer>
        <p>Cart is empty</p>
        <Link to="/products">Go shopping</Link>
      </CenterContainer>
    );
  return (
    <Container>
      <Row>
        <h2>Cart</h2>
        <CartGrid>
          <CartList>
            {cart.map((c) => (
              <CartProduct key={c._id} product={c} />
            ))}
          </CartList>
          <CartSummary>
            <h2>Summary</h2>
            <p>
              You are buying <strong>{totalAmount}</strong> items
            </p>
            <p>
              for total price of <strong>${totalPrice}</strong>
            </p>
            <Button onClick={() => dispatch(createOrder({}))}>
              Check out
            </Button>
          </CartSummary>
        </CartGrid>
      </Row>
      <pre>{JSON.stringify(order, null, 2)}</pre>
    </Container>
  );
};

export default CartPage;
