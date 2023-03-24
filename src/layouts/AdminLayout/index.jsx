import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

import AdminHeader from "../AdminHeader";
import Sidebar from "../Sidebar";

import { ROUTES } from "../../constants/routes";

import * as S from "./styles";

function AdminLayout() {
  const [isShowSidebar, setIsShowSidebar] = useState(true);

  const role = "admin";

  if (role !== "admin") return <Navigate to={ROUTES.USER.HOME} />;
  return (
    <div className="wrapper">
      <AdminHeader
        name="Tuấn"
        isShowSidebar={isShowSidebar}
        setIsShowSidebar={setIsShowSidebar}
      />
      <div className="container">
        <Sidebar isShowSidebar={isShowSidebar} />
        <S.MainWrapper isFull={!isShowSidebar}>
          <Outlet />
        </S.MainWrapper>
      </div>
    </div>
  );
}

export default AdminLayout;
