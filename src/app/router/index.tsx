import {LoginPage} from "../../pages/LoginPage/ui/LoginPage.tsx";
import {Layout} from "../../widgets/Layout/ui/Layout.tsx";
import {ProtectedRoute} from "./ProtectedRoute.tsx";
import {LotteryPage} from "../../pages/LotteryPage/ui/LotteryPage.tsx";
import {LettersPage} from "../../pages/LettersPage/ui/LettersPage.tsx";
import {SurprisePage} from "../../pages/SurprizePage/ui/SurprisePage.tsx";
import {DreamsPage} from "../../pages/DreamsPage/ui/DreamsPage.tsx";
import {GalleryPage} from "../../pages/GalleryPage/ui/GalleryPage.tsx";
import {HomePage} from "../../pages/HomePage/ui/HomePage.tsx";

export const createRoutes = (toggleTheme: () => void) => [
  { path: "/login", element: <LoginPage /> },
  {
    path: "/",
    element: <Layout toggleTheme={toggleTheme} />,
    children: [
      { path: "/", element: <ProtectedRoute><HomePage /></ProtectedRoute> },
      { path: "/lottery-wheel", element: <ProtectedRoute><LotteryPage/></ProtectedRoute> },
      { path: "/gallery", element: <ProtectedRoute><GalleryPage /></ProtectedRoute> },
      { path: "/letters", element: <ProtectedRoute><LettersPage /></ProtectedRoute> },
      { path: "/dreams", element: <ProtectedRoute><DreamsPage /></ProtectedRoute> },
      { path: "/surprise", element: <ProtectedRoute><SurprisePage /></ProtectedRoute> },
    ],
  },
];
