// AppLayout.js
import { Outlet } from "react-router-dom";
import Header from "./components/header/header";
import Sidebar from "./components/navbar/Navbar";

export default function AppLayout() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 bg-gray-50 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
