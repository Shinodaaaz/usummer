import {Outlet} from "react-router-dom";

import {
  Main,
  Wrapper,
} from "./LayoutStyled.ts";
import {Header} from "../../Header/ui/Header.tsx";
import type {FC} from "react";
import {Footer} from "../../Footer/ui/Footer.tsx";

type LayoutProps = {
  toggleTheme?: () => void;
};

export const Layout: FC<LayoutProps> = (props) => {

  const {toggleTheme} = props;

  return (
    <Wrapper>
      <Header toggleTheme={toggleTheme}/>
      <Main>
        <Outlet/>
      </Main>
      <Footer/>
    </Wrapper>
  );
}
