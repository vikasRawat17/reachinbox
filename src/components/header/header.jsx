// components/Header.js
export default function Header() {
  return (
    <header className="h-16 w-full flex items-center justify-between px-6 bg-zinc-900 text-white shadow-sm">
      {/* Left: Section or logo */}
      <div className="text-lg font-semibold">Onebox</div>

      {/* Right: User profile / actions */}
      <div className="flex items-center gap-4">
        {/* Placeholder for profile icon or avatar */}
        <img
          src="/avatar.png" // replace with actual user image path
          alt="User Avatar"
          className="w-8 h-8 rounded-full border border-white"
        />
      </div>
    </header>
  );
}
