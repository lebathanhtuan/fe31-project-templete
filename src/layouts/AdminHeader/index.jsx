import { Link, useNavigate } from "react-router-dom";

import * as S from "./styles";

function AdminHeader(props) {
  const { name, isShowSidebar, setIsShowSidebar } = props;

  const navigate = useNavigate();

  // const handleToggleSidebar = () => {
  //   setIsShowSidebar(!isShowSidebar);
  // };

  const handleLogout = () => {
    // window.location.href = "/login";
    navigate("/login");
  };

  return (
    <div className="header">
      <div className="header-logo">
        <S.Button
          type="primary"
          width="100px"
          onClick={() => setIsShowSidebar(!isShowSidebar)}
        >
          Menu
        </S.Button>
      </div>
      <div>
        <h3>{name}</h3>
        <button onClick={() => handleLogout()}>Logout</button>
      </div>
    </div>
  );
}

export default AdminHeader;
