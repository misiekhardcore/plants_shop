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

const LoadingContainer = styled.div`
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

export const Loading: React.FC<{ isLoading: boolean }> = ({
  isLoading = false,
}) => {
  return isLoading ? (
    <LoadingContainer>
      <LoadingSVG src="/assets/svg/Loading.svg" />
    </LoadingContainer>
  ) : null;
};

export const CenterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex: 1;
  color: ${(props) => props.theme.colors.black};
`;
