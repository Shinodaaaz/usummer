import {Gallery} from "./pages/Gallery/Gallery.tsx";
import {Home} from "./pages/Home/Home.tsx";
import {Letters} from "./pages/Letters/Letters.tsx";
import {Dreams} from "./pages/Dreams/Dreams.tsx";
import {Surprise} from "./pages/Surprise/Surprise.tsx";
import Layout from "./layout/Layout.tsx";

export const createRoutes = (toggleTheme: () => void) => [
  {
    path: "/",
    element: <Layout toggleTheme={toggleTheme} />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/gallery", element: <Gallery /> },
      { path: "/letters", element: <Letters /> },
      { path: "/dreams", element: <Dreams /> },
      { path: "/surprise", element: <Surprise /> },
    ],
  },
];
