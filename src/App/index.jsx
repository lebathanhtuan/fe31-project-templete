import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ConfigProvider } from "antd";
import { ThemeProvider } from "styled-components";

import "../App.css";
import Header from "../layouts/Header";
import Sidebar from "../layouts/Sidebar";
import Footer from "../layouts/Footer";

import HomePage from "../pages/Home";
import AboutPage from "../pages/About";
import ProductDetailPage from "../pages/ProductDetail";
import LoginPage from "../pages/Login";

import { light, dark } from "../themes";
import * as S from "./styles";

function App() {
  const [isShowSidebar, setIsShowSidebar] = useState(true);
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
        <div className="wrapper">
          <Header
            name="Tuấn"
            isShowSidebar={isShowSidebar}
            setIsShowSidebar={setIsShowSidebar}
          />
          <div className="container">
            <Sidebar isShowSidebar={isShowSidebar} />
            <S.MainWrapper isFull={!isShowSidebar}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/login" element={<LoginPage />} />
              </Routes>
            </S.MainWrapper>
          </div>
          {/* <button onClick={() => setTheme("light")}>Light</button>
          <button onClick={() => setTheme("dark")}>Dark</button> */}
          <Footer />
        </div>
      </ThemeProvider>
    </ConfigProvider>
  );
}

export default App;
