/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-restricted-globals */
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./index.css";
import useUser from "../../../hooks/useUser";

export default function Dashboard() {
  const deviceWidth = window.innerWidth > 0 ? window.innerWidth : screen.width;
  const [sidebarCollapsed, setSidebarCollapsed] = useState(deviceWidth <= 992);
  const { user } = useUser();

  return (
    <div
      id="dashboard-page"
      className={sidebarCollapsed ? "sidebar-collapsed" : ""}
    >
      <Sidebar
        username={user.username}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <main id="dashboard-page-content">
        <Outlet />
      </main>
    </div>
  );
}
