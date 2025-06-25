import React from "react";
import Navbar from "../frontend/inc/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../frontend/inc/Footer";

function Master() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <header>
        <Navbar />
      </header>

      <main
        className="flex-fill bg-dark text-white "
        style={{ paddingTop: "100px" }}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
export default Master;
