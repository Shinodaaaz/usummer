import {Menu, X} from "lucide-react";
import {AnimatePresence, motion} from "framer-motion";
import type {FC} from "react";
import {useBreakpoint} from "../../../app/hooks/useWindowSize.ts";
import {useEffect, useRef, useState} from "react";
import {useClickOutside} from "../../../app/hooks/useClickOutside.ts";
import {HeaderWrapper, IconButton, Nav, StyledLink} from "./HeaderStyled.ts";
import {ThemeSwitcher} from "../../../features/theme/ui/ThemeSwitcher.tsx";

type HeaderProps = {
  toggleTheme?: () => void
}

export const Header: FC<HeaderProps> = (props) => {
  const {toggleTheme} = props;
  const [menuOpen, setMenuOpen] = useState(false);
  const breakpoint = useBreakpoint();
  const navRef = useRef<HTMLDivElement>(null);

  useClickOutside(navRef,
    () => {
      if (breakpoint.isMobile || breakpoint.isTablet) {
        setMenuOpen(false);
      }
    });


  useEffect(() => {
      if (!breakpoint.isMobile && !breakpoint.isTablet) {
        setMenuOpen(true);
      } else {
        setMenuOpen(false);
      }
    },
    [breakpoint.isMobile, breakpoint.isTablet]);
  const handleLinkClick = () => {
    if (breakpoint.isMobile || breakpoint.isTablet) {
      setMenuOpen(false);
    }
  };
  return (
    <HeaderWrapper>
      {(breakpoint.isMobile || breakpoint.isTablet) && (
        <IconButton onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X/> : <Menu/>}
        </IconButton>
      )}

      <AnimatePresence>
        {menuOpen && (
          <Nav
            as={motion.nav}
            ref={navRef}
            initial={{
              opacity: 0,
              y: -20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            exit={{
              opacity: 0,
              y: -10
            }}
            transition={{duration: 0.3}}
            $isMobile={breakpoint.isMobile || breakpoint.isTablet}
          >
            <StyledLink to="/" onClick={handleLinkClick}>
              Главная
            </StyledLink>
            <StyledLink to="/lottery-wheel" onClick={handleLinkClick}>
              Лотерея
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

     <ThemeSwitcher toggleTheme={toggleTheme}/>
    </HeaderWrapper>
  );
};

