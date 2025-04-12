import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import AddFunds from "./components/AddFunds";
import WithdrawFunds from "./components/WithdrawFunds";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/add-funds" element={<AddFunds />} />
        <Route path="/withdraw-funds" element={<WithdrawFunds />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);