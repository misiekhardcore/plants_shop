import React from "react";
import { Link } from "react-router-dom";
import { Field, Formik } from "formik";
import { Container, Row, StyledForm } from "../components/Common";
import { usePageTitle } from "../hooks/usePageTitle";
import axios from "axios";
import { Button } from "../components/Button";
import styled from "styled-components";

const Loading = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingSVG = styled.img`
  @keyframes rotate {
    from {
      transform: rotateZ(0);
    }
    to {
      transform: rotateZ(360deg);
    }
  }

  filter: drop-shadow(0 0 2px #000);
  animation: rotate linear 2s infinite;
`;

export const LoginPage: React.FC = () => {
  usePageTitle("Login");
  return (
    <Container>
      <Row>
        <Formik
          initialValues={{ usernameOrEmail: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            try {
              const response = await axios.post(
                "http://localhost:4000/api/users/login",
                values
              );
              // setSubmitting(false);
              console.log(response);
            } catch (error) {
              console.log({ error });
              setErrors(error.response.data.message);
            }
          }}
        >
          {({
            isSubmitting,
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <StyledForm onSubmit={handleSubmit}>
              {errors && <p>{JSON.stringify(errors, null, 2)}</p>}
              {isSubmitting && (
                <Loading>
                  <LoadingSVG src="/assets/svg/Loading.svg" />
                </Loading>
              )}
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
