import { useLocation } from "react-router-dom";

import { ROUTES } from "../../constants/routes";

import * as S from "./styles";

const SIDEBAR_ITEMS = [
  {
    label: "Dashboard",
    path: ROUTES.ADMIN.DASHBOARD,
  },
  {
    label: "To Do List",
    path: ROUTES.ADMIN.TODO_LIST,
  },
];

function Sidebar(props) {
  const { isShowSidebar } = props;

  const { pathname } = useLocation();

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
