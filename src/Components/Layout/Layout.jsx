import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "./../Footer/Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="vh-100">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
