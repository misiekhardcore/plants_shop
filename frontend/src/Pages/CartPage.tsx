import React from "react";
import { Container, Row } from "../components/Common";
import { useAppSelector } from "../hooks/hooks";
import { usePageTitle } from "../hooks/usePageTitle";
import { selectCart } from "../redux/slices/cartSlice";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { CartProduct } from "../components/CartProduct";
import getTotalAmount from "../redux/utils/getTotalAmount";
import getTotalPrice from "../redux/utils/getTotalPrice";
import { Button } from "../components/Button";

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

  const cart = useAppSelector(selectCart);
  const totalAmount = getTotalAmount(cart);
  const totalPrice = getTotalPrice(cart).toFixed(2);

  return (
    <Container>
      <Row>
        <h2>Cart</h2>
        {cart.length > 0 ? (
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
              <Button>Check out</Button>
            </CartSummary>
          </CartGrid>
        ) : (
          <div>
            <p>Cart is empty</p>
            <Link to="/products">Go shopping</Link>
          </div>
        )}
      </Row>
    </Container>
  );
};

export default CartPage;
