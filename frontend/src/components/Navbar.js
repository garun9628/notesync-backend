import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar(props) {
  let location = useLocation();
  let navigate = useNavigate();

  const { name, email } = props.info;

  const handleUserInfo = () => {
    navigate("/user-info", { state: { name: name, email: email } });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar bg-dark bg-gradient text-light fixed-top navbar-expand-lg">
        <div className="container-fluid">
          <Link
            className="navbar-brand"
            style={{ color: "rgb(180 202 204)" }}
            to="/"
          >
            Notesync
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  style={{ color: "rgb(180 202 204)" }}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  style={{ color: "rgb(180 202 204)" }}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            {!localStorage.getItem("token") ? (
              <div className="d-flex">
                <Link
                  className="btn btn-outline-success mx-1"
                  style={{ color: "rgb(180 202 204)" }}
                  to="/login"
                  role="button"
                >
                  Login
                </Link>
                <Link
                  className="btn btn-outline-success mx-1"
                  style={{ color: "rgb(180 202 204)" }}
                  to="/signup"
                  role="button"
                >
                  SignUp
                </Link>
              </div>
            ) : (
              <div>
                <i
                  className="fa-solid fa-user mx-3"
                  onClick={handleUserInfo}
                ></i>
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-secondary"
                  style={{ color: "rgb(180 202 204)" }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
