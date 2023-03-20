import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ConfigProvider } from "antd";
import { ThemeProvider } from "styled-components";

import "../App.css";
import AdminLayout from "../layouts/AdminLayout";
import UserLayout from "../layouts/UserLayout";
import LoginLayout from "../layouts/LoginLayout";

import DashboardPage from "../pages/admin/Dashboard";

import HomePage from "../pages/user/Home";
import AboutPage from "../pages/user/About";
import ProductDetailPage from "../pages/user/ProductDetail";

import LoginPage from "../pages/Login";

import { ROUTES } from "../constants/routes";

import { light, dark } from "../themes";
import * as S from "./styles";

function App() {
  const [theme, setTheme] = useState("light");

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
          </Route>
          <Route element={<UserLayout />}>
            <Route path={ROUTES.USER.HOME} element={<HomePage />} />
            <Route path={ROUTES.USER.ABOUT} element={<AboutPage />} />
            <Route
              path={ROUTES.USER.PRODUCT_DETAIL}
              element={<ProductDetailPage />}
            />
          </Route>
          <Route element={<LoginLayout />}>
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </ConfigProvider>
  );
}

export default App;
