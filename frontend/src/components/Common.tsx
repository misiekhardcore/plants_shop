import { Form } from "formik";
import styled from "styled-components";

export const Container = styled.section`
  width: 100%;
  position: relative;
  flex: 1 0 auto;
`;

export const Row = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;

  h2 {
    margin-bottom: 1rem;
  }
`;

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  position: relative;
`;
