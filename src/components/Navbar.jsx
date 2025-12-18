import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, currentUser, logOut, logout } = useAuth();
  // Support both Firebase (user) and backend (currentUser)
  const authenticatedUser = user || currentUser;
  // Support both logOut and logout
  const logoutHandler = logOut || logout;
  const { getTotalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutHandler();
      navigate('/');
      toast.success('Logout successful');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed');
    }
  };

  const cartItemCount = getTotalItems();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 shadow-xl sticky top-0 z-50 backdrop-blur-sm border-b-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-white/20 p-2 rounded-lg group-hover:bg-white/30 transition-all">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              PureTaste<span className="text-primary-200">BD</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActive('/') 
                  ? 'bg-white/20 text-white shadow-lg' 
                  : 'text-white/90 hover:bg-white/10 hover:text-white'
              }`}
            >
              Home
            </Link>
                <Link 
                  to="/products" 
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isActive('/products') 
                      ? 'bg-white/20 text-white shadow-lg' 
                      : 'text-white/90 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  Products
                </Link>
                {authenticatedUser && (
                  <Link 
                    to="/my-orders" 
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      isActive('/my-orders') || isActive('/dashboard')
                        ? 'bg-white/20 text-white shadow-lg' 
                        : 'text-white/90 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    My Orders
                  </Link>
                )}
                <Link 
                  to="/cart" 
                  className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isActive('/cart') 
                      ? 'bg-white/20 text-white shadow-lg' 
                      : 'text-white/90 hover:bg-white/10 hover:text-white'
                  }`}
                >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Cart
              </span>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-pulse shadow-lg">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {authenticatedUser ? (
              <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-white/20">
                <div className="flex items-center space-x-2 bg-white/10 px-3 py-2 rounded-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="text-white/90 text-sm font-medium max-w-[120px] truncate">
                    {authenticatedUser.displayName || authenticatedUser.email || authenticatedUser.user?.email}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-white/20 hover:bg-white/30 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 text-sm border border-white/30 hover:border-white/50"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-white/20">
                <Link 
                  to="/login" 
                  className="text-white/90 hover:text-white font-medium px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-200"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-white text-primary-700 hover:bg-primary-50 font-semibold py-2 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white focus:outline-none p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div 
            className="md:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMenuOpen(false)}
          />
        )}

        {/* Mobile Menu Drawer */}
        <div className={`md:hidden fixed top-0 left-0 h-full w-[calc(100%-10px)] max-w-sm bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="flex flex-col h-full">
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/20">
              <span className="text-xl font-bold text-white">Menu</span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto py-4 space-y-2">
              <Link
                to="/"
                className={`block px-4 py-3 mx-2 rounded-lg font-medium transition-all ${
                  isActive('/') 
                    ? 'bg-white/20 text-white' 
                    : 'text-white/90 hover:bg-white/10 hover:text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className={`block px-4 py-3 mx-2 rounded-lg font-medium transition-all ${
                  isActive('/products') 
                    ? 'bg-white/20 text-white' 
                    : 'text-white/90 hover:bg-white/10 hover:text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              {authenticatedUser && (
                <Link
                  to="/my-orders"
                  className={`block px-4 py-3 mx-2 rounded-lg font-medium transition-all ${
                    isActive('/my-orders') || isActive('/dashboard')
                      ? 'bg-white/20 text-white' 
                      : 'text-white/90 hover:bg-white/10 hover:text-white'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Orders
                </Link>
              )}
              <Link
                to="/cart"
                className={`block px-4 py-3 mx-2 rounded-lg font-medium transition-all relative ${
                  isActive('/cart') 
                    ? 'bg-white/20 text-white' 
                    : 'text-white/90 hover:bg-white/10 hover:text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Cart
                </span>
                {cartItemCount > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1">
                    {cartItemCount}
                  </span>
                )}
              </Link>
              {authenticatedUser ? (
                <div className="space-y-2 pt-2 border-t border-white/20 mx-2">
                  <div className="px-4 py-2 bg-white/10 rounded-lg">
                    <p className="text-white/90 text-sm font-medium truncate">{authenticatedUser.displayName || authenticatedUser.email || authenticatedUser.user?.email}</p>
                  </div>
                  <button 
                    onClick={handleLogout} 
                    className="w-full bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 border border-white/30"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-2 pt-2 border-t border-white/20 mx-2">
                  <Link
                    to="/login"
                    className="block text-center text-white/90 hover:text-white font-medium px-4 py-3 rounded-lg hover:bg-white/10 transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block text-center bg-white text-primary-700 hover:bg-primary-50 font-semibold py-3 px-4 rounded-lg transition-all shadow-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

