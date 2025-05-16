import { NavLink } from "react-router-dom";
import { Home, Users, BarChart2, Inbox, Settings } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="h-screen w-16 bg-white dark:bg-zinc-900 flex border border-[#343A40] flex-col items-center py-4 shadow-md">
      <div className="mb-6">
        <img src="/logo.png" alt="Logo" className="w-6 h-6" />
      </div>

      <nav className="flex flex-col gap-6">
        <NavIcon to="/inbox" icon={<Home />} label="Inbox" />
        <NavIcon to="/contacts" icon={<Users />} label="Contacts" />
        <NavIcon to="/analytics" icon={<BarChart2 />} label="Analytics" />
        <NavIcon to="/settings" icon={<Settings />} label="Settings" />
        <NavIcon to="/inbox" icon={<Inbox />} label="Inbox" />
      </nav>
    </aside>
  );
}

function NavIcon({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `p-2 rounded-lg transition-colors ${
          isActive
            ? "bg-blue-500 text-white"
            : "text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
        }`
      }
      title={label}
    >
      {icon}
    </NavLink>
  );
}
