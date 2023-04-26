import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ConfigProvider } from "antd";
import { ThemeProvider } from "styled-components";
import jwtDecode from "jwt-decode";
import "moment/locale/vi";

import "../App.css";
import AdminLayout from "../layouts/AdminLayout";
import UserLayout from "../layouts/UserLayout";

import DashboardPage from "../pages/admin/Dashboard";
import TodoListPage from "../pages/admin/TodoList";
import TodoDetailPage from "../pages/admin/TodoDetail";

import HomePage from "../pages/user/Home";
import ProductListPage from "../pages/user/ProductList";
import AboutPage from "../pages/user/About";
import ProductDetailPage from "../pages/user/ProductDetail";
import CartPage from "../pages/user/Cart";

import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";

import { ROUTES } from "../constants/routes";
import { getUserInfoAction } from "../redux/actions";

import { light, dark } from "../themes";

function App() {
  const dispatch = useDispatch();

  const { theme } = useSelector((state) => state.common);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const tokenData = jwtDecode(accessToken);
      dispatch(getUserInfoAction({ id: tokenData.sub }));
    }
  }, []);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#fa541c",
        },
      }}
    >
      <ThemeProvider theme={theme === "light" ? light : dark}>
        <Routes>
          <Route element={<AdminLayout />}>
            <Route path={ROUTES.ADMIN.DASHBOARD} element={<DashboardPage />} />
            <Route path={ROUTES.ADMIN.TODO_LIST} element={<TodoListPage />} />
            <Route
              path={ROUTES.ADMIN.TODO_DETAIL}
              element={<TodoDetailPage />}
            />
          </Route>
          <Route element={<UserLayout />}>
            <Route path={ROUTES.USER.HOME} element={<HomePage />} />
            <Route path={ROUTES.USER.ABOUT} element={<AboutPage />} />
            <Route
              path={ROUTES.USER.PRODUCT_LIST}
              element={<ProductListPage />}
            />
            <Route
              path={ROUTES.USER.PRODUCT_DETAIL}
              element={<ProductDetailPage />}
            />
            <Route path={ROUTES.USER.CART_LIST} element={<CartPage />} />
          </Route>
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </ThemeProvider>
    </ConfigProvider>
  );
}

export default App;
