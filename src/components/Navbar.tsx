import olx_logo from '../assets/olx.png';
import lens from '../assets/lens.png';
import arrow from '../assets/arrow.png';
import searchIcon from '../assets/search.png';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

interface NavbarProps {
  onloginPop: () => void;
  setSearch: (value: string) => void;
}

const Navbar = ({ onloginPop, setSearch }: NavbarProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSellClick = () => {
    if (!user) {
      toast.error('Please login to sell a product');
    } else {
      navigate('/addproduct');
    }
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-gray-50 shadow-sm w-full">
      {/* Logo */}
      <Link to="/">
        <img src={olx_logo} className="w-12 h-10" alt="OLX logo" />
      </Link>

      {/* Location Input */}
      <div className="flex items-center mx-3 w-64 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm">
        <img src={lens} className="w-5 h-5 text-gray-500" alt="Location lens" />
        <input
          placeholder="Location"
          className="ml-2 w-full outline-none text-sm text-gray-700 placeholder-gray-400"
        />
        <img src={arrow} className="w-5 h-5 text-gray-500" alt="Dropdown arrow" />
      </div>

      {/* Search Bar with Icon Inside */}
      <div className="relative flex-1 mx-6">
        <input
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search: Cars, Mobile phones and more"
          className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm outline-none text-sm text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
        />
        <img
          src={searchIcon}
          alt="Search icon"
          className="absolute right-3 top-2.5 w-5 h-5 text-gray-500"
        />
      </div>

      {/* Language Selector */}
      <div className="flex items-center space-x-2 cursor-pointer group">
        <h1 className="text-sm font-medium text-gray-700 group-hover:text-teal-600 transition-colors duration-200">
          English
        </h1>
        <img
          src={arrow}
          alt="Language dropdown"
          className="w-4 h-4 text-gray-500 group-hover:rotate-180 transition-transform duration-200"
        />
      </div>

      {/* User Login/Logout */}
      <div className="flex items-center space-x-4 mx-6">
        {user ? (
          <>
            <h1 className="text-sm font-semibold text-gray-800">
              {user?.displayName || 'User'}
            </h1>
            <button
              onClick={logout}
              className="text-sm font-medium text-teal-600 hover:text-teal-800 underline hover:no-underline transition-colors duration-200"
            >
              Logout
            </button>
          </>
        ) : (
          <h1
            className="text-sm font-medium text-teal-600 hover:text-teal-800 underline hover:no-underline cursor-pointer transition-colors duration-200"
            onClick={onloginPop}
          >
            Login
          </h1>
        )}
      </div>

      {/* Sell Button */}
      <div
        onClick={handleSellClick}
        className="flex items-center justify-center w-28 h-10 bg-yellow-500 text-white text-sm font-semibold rounded-full shadow-md cursor-pointer hover:bg-yellow-600 transition-colors duration-200"
      >
        + SELL
      </div>
    </div>
  );
};

export default Navbar;