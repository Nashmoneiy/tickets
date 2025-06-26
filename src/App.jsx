import React from "react";
import { useState } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/frontend/Login";
import Register from "./components/frontend/Register";
import Master from "./components/layout/Master";
import Home from "./components/frontend/Home";
import ProtectedRoute from "./ProtectedRoute";
import Wishlist from "./components/frontend/Wishlist";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Master />}>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/Register" element={<Register />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/wishlist"
              element={
                <ProtectedRoute>
                  <Wishlist />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
