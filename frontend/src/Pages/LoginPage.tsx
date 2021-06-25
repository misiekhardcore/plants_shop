import { Field, Formik } from "formik";
import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button } from "../components/Button";
import {
  Container,
  Loading,
  Row,
  StyledForm,
} from "../components/Common";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { usePageTitle } from "../hooks/usePageTitle";
import { login, selectUser } from "../redux/slices/userSlice";

export const LoginPage: React.FC = () => {
  usePageTitle("Login");

  const history = useHistory();

  const dispatch = useAppDispatch();
  const { error, loading, token } = useAppSelector(selectUser);

  useEffect(() => {
    if (token) history.push("/");
  }, [token, history]);

  return (
    <Container>
      <Row>
        <Formik
          initialValues={{ usernameOrEmail: "", password: "" }}
          onSubmit={(values) => dispatch(login(values))}
        >
          {({ handleBlur, handleChange, handleSubmit }) => (
            <StyledForm onSubmit={handleSubmit}>
              {error && <p style={{ color: "red" }}>{error.message}</p>}
              <Loading isLoading={loading} />
              <label htmlFor="usernameOrEmail">Email or Username</label>
              <Field id="usernameOrEmail" name="usernameOrEmail" />
              <label htmlFor="password">Password</label>
              <Field id="password" name="password" type="password" />
              <Link to="/register">New here? Register</Link>
              <Button type="submit">Log In</Button>
            </StyledForm>
          )}
        </Formik>
      </Row>
    </Container>
  );
};
