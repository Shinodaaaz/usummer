import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";
import {ThemeProvider} from "styled-components";
import {GlobalStyle} from "./app/globalStyles.ts";
import {theme} from "./app/theme.ts";
import {AuthProvider} from "./app/providers/AuthContext.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle/>
        <AuthProvider>
          <App/>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
