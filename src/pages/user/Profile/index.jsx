import { Link, useNavigate } from "react-router-dom";
import { Button, Tabs } from "antd";

import OrderHistories from "./components/OrderHistories";
import { ROUTES } from "../../../constants/routes";

import * as S from "./styles";

function Profile() {
  const navigate = useNavigate();

  return (
    <S.ProfileWrapper>
      <Tabs
        tabPosition="left"
        items={[
          {
            label: "Thông tin cá nhân",
            key: 1,
            children: null,
          },
          {
            label: "Lịch sử mua hàng",
            key: 2,
            children: <OrderHistories />,
          },
          {
            label: "Sản phẩm yêu thích",
            key: 3,
            children: null,
          },
          {
            label: "Đổi mật khẩu",
            key: 4,
            children: null,
          },
        ]}
      />
    </S.ProfileWrapper>
  );
}

export default Profile;
