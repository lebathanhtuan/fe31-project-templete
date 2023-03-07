import { useState } from "react";
import "./App.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Main from "./Main";
import Footer from "./Footer";

function App() {
  const [isShowSidebar, setIsShowSidebar] = useState(true);

  const handleClick = () => {
    console.log("click");
  };
  return (
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
      <Footer />
    </div>
  );
}

export default App;
