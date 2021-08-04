import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, CenterContainer } from "../components/Common";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { getUser, selectUser } from "../redux/slices/userSlice";
import styled from "styled-components";
import { UserInfo } from "../screens/UserInfo";
import { UserOrders } from "../screens/UserOrders";

const TopBar = styled.nav`
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: space-around;
  width: 100%;
  & ul {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    list-style: none;

    & li {
      padding: 1rem 2rem;

      &:hover {
        cursor: pointer;
        background-color: #aaa;
      }
    }
  }
`;

export const ProfilePage: React.FC = () => {
  const [page, setPage] = useState(0);
  const { token, user } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  if (!token || !user)
    return (
      <CenterContainer>
        <p>You have to be logged in to see your profile!</p>
        <Link to="/login">Log in to your account</Link>
      </CenterContainer>
    );

  return (
    <Container>
      <TopBar>
        <ul>
          <li onClick={() => setPage(0)}>Your info</li>
          <li onClick={() => setPage(1)}>Order history</li>
        </ul>
      </TopBar>
      <Row>
        {page === 0 && <UserInfo />}
        {page === 1 && <UserOrders />}
      </Row>
    </Container>
  );
};
