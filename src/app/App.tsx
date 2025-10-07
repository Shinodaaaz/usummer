import { useEffect, useState } from "react";
import { useRoutes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import {AnimatePresence, motion} from "framer-motion";
import {darkTheme, lightTheme} from "../shared/config/theme.ts";
import {createRoutes} from "./router";
import {GlobalStyle} from "./styles/globalStyles.ts";

export default function App() {
  const [theme, setTheme] = useState(lightTheme);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") setTheme(darkTheme);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => {
      const newTheme = prev.name === "light" ? darkTheme : lightTheme;
      localStorage.setItem("theme", newTheme.name);
      if (document.body.classList.contains('dark')) {
        document.body.classList.remove('dark')
      } else {
        document.body.classList.add('dark');
      }
      return newTheme;
    });
  };

  const element = useRoutes(createRoutes(toggleTheme));

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AnimatePresence mode="wait">
        <motion.div
          key={theme.name}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {element}
        </motion.div>
      </AnimatePresence>
    </ThemeProvider>
  );
}
