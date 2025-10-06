import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../../providers/AuthContext.tsx";

const Wrapper = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: ${({ theme }) => theme.fonts.main};
`;

const Form = styled.form`
  background: ${({ theme }) => theme.colors.headerBg};
  padding: ${({ theme }) => theme.spacing(4)};
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  width: 320px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing(1.5)};
  border: 2px solid ${({ theme }) => theme.colors.accent};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.background};
  font-size: 16px;
  outline: none;
  transition: 0.3s;

  &:focus {
    box-shadow: 0 0 8px ${({ theme }) => theme.colors.accent};
  }
`;

const Button = styled.button`
  background: ${({ theme }) => theme.colors.accent};
  color: white;
  font-size: 16px;
  border: none;
  padding: ${({ theme }) => theme.spacing(1.5)};
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
  font-weight: 600;

  &:hover {
    opacity: 0.9;
  }
`;

const ErrorText = styled.p`
  color: #ff4d6d;
  font-weight: 600;
  font-size: 14px;
`;

export function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(username, password);
    if (!success) {
      setError("Неверный логин или пароль 💔");
    } else {
      navigate("/");
    }
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <h2>Вход</h2>
        <Input
          type="text"
          placeholder="Логин"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <ErrorText>{error}</ErrorText>}
        <Button type="submit">Войти</Button>
      </Form>
    </Wrapper>
  );
}
