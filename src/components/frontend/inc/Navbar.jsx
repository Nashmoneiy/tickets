import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const logoutSubmit = () => {};
  const token = localStorage.getItem("auth_token");

  const authButtons = token ? (
    <ul className="navbar-nav text-center gap-lg-4 gap-2">
      <li className="nav-item">
        <Link className="nav-link" to="/wishlist">
          Wishlist
        </Link>
      </li>
      <li className="nav-item">
        <button className="logout-btn nav-link" onClick={logoutSubmit}>
          Logout
        </button>
      </li>
    </ul>
  ) : (
    <ul className="navbar-nav text-center gap-lg-4 gap-2">
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/register">
          Register
        </Link>
      </li>
    </ul>
  );

  return (
    <div style={{ overflowX: "hidden" }}>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark fixed-top py-4 w-100">
        <div className="container-fluid">
          <Link
            to="#"
            className="navbar-brand m-0 p-0 d-flex align-items-center gap-3"
            style={{
              fontWeight: "bold",
              lineHeight: "1.2",
              textDecoration: "none",
              whiteSpace: "nowrap",
              minWidth: 0,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: "45px",
                height: "45px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.6rem",
                color: "#6a0dad",
              }}
            >
              <i className="bi bi-lightning-fill"></i>
            </div>

            <div className="d-flex flex-column align-items-start text-truncate">
              <div>
                <span
                  style={{
                    fontSize: "2rem",
                    background: "linear-gradient(90deg, #6a0dad, #0000ff)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontWeight: "bold",
                    fontFamily: "'Orbitron', sans-serif",
                  }}
                >
                  Eucia
                </span>
                <span
                  style={{
                    marginLeft: "5px",
                    fontSize: "1.4rem",
                    fontWeight: "600",
                    color: "#6a0dad",
                    fontFamily: "'Orbitron', sans-serif",
                  }}
                >
                  Bookings
                </span>
              </div>

              <div
                className="mt-1"
                style={{
                  fontSize: "0.8rem",
                  fontWeight: "400",
                  whiteSpace: "nowrap",
                  background: "linear-gradient(90deg, #d4af37, #6c757d)", // gold to grey
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Book your tickets
              </div>
            </div>
          </Link>

          <button
            className="navbar-toggler me-2"
            style={{ border: "none", boxShadow: "none" }}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse justify-content-lg-end justify-content-center me-2 gap-2"
            id="navbarNav"
          >
            {authButtons}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
