import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Dropdown, Button, Space, Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

import { ROUTES } from "../../constants/routes";
import { logoutAction } from "../../redux/actions";

function AdminHeader() {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartList } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        {userInfo.data.id ? (
          <Space size={24}>
            <Link to={ROUTES.USER.CART_LIST}>
              <Badge count={cartList.length} size="small">
                <ShoppingCartOutlined
                  style={{ color: "black", fontSize: 20 }}
                />
              </Badge>
            </Link>
            <Dropdown
              menu={{
                items: [
                  {
                    key: "dashdoard",
                    label: <Link to={ROUTES.ADMIN.DASHBOARD}>Dashboard</Link>,
                    style: {
                      display:
                        userInfo.data.role === "admin" ? "block" : "none",
                    },
                  },
                  {
                    key: "logout",
                    label: "Logout",
                    onClick: () => dispatch(logoutAction()),
                  },
                ],
              }}
            >
              <h3>{userInfo.data.fullName}</h3>
            </Dropdown>
          </Space>
        ) : (
          <Button onClick={() => navigate(ROUTES.LOGIN)}>Login</Button>
        )}
      </div>
    </div>
  );
}

export default AdminHeader;
