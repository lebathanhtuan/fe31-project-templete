import { Link, useNavigate } from "react-router-dom";

import * as S from "./styles";

function Header(props) {
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
          // hide
          onClick={() => setIsShowSidebar(!isShowSidebar)}
        >
          Menu
        </S.Button>
        {/* <a href="home.html">
          <S.Title>Logo</S.Title>
        </a> */}
      </div>
      <div className="nav-link">
        <div className="nav-link-item">
          <Link to="/">
            <h4>Home</h4>
          </Link>
        </div>
        <div className="nav-link-item">
          <Link to="/about">
            <h4>About</h4>
          </Link>
        </div>
      </div>
      <div>
        <h3>{name}</h3>
        <button onClick={() => handleLogout()}>Logout</button>
      </div>
    </div>
  );
}

export default Header;
