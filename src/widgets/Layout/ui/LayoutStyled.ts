import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

export const Main = styled.main`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;
