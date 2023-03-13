import styles from "./Header.module.css";
import * as S from "./styles";

function Header(props) {
  const { name, handleClick, isShowSidebar, setIsShowSidebar } = props;

  // const handleToggleSidebar = () => {
  //   setIsShowSidebar(!isShowSidebar);
  // };

  return (
    <div className="header">
      <div className="header-logo">
        <S.Button
          type="primary"
          width="100px"
          // hide
          onClick={() => setIsShowSidebar(!isShowSidebar)}
        >
          Menu
        </S.Button>
        {/* <a href="home.html">
          <S.Title>Logo</S.Title>
        </a> */}
      </div>
      <div className="nav-link">
        <div className="nav-link-item">
          <a href="list.html">
            <h4>List</h4>
          </a>
          <div className="sub-nav">
            <div className="sub-nav-item">Item 1</div>
            <div className="sub-nav-item">Item 2</div>
          </div>
        </div>
        <div className="nav-link-item">
          <a href="about.html">
            <h4>About</h4>
          </a>
        </div>
      </div>
      <div>
        <h3>{name}</h3>
        <button onClick={() => handleClick()}>Logout</button>
      </div>
    </div>
  );
}

export default Header;
