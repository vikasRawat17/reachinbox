import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { useSelector } from "react-redux";

export default function Header() {
  const [isDark, setIsDark] = useState(false);

  const { user } = useSelector((state) => state.login);

  const name = user.user.firstName;

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark =
      savedTheme === "dark" ||
      (savedTheme === null &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    setIsDark(prefersDark);
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
    setIsDark(newTheme === "dark");
  };

  return (
    <header className="h-12 w-full flex items-center justify-between px-6 border-b border-zinc-700 bg-white dark:bg-black text-black dark:text-white shadow-sm relative">
      <div className="absolute top-0 left-0 w-full h-[2px]" />

      <div className="text-sm font-medium tracking-wide text-zinc-800 dark:text-white">
        Onebox
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="w-6 h-6 flex items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          aria-label="Toggle Theme"
        >
          {isDark ? (
            <Sun className="w-4 h-4 text-yellow-400" />
          ) : (
            <Moon className="w-4 h-4 text-zinc-600" />
          )}
        </button>

        <div className="text-sm text-zinc-700 dark:text-zinc-300 flex items-center gap-1 cursor-pointer">
          {`${name}'s Workspace`}
          <svg
            className="w-3 h-3 text-zinc-500 dark:text-zinc-400"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </header>
  );
}
