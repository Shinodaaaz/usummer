import type {FC} from "react";
import {IconButton} from "../../../widgets/Header/ui/HeaderStyled.ts";
import {Moon, Sun} from "lucide-react";


type ThemeSwitcherProps = {
  toggleTheme?: () => void
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> =(props) => {
  const {toggleTheme} = props;

  return (
    <IconButton onClick={toggleTheme}>
      {localStorage.getItem("theme") === "dark" ? <Sun/> : <Moon/>}
    </IconButton>
  )
}
