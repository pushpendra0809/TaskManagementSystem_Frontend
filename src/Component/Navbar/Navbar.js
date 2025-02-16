import React, { useState } from 'react';
import style from "./Navbar.module.css";
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isAuthenticated = localStorage.getItem('token'); 
  const user = JSON.parse(localStorage.getItem("user")); 
  const Userrole = user?.Userrole;
  const UserFName = user?.firstname; 
  const UserLName = user?.lastname; 
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    localStorage.removeItem("user"); 
    navigate("/login"); 
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={style.navbar}>
      <div className={style.navContainer}>
        <div className={style.BothBrand}>
        <div className={style.brand}>
          <Link className={style.allCom} to="/home" onClick={() => setMobileMenuOpen(false)}>
            <h3>MyTask</h3>
          </Link>
        </div>
        <div className={style.mobileIcon} onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <span>&#x2715;</span> : <span>&#9776;</span>}
        </div>
        </div>
        <ul className={`${style.navMenu} ${isMobileMenuOpen ? style.active : ''}`}>
          {Userrole === "User" && (
            <>
              <li className={style.navItem}>
                <Link className={style.navLink} to="/home" >
                  Home
                </Link>
              </li>
              <li className={style.navItem}>
                <Link className={style.navLink} to="/createtask" >
                  Createtask
                </Link>
              </li>
              <li className={style.navItem}>
                <Link className={style.navLink} to="/" >
                  Contact Us
                </Link>
              </li>
            </>
          )}
          {Userrole === "Admin" && (
            <>
              <li className={style.navItem}>
                <Link className={style.navLink} to="/dashboard" >
                  Dashboard
                </Link>
              </li>
              <li className={style.navItem}>
                <Link className={style.navLink} to="/createtask" >
                  Createtask
                </Link>
              </li>
              <li className={style.navItem}>
                <Link className={style.navLink} to="/adminasigntask" >
                  Admin Assign Task
                </Link>
              </li>
              <li className={style.navItem}>
                <Link className={style.navLink} to="/allusertask" >
                  User Task
                </Link>
              </li>
            </>
          )}
          {isMobileMenuOpen && (
            <li className={style.navAuthMobile}>
              {isAuthenticated ? (
                <>
                  <p className={style.welcome}>
                    Welcome' {Userrole === "Admin" ? `${Userrole} ${UserFName} ${UserLName}` : `${UserFName} ${UserLName}`}
                  </p>
                  <button
                    className={style.buttonLogout}
                    onClick={() => {
                      handleLogout();
                      toggleMobileMenu();
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link className={style.linkButton} to="/login" onClick={toggleMobileMenu}>
                    <button className={style.button}>Login</button>
                  </Link>
                  <Link className={style.linkButton} to="/registration" onClick={toggleMobileMenu}>
                    <button className={style.button}>Sign Up</button>
                  </Link>
                </>
              )}
            </li>
          )}
        </ul>
        {!isMobileMenuOpen && (
          <div className={style.navAuth}>
            {isAuthenticated ? (
              <>
                <p className={style.welcome}>
                  Welcome {Userrole === "Admin" ? `${Userrole} ${UserFName} ${UserLName}` : `${UserFName} ${UserLName}`}
                </p>
                <button className={style.buttonLogout} onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link className={style.linkButton} to="/login">
                  <button className={style.button}>Login</button>
                </Link>
                <Link className={style.linkButton} to="/registration">
                  <button className={style.button}>Sign Up</button>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
