import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import AddFunds from "./components/AddFunds";
import WithdrawFunds from "./components/WithdrawFunds";
import Profile from "./components/Profile";

//AuthProvider
import { AuthProvider } from "./AuthContext";

//ProtectedRoutes
import ProtectedRoute from "./ProtectedRoute";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        {/* Public Routes (No auth required) */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes (User must be logged in) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/*" element={<Home />} />
          <Route path="/add-funds" element={<AddFunds />} />
          <Route path="/withdraw-funds" element={<WithdrawFunds />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider>
  // {/* </React.StrictMode> */}
);