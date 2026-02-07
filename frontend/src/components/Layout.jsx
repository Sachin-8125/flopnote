import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { authService } from "../lib/auth";

export default function Layout({ children }) {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (authService.isAuthenticated()) {
      setUser(authService.getUser());
    }
  }, []);

  const handleLogout = () => {
    authService.logout();
  };

  if (!mounted) {
    return null;
  }

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="min-h-screen bg-transparent">
      {!isAuthPage && authService.isAuthenticated() && (
        <nav className="bg-gray-900 shadow-lg border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="shrink-0 flex items-center">
                  <Link to="/" className="text-xl font-bold text-blue-500">
                    FlopNote
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link
                    to="/notes"
                    className={`${
                      location.pathname === "/notes"
                        ? "border-blue-500 text-white"
                        : "border-transparent text-gray-400 hover:border-gray-600 hover:text-gray-200"
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                  >
                    Notes
                  </Link>
                  <Link
                    to="/bookmarks"
                    className={`${
                      location.pathname === "/bookmarks"
                        ? "border-blue-500 text-white"
                        : "border-transparent text-gray-400 hover:border-gray-600 hover:text-gray-200"
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                  >
                    Bookmarks
                  </Link>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-gray-300 mr-4">
                  Welcome, {user?.username}
                </span>
                <button
                  onClick={handleLogout}
                  className="btn-secondary text-sm"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}
