import { NavLink } from "react-router-dom";
import { Home, Users, BarChart2, Inbox, Settings, LogOut } from "lucide-react";
import logo from "../../assets/header.png";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/login/Login";

export default function Sidebar() {
  const { user, isAuthenticated } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const name = user?.user?.firstName || "";

  const handleLogout = () => {
    dispatch(logout());

    window.location.href = "/login";
  };

  const getInitials = (name) => {
    if (!name) return "?";

    const words = name.split(" ");
    if (words.length === 1) {
      return name.charAt(0).toUpperCase();
    }

    return (
      words[0].charAt(0) + words[words.length - 1].charAt(0)
    ).toUpperCase();
  };

  return (
    <aside className="h-screen w-16 bg-white dark:bg-zinc-900 flex border border-[#343A40] flex-col items-center py-4 shadow-md relative">
      <div className="mb-6">
        <img src={logo} alt="Logo" className="w-6 h-6" />
      </div>

      <nav className="flex flex-col gap-6">
        <NavIcon to="/inbox" icon={<Home />} label="Inbox" />
        <NavIcon to="/contacts" icon={<Users />} label="Contacts" />
        <NavIcon to="/analytics" icon={<BarChart2 />} label="Analytics" />
        <NavIcon to="/settings" icon={<Settings />} label="Settings" />
        <NavIcon to="/inbox" icon={<Inbox />} label="Inbox" />

        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="p-2 mt-24 rounded-lg transition-colors text-zinc-600 dark:text-zinc-300 hover:bg-red-100 dark:hover:bg-red-900 hover:text-red-600 dark:hover:text-red-400"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        )}
      </nav>

      <div
        className="absolute bottom-4 w-8 h-8 mb-4 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-medium shadow-md cursor-pointer hover:bg-blue-600 transition-colors"
        title={name || "Profile"}
      >
        {getInitials(name)}
      </div>
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
