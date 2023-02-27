function Header() {
  return (
    <div className="header">
      <div className="header-logo">
        <h3>Menu Icon</h3>
        <a href="home.html">
          <h3>Logo</h3>
        </a>
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
      <img
        className="avatar"
        src="../images/kisspng-computer-icons-portable-network-graphics-avatar-ic-5ba3c66e306b15.0756271715374598221983.png"
        alt=""
      />
    </div>
  );
}

export default Header;
