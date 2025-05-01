import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiCompass, FiLogIn, FiInfo } from 'react-icons/fi';

export default function Header() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 py-4 px-6 border-b border-neutral-200 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-3 group">
          <img 
            src="/Images/Logo.png" 
            alt="ClubNect Logo" 
            className="h-12 transform group-hover:rotate-6 transition-all duration-300" 
          />
          <span className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 text-transparent bg-clip-text
            group-hover:from-primary-600 group-hover:to-secondary-600 transition-all duration-300">
            ClubNect
          </span>
        </Link>

        <nav className="flex items-center space-x-4">
          <Link 
            to="/" 
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300
              ${location.pathname === '/' 
                ? 'bg-gradient-to-r from-primary-400 to-primary-500 text-white shadow-md shadow-primary-200' 
                : 'text-neutral-600 hover:text-primary-600 hover:bg-primary-50'}`}
          >
            <FiHome className="text-lg" />
            <span>Home</span>
          </Link>
          
          <Link 
            to="/explore" 
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300
              ${location.pathname === '/explore' 
                ? 'bg-gradient-to-r from-secondary-400 to-secondary-500 text-white shadow-md shadow-secondary-200' 
                : 'text-neutral-600 hover:text-secondary-600 hover:bg-secondary-50'}`}
          >
            <FiCompass className="text-lg" />
            <span>Explore</span>
          </Link>
          
          <Link 
            to="/about" 
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300
              ${location.pathname === '/about' 
                ? 'bg-gradient-to-r from-primary-400 to-secondary-500 text-white shadow-md shadow-primary-200' 
                : 'text-neutral-600 hover:text-primary-600 hover:bg-primary-50'}`}
          >
            <FiInfo className="text-lg" />
            <span>About</span>
          </Link>
          
          <Link 
            to="/login" 
            className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-primary-400 to-secondary-500 text-white rounded-full
              hover:from-primary-500 hover:to-secondary-600 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-primary-200/30
              hover:-translate-y-1 transform"
          >
            <FiLogIn className="text-lg" />
            <span>Login</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}