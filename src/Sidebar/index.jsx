import * as S from "./styles";

function Sidebar(props) {
  const { isShowSidebar } = props;

  return <S.SidebarWrapper isShow={isShowSidebar}>Sidebar</S.SidebarWrapper>;
}

export default Sidebar;
