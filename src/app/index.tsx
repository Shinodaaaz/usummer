import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";
import {ThemeProvider} from "styled-components";
import {GlobalStyle} from "./styles/globalStyles.ts";
import {AuthProvider} from "./providers/AuthContext.tsx";
import {lightTheme} from "../shared/config/theme.ts";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={lightTheme}>
        <GlobalStyle/>
        <AuthProvider>
          <App/>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
