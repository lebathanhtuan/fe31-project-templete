import { useState } from "react";
import { ThemeProvider } from "styled-components";

import "./App.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Main from "./Main";
import Footer from "./Footer";
import { light, dark } from "./themes";

function App() {
  const [isShowSidebar, setIsShowSidebar] = useState(true);
  const [theme, setTheme] = useState("light");

  const handleClick = () => {
    console.log("click");
  };
  return (
    <ThemeProvider theme={theme === "light" ? light : dark}>
      <div className="wrapper">
        <Header
          name="Tuấn"
          handleClick={handleClick}
          isShowSidebar={isShowSidebar}
          setIsShowSidebar={setIsShowSidebar}
        />
        <div className="container">
          <Sidebar isShowSidebar={isShowSidebar} />
          <Main isShowSidebar={isShowSidebar} />
        </div>
        <button onClick={() => setTheme("light")}>Light</button>
        <button onClick={() => setTheme("dark")}>Dark</button>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
