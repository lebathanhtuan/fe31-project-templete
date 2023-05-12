import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ConfigProvider } from "antd";
import { ThemeProvider } from "styled-components";
import jwtDecode from "jwt-decode";
import "moment/locale/vi";

import "../App.css";
import AdminLayout from "../layouts/AdminLayout";
import UserLayout from "../layouts/UserLayout";

import DashboardPage from "../pages/admin/Dashboard";
import ProductManagementPage from "../pages/admin/ProductManagement";
import CreateProductPage from "../pages/admin/CreateProduct";

import HomePage from "../pages/user/Home";
import ProductListPage from "../pages/user/ProductList";
import AboutPage from "../pages/user/About";
import ProductDetailPage from "../pages/user/ProductDetail";
import CartPage from "../pages/user/Cart";
import CheckoutPage from "../pages/user/Checkout";
import ProfilePage from "../pages/user/Profile";

import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";

import { ROUTES } from "../constants/routes";
import { getUserInfoAction } from "../redux/actions";

import { light, dark } from "../themes";

function App() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const { theme } = useSelector((state) => state.common);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const tokenData = jwtDecode(accessToken);
      dispatch(getUserInfoAction({ id: tokenData.sub }));
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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
            <Route
              path={ROUTES.ADMIN.PRODUCT_MANAGEMENT}
              element={<ProductManagementPage />}
            />
            <Route
              path={ROUTES.ADMIN.CREATE_PRODUCT}
              element={<CreateProductPage />}
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
            <Route path={ROUTES.USER.CHECKOUT} element={<CheckoutPage />} />
            <Route path={ROUTES.USER.PROFILE} element={<ProfilePage />} />
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
