import header from "../../assets/header.png";
import { useDispatch } from "react-redux";

export default function LandingPage() {
  const handleGoogleLogin = () => {
    window.location.href =
      "https://hiring.reachinbox.xyz/api/v1/auth/google-login?redirect_to=http://localhost:5173/auth/callback";
  };
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      
      <header className="py-6 text-center border-b border-gray-800">
        <h1 className="text-xl font-bold tracking-wide">
          <span className="bg-white text-black px-2 py-1 rounded">
            REACHINBOX
          </span>
        </h1>
      </header>

      
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="bg-[#1a1a1a] rounded-xl shadow-xl p-8 w-full max-w-md text-center space-y-6">
          <h2 className="text-2xl font-semibold">Create a new account</h2>

          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-2 border border-gray-600 py-2 px-4 w-full rounded-md hover:bg-gray-800 transition"
          >
            <img src={header} alt="header" className="h-5 w-5" />
            <span>Sign Up with Google</span>
          </button>

          <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 w-full rounded-md font-medium transition">
            Create an Account
          </button>

          <p className="text-sm text-gray-400">
            Already have an account?{" "}
            <a href="/login" className="text-blue-400 hover:underline">
              Sign In
            </a>
          </p>
        </div>
      </main>

     
      <footer className="py-4 text-center text-xs text-gray-500 border-t border-gray-800">
        © {new Date().getFullYear()} Reachinbox. All rights reserved.
      </footer>
    </div>
  );
}
