import styled from "styled-components";
import {motion} from "framer-motion";
import {Link} from "react-router-dom";

export const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  background: ${({ theme }) => theme.colors.headerBg};
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
`;

export const Nav = styled(motion.nav)<{ $isMobile?: boolean }>`
  display: ${({ $isMobile }) => ($isMobile ? "flex" : "flex")};
  flex-direction: ${({ $isMobile }) => ($isMobile ? "column" : "row")};
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  position: ${({ $isMobile }) => ($isMobile ? "absolute" : "static")};
  top: ${({ $isMobile }) => ($isMobile ? "60px" : "auto")};
  left: ${({ $isMobile }) => ($isMobile ? "0" : "auto")};
  width: ${({ $isMobile }) => ($isMobile ? "100%" : "auto")};
  background: ${({ theme, $isMobile }) =>
  $isMobile ? theme.colors.headerBg : "transparent"};
  padding: ${({ $isMobile }) => ($isMobile ? "16px 0" : "0")};
  box-shadow: ${({ $isMobile }) =>
  $isMobile ? "0 4px 10px rgba(0,0,0,0.1)" : "none"};
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  font-size: 1.2rem;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  transition: color 0.3s;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;
