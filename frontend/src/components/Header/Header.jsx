import Logo from "../../assets/img/main-logo.png";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../features/auth/authApiSlice";
import UseAuthUser from "../../hooks/UseAuthUser";
import { Link } from "react-router-dom";

const Header = () => {
  const { user } = UseAuthUser();
  const dispatch = useDispatch();
  const handleUserLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
  };

  const handleMobileMenu = () => {
    const main_wrapper = document.querySelector(".main-wrapper");

    if (main_wrapper.classList.contains("slide-nav")) {
      main_wrapper.classList.remove("slide-nav");
    } else {
      main_wrapper.classList.add("slide-nav");
    }
  };
  return (
    <>
      <div className="header">
        <div className="header-left">
          <Link to={"/"} className="logo">
            <img src={Logo} alt="Logo" style={{ width: 150}} />
          </Link>
          <Link to={"/"} className="logo logo-small">
            <img src={Logo} alt="Logo" style={{ width: 80 }} />
          </Link>
        </div>

        <a onClick={handleMobileMenu} className="mobile_btn" id="mobile_btn">
          <i className="fa fa-bars"></i>
        </a>

        <ul className="nav user-menu">
          <li className="nav-item dropdown noti-dropdown">
            <a
              href="#"
              className="dropdown-toggle nav-link"
              data-toggle="dropdown">
              <i className="fe fe-bell"></i>{" "}
              <span className="badge badge-pill">1</span>
            </a>
            <div className="dropdown-menu notifications">
              <div className="topnav-dropdown-header">
                <span className="notification-title">Notifications</span>
                <a href="javascript:void(0)" className="clear-noti">
                  {" "}
                  Clear All{" "}
                </a>
              </div>
              <div className="topnav-dropdown-footer">
                <a href="#">View all Notifications</a>
              </div>
            </div>
          </li>

          <li className="nav-item dropdown has-arrow">
            <a
              href="#"
              className="dropdown-toggle nav-link"
              data-toggle="dropdown">
              <span className="user-img">
                <img
                  className="rounded-circle"
                  src={
                    user?.photo
                      ? user?.photo
                      : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png"
                  }
                  width="31"
                  alt={user?.name}
                />
              </span>
            </a>
            <div className="dropdown-menu">
              <div className="user-header">
                <div className="avatar avatar-sm">
                  <img
                    src={
                      user?.photo
                        ? user.photo
                        : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png"
                    }
                    alt={user?.name}
                    className="avatar-img rounded-circle"
                  />
                </div>
                <div className="user-text">
                  <h6>{user?.name}</h6>
                  <p className="text-muted mb-0">{user?.role?.name}</p>
                </div>
              </div>
              <Link className="dropdown-item" to={"/profile"}>
                My Profile
              </Link>
              <a className="dropdown-item" href="#" onClick={handleUserLogout}>
                Logout
              </a>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
