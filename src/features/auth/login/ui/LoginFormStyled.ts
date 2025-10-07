import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.headerBg};
  padding: ${({ theme }) => theme.spacing(4)};
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  width: 320px;
  gap: ${({ theme }) => theme.spacing(2)};
`;

export const Input = styled.input`
  padding: ${({ theme }) => theme.spacing(1.5)};
  border: 2px solid ${({ theme }) => theme.colors.accent};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.background};
  font-size: 16px;
  outline: none;
  transition: 0.3s;
  color: white;
  &:focus {
    box-shadow: 0 0 8px ${({ theme }) => theme.colors.accent};
  }
`;

export const Button = styled.button`
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

export const ErrorText = styled.p`
  color: #ff4d6d;
  font-weight: 600;
  font-size: 14px;
`;
