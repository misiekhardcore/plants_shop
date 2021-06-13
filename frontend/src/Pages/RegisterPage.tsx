import React from "react";
import { Link } from "react-router-dom";
import { Field, Formik } from "formik";
import { Container, Row, StyledForm } from "../components/Common";
import { usePageTitle } from "../hooks/usePageTitle";

export const RegisterPage: React.FC = () => {
  usePageTitle("Register");
  return (
    <Container>
      <Row>
        <Formik
          initialValues={{ usernameOrEmail: "", password: "" }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          <StyledForm>
            <label htmlFor="username">username</label>
            <Field id="username" name="username" />
            <label htmlFor="email">Email</label>
            <Field id="email" name="email" type="email" />
            <label htmlFor="password">Password</label>
            <Field id="password" name="password" />
            <label htmlFor="confirmPassword">Confirm password</label>
            <Field id="password" name="confirmPassword" />
            <Link to="/login">Have an account already? Login</Link>
          </StyledForm>
        </Formik>
      </Row>
    </Container>
  );
};
