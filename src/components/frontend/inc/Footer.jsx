import React from "react";

const Footer = () => {
  return (
    <div className="">
      <footer
        className="text-white py-4"
        style={{
          background: "linear-gradient(to right, #1c1c1e, #2a2a2d)", // deep dark greys
          borderTop: "1px solid rgba(255, 255, 255, 0.1)", // soft light border
          fontFamily: "'Orbitron', sans-serif",
          boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.3)", // subtle shadow
        }}
      >
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
          <p
            className="mb-2 mb-md-0"
            style={{
              fontSize: "0.85rem",
              color: "#ccc",
              textShadow: "0 0 4px rgba(255, 255, 255, 0.1)",
            }}
          >
            © 2025 Eucia Ticket Bookings
          </p>
          <div>
            <a href="#" className="text-white me-3 fs-5">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="#" className="text-white me-3 fs-5">
              <i className="bi bi-twitter"></i>
            </a>
            <a href="#" className="text-white me-3 fs-5">
              <i className="bi bi-instagram"></i>
            </a>
            <a href="#" className="text-white fs-5">
              <i className="bi bi-linkedin"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
