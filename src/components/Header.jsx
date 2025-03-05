import { Link, useLocation } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';

export default function Header() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <header className="bg-white py-4 px-6 flex justify-between items-center">
      <Link to="/" className="flex items-center ">
  <img src="/Images/Logo.png" alt="ClubNect Logo" className="h-12" />
  <span className="text-lg font-semibold">ClubNect</span>
</Link>
      <div className="flex items-center space-x-4">
        <Link to="/login" className="text-gray-600 hover:text-gray-900">Login</Link>
        {isLoginPage ? (
          <Link to="/" className="bg-[#1e293b] text-white px-4 py-2 rounded-md">
            Home
          </Link>
        ) : (
          <Link to="/explore" className="bg-[#1e293b] text-white px-4 py-2 rounded-md">
            Explore
          </Link>
        )}
      </div>
    </header>
  );
}