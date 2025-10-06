import { Outlet } from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useBreakpoint } from "../hooks/useWindowSize.ts";
import {
  Footer,
  IconButton,
  Main,
  Nav,
  StyledLink,
  Wrapper,
  Header,
} from "./LayoutStyled.ts";
import {useClickOutside} from "../hooks/useClickOutside.ts";

type LayoutProps = {
  toggleTheme?: () => void;
};

export default function Layout({ toggleTheme }: LayoutProps) {
  const breakpoint = useBreakpoint();
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useClickOutside(navRef, () => {
    if (breakpoint.isMobile || breakpoint.isTablet) {
      setMenuOpen(false);
    }
  });

  // если ширина экрана >= desktop — меню всегда открыто
  useEffect(() => {
    if (!breakpoint.isMobile && !breakpoint.isTablet) {
      setMenuOpen(true);
    } else {
      setMenuOpen(false);
    }
  }, [breakpoint.isMobile, breakpoint.isTablet]);

  const handleLinkClick = () => {
    // закрываем меню только на мобильных устройствах
    if (breakpoint.isMobile || breakpoint.isTablet) {
      setMenuOpen(false);
    }
  };

  return (
    <Wrapper>
      <Header>
        {(breakpoint.isMobile || breakpoint.isTablet) && (
          <IconButton onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </IconButton>
        )}

        <AnimatePresence>
          {menuOpen && (
            <Nav
              as={motion.nav}
              ref={navRef}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              $isMobile={breakpoint.isMobile || breakpoint.isTablet}
            >
              <StyledLink to="/" onClick={handleLinkClick}>
                Главная
              </StyledLink>
              <StyledLink to="/gallery" onClick={handleLinkClick}>
                Галерея
              </StyledLink>
              <StyledLink to="/letters" onClick={handleLinkClick}>
                Письма
              </StyledLink>
              <StyledLink to="/dreams" onClick={handleLinkClick}>
                Мечты
              </StyledLink>
              <StyledLink to="/surprise" onClick={handleLinkClick}>
                Сюрприз
              </StyledLink>
            </Nav>
          )}
        </AnimatePresence>

        <IconButton onClick={toggleTheme}>
          {localStorage.getItem("theme") === "dark" ? <Sun /> : <Moon />}
        </IconButton>
      </Header>

      <Main>
        <Outlet />
      </Main>

      <Footer>Footer</Footer>
    </Wrapper>
  );
}
