import { Button } from "antd";
import { useDispatch } from "react-redux";

import { changeThemeAction } from "../../redux/actions";

import * as S from "./styles";

function Footer() {
  const dispatch = useDispatch();

  const handleChangeTheme = (theme) => {
    dispatch(changeThemeAction(theme));
  };

  return (
    <S.FooterWrapper>
      <h2>Footer</h2>
      <div>
        <Button onClick={() => handleChangeTheme("light")}>Light</Button>
        <Button onClick={() => handleChangeTheme("dark")}>Dark</Button>
      </div>
    </S.FooterWrapper>
  );
}

export default Footer;
