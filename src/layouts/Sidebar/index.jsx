import { useLocation } from "react-router-dom";

import { ROUTES } from "../../constants/routes";

import * as S from "./styles";

const SIDEBAR_ITEMS = [
  {
    label: "Home",
    path: ROUTES.USER.HOME,
  },
  {
    label: "About",
    path: ROUTES.USER.ABOUT,
  },
  {
    label: "Login",
    path: ROUTES.LOGIN,
  },
  {
    label: "Register",
    path: ROUTES.REGISTER,
  },
];

function Sidebar(props) {
  const { isShowSidebar } = props;

  const { pathname } = useLocation();
  console.log("🚀 ~ file: index.jsx:8 ~ Sidebar ~ pathname:", pathname);

  const renderSidebarItems = () => {
    return SIDEBAR_ITEMS.map((item, index) => {
      return (
        <S.SidebarItem
          key={index}
          to={item.path}
          active={pathname === item.path}
        >
          {item.label}
        </S.SidebarItem>
      );
    });
  };

  return (
    <S.SidebarWrapper isShow={isShowSidebar}>
      {renderSidebarItems()}
    </S.SidebarWrapper>
  );
}

export default Sidebar;
