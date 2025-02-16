import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaUser, FaSignOutAlt, FaHome, FaClipboardList, FaClipboardCheck,FaCalendarCheck, FaEnvelope,} from "react-icons/fa";
import style from "./SideNavbar.module.css";

const DashNavbar = () => {
  const isAuthenticated = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const Userrole = user?.Userrole;
  const UserFName = user?.firstname;
  const UserLName = user?.lastname;
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const sidebarWidth = isOpen ? "200px" : "80px";
    document.documentElement.style.setProperty("--sidebar-width", sidebarWidth);
  }, [isOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className={`${style.sidebar} ${isOpen ? style.open : ""}`}>
      <div className={style.bothBran}>
        <div className={style.logo}>
        <Link to="/dashboard"><h3>{isOpen ? "MyTask" : "MT"}</h3></Link>
        </div>

        <div className={style.toggleBtn} onClick={() => setIsOpen(!isOpen)}>
          <FaBars />
        </div>
      </div>

      <ul className={`${style.navList} ${isOpen ? style.showMenu : ""}`}>
        <li>
          <Link to="/dashboard" className={style.navLink}>
            <FaHome /> {isOpen && "Dashboard"}
          </Link>
        </li>
        <li>
          <Link to="/createtask" className={style.navLink}>
            <FaClipboardCheck /> {isOpen && "Create Task"}
          </Link>
        </li>
        <li>
          <Link to="/adminasigntask" className={style.navLink}>
            <FaCalendarCheck /> {isOpen && "Admin Assign Task"}
          </Link>
        </li>
        <li>
          <Link to="/allusertask" className={style.navLink}>
            <FaClipboardList /> {isOpen && "User Task"}
          </Link>
        </li>
        <li>
          <Link to="/changepassword" className={style.navLink}>
            <FaEnvelope /> {isOpen && "ChangePassword"}
          </Link>
        </li>
      </ul>

      <div className={`${style.userSection} ${isOpen ? style.showMenu : ""}`}>
        {isAuthenticated ? (
          <>
            <p className={style.userInfo}>
              <FaUser /> {isOpen && `Welcome, ${Userrole} ${UserFName} ${UserLName}`}
            </p>
            <button className={style.logoutBtn} onClick={handleLogout}>
              <FaSignOutAlt /> {isOpen && "Logout"}
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className={style.authLink}>
              <button className={style.authBtn}>Login</button>
            </Link>
            <Link to="/registration" className={style.authLink}>
              <button className={style.authBtn}>Sign In</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default DashNavbar;
