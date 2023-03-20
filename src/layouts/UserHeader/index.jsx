import { Link, useNavigate } from "react-router-dom";

import { ROUTES } from "../../constants/routes";

function AdminHeader() {
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
      <h3>Logo</h3>
      <div className="nav-link">
        <div className="nav-link-item">
          <Link to={ROUTES.USER.HOME}>
            <h4>Home</h4>
          </Link>
        </div>
        <div className="nav-link-item">
          <Link to={ROUTES.USER.ABOUT}>
            <h4>About</h4>
          </Link>
        </div>
      </div>
      <div>
        <button onClick={() => navigate(ROUTES.ADMIN.DASHBOARD)}>
          Dashboard
        </button>
        <button onClick={() => handleLogout()}>Logout</button>
      </div>
    </div>
  );
}

export default AdminHeader;
