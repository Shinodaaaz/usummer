import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import {useBreakpoint} from "../hooks/useWindowSize.ts";
import {Footer, IconButton, Main, Nav, StyledLink, Wrapper, Header} from "./LayoutStyled.ts";

type LayoutProps = {
  toggleTheme?: () => void;
};

export default function Layout({ toggleTheme }: LayoutProps) {
  const breakpoint = useBreakpoint();
  const [menuOpen, setMenuOpen] = useState(!breakpoint.isMobile);
  const isMenuOpen = (breakpointIsMobile: boolean) => {
    if (breakpointIsMobile) {
      setMenuOpen(false)
    }
  }
  return (
    <Wrapper>
      <Header>
        {
          breakpoint.isMobile &&
            <IconButton onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X /> : <Menu />}
            </IconButton>
        }
        <AnimatePresence>
          {menuOpen && (
            <Nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <StyledLink to="/" onClick={() => isMenuOpen(breakpoint.isMobile)}>Главная</StyledLink>
              <StyledLink to="/gallery" onClick={() => isMenuOpen(breakpoint.isMobile)}>Галерея</StyledLink>
              <StyledLink to="/letters" onClick={() => isMenuOpen(breakpoint.isMobile)}>Письма</StyledLink>
              <StyledLink to="/dreams" onClick={() => isMenuOpen(breakpoint.isMobile)}>Мечты</StyledLink>
              <StyledLink to="/surprise" onClick={() => isMenuOpen(breakpoint.isMobile)}>Сюрприз</StyledLink>
            </Nav>
          )}
        </AnimatePresence>

        <IconButton onClick={toggleTheme}>
          {localStorage.getItem("theme") === 'dark' ? <Sun /> : <Moon />}
        </IconButton>
      </Header>

      <Main>
        <Outlet />
      </Main>

      <Footer>Footer</Footer>
    </Wrapper>
  );
}
