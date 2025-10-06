import {Gallery} from "./pages/Gallery/Gallery.tsx";
import {Home} from "./pages/Home/Home.tsx";
import {Letters} from "./pages/Letters/Letters.tsx";
import {Dreams} from "./pages/Dreams/Dreams.tsx";
import {Surprise} from "./pages/Surprise/Surprise.tsx";
import {LoginPage} from "./pages/Login/LoginPage.tsx";
import Layout from "./layout/Layout.tsx";
import {ProtectedRoute} from "./router/ProtectedRoute.tsx";

export const createRoutes = (toggleTheme: () => void) => [
  { path: "/login", element: <LoginPage /> },
  {
    path: "/",
    element: <Layout toggleTheme={toggleTheme} />,
    children: [
      { path: "/", element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: "/gallery", element: <ProtectedRoute><Gallery /></ProtectedRoute> },
      { path: "/letters", element: <ProtectedRoute><Letters /></ProtectedRoute> },
      { path: "/dreams", element: <ProtectedRoute><Dreams /></ProtectedRoute> },
      { path: "/surprise", element: <ProtectedRoute><Surprise /></ProtectedRoute> },
    ],
  },
];
