import styled from "styled-components";

interface Prop {
  children: JSX.Element | JSX.Element[];
}

const StyledContainer = styled.div`
  min-height: 100vh;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const MainLayout = ({ children }: Prop) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default MainLayout;
