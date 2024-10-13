import { signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./firebase";

const NavBar = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      M.toast({ html: "You have been logged out", classes: "green" });
      navigate("/login");
    } catch (error) {
      M.toast({ html: error.message, classes: "red" });
      console.error("Logout error: ", error);
    }
  };

  useEffect(() => {
    const sidenav = document.querySelectorAll(".sidenav");
    M.Sidenav.init(sidenav, {});
  }, []);

  return (
    <nav className="blue">
      <div className="nav-wrapper container">
        <Link to="/" className="brand-logo">
          TODO
        </Link>
        <a href="#!" data-target="mobile-nav" className="sidenav-trigger">
          <i className="material-icons">menu</i>
        </a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {user ? (
            <li>
              <button onClick={handleLogout} className="btn red">
                Log out
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Side Navigation for Mobile */}
      <ul id="mobile-nav" className="sidenav">
        {user ? (
          <>
            <li>
              <button onClick={handleLogout} className="btn red">
                Log out
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
