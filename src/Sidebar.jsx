import { useState } from "react";

function Sidebar(props) {
  const { isShowSidebar } = props;

  return (
    <div className={isShowSidebar ? "sidebar show" : "sidebar"}>Sidebar</div>
  );
}

export default Sidebar;
