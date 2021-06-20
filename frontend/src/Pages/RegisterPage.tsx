import React from "react";
import { Link } from "react-router-dom";
import { Field, Formik } from "formik";
import {
  Container,
  Loading,
  Row,
  StyledForm,
} from "../components/Common";
import { usePageTitle } from "../hooks/usePageTitle";
import { register, selectUser } from "../redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { Button } from "../components/Button";

export const RegisterPage: React.FC = () => {
  usePageTitle("Register");
  const dispatch = useAppDispatch();
  const { error, loading } = useAppSelector(selectUser);
  return (
    <Container>
      <Row>
        <Formik
          initialValues={{
            username: "",
            password: "",
            confirmPassword: "",
            email: "",
          }}
          onSubmit={(values) => dispatch(register(values))}
        >
          {({ handleBlur, handleChange, handleSubmit }) => (
            <StyledForm onSubmit={handleSubmit}>
              {error && <p style={{ color: "red" }}>{error.message}</p>}
              <Loading isLoading={loading} />
              <label htmlFor="username">username</label>
              <Field id="username" name="username" />
              <label htmlFor="email">Email</label>
              <Field id="email" name="email" type="email" />
              <label htmlFor="password">Password</label>
              <Field id="password" name="password" />
              <label htmlFor="confirmPassword">Confirm password</label>
              <Field id="password" name="confirmPassword" />
              <Link to="/login">Have an account already? Login</Link>
              <Button type="submit">Register</Button>
            </StyledForm>
          )}
        </Formik>
      </Row>
    </Container>
  );
};
