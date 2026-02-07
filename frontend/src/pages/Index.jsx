import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../lib/auth';

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    if (authService.isAuthenticated()) {
      navigate('/notes', { replace: true });
    }
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <h1 className="text-5xl font-bold text-white mb-4">
        Notes & Bookmarks Manager
      </h1>
      <p className="text-xl text-gray-300 mb-8">
        Organize your thoughts and favorite links in one place
      </p>
      <div className="space-x-4">
        <Link to="/login" className="btn-primary inline-block">
          Login
        </Link>
        <Link to="/register" className="btn-secondary inline-block">
          Register
        </Link>
      </div>
    </div>
  );
}