import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export const MainLayout = () => {
  return (
    <div>
      <h1>HI</h1>
      <Outlet />
    </div>
  );
};
