import styled from "styled-components";
import {LoginForm} from "../../../features/auth/login/ui/LoginForm.tsx";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  justify-content: center;
  align-items: center;
  font-family: ${({ theme }) => theme.fonts.main};
`;

export function LoginPage() {
  return (
    <Wrapper>
      <LoginForm/>
    </Wrapper>
  );
}
