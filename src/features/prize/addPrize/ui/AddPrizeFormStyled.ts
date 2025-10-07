import styled from "styled-components";

export const PrizeList = styled.div`
  width: 280px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  background: ${({ theme }) => theme.colors.headerBg};
  padding: ${({ theme }) => theme.spacing(2)};
  border-radius: 12px;
`;

export const PrizeItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(2)};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

export const PrizeForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
`;

export const Input = styled.input`
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-family: ${({ theme }) => theme.fonts.main};
`;

export const Select = styled.select`
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-family: ${({ theme }) => theme.fonts.main};
`;
