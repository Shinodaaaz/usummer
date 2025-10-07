import {Button, ErrorText, Form, Input} from "./LoginFormStyled.ts";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../../../app/providers/AuthContext.tsx";

export const LoginForm = () => {
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


  return(
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
  )
}
