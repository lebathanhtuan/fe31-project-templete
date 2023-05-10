import { Outlet } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import * as S from "./styles";

function UserLayout() {
  return (
    <div className="wrapper">
      <Header />
      <S.MainWrapper>
        <Outlet />
      </S.MainWrapper>
      <Footer />
    </div>
  );
}

export default UserLayout;
