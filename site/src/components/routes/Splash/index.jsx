import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import "./index.css";

export default function Splash() {
  return (
    <div id="splash-page">
      <Navbar />
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
