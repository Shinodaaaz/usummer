import styled from "styled-components";
import {motion} from "framer-motion";
import {NavLink} from "react-router-dom";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: ${({ theme }) => theme.colors.headerBg};
  position: relative;
`;

export const Nav = styled(motion.nav)`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    position: absolute;
    top: 70px;
    right: 20px;
    background: ${({ theme }) => theme.colors.headerBg};
    border-radius: 12px;
    flex-direction: column;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0,0,0,0.15);
  }
`;

export const StyledLink = styled(NavLink)`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  transition: color 0.2s;

  &.active {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

export const Main = styled.main`
  flex: 1;
  padding: 40px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Footer = styled.footer`
  text-align: center;
  padding: 20px;
  font-size: 14px;
  opacity: 0.7;
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
`;
