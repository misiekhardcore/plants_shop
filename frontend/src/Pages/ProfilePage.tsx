import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, CenterContainer } from "../components/Common";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { getUser, selectUser } from "../redux/slices/userSlice";

export const ProfilePage: React.FC = () => {
  const { token, user } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUser(null));
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
      <Row>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </Row>
    </Container>
  );
};
