import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from '../redux/actions/articleActions';
import { userPreferenceOptions } from "../redux/actions/userPreferencesActions";
import { logout } from "../redux/slices/authSlice";  // Import the logout action
import { Article } from "./types";
import { RootState } from '../reducers';

const getTodayDate = (): string => {
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  return today.toISOString().split("T")[0];
};

const DashboardPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filters, setFilters] = useState({
    startDate: getTodayDate(),
    endDate: getTodayDate(),
    source: "",
    category: "",
  });
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { articles, loading, error } = useSelector((state: RootState) => state.articles);

  // User preferences from Redux state
  const { sources = [], categories = [], authors = [] } = useSelector((state: RootState) => state.userPreferences || {});

  // Fetch CSRF Token from localStorage or Redux state
  useEffect(() => {
    const storedCsrfToken = localStorage.getItem("csrfToken");
    setCsrfToken(storedCsrfToken || null);
    const username = localStorage.getItem("username");
    setUsername(username || "user");
  }, []);

  // Fetch user preferences once CSRF token is available
  useEffect(() => {
    if (csrfToken) {
      dispatch(userPreferenceOptions({ csrfToken }));
    }
  }, [csrfToken, dispatch]);

  // Search query change handler
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Fetch articles when filters or search query change
  useEffect(() => {
    if (csrfToken) {
      const updatedFilters = { ...filters, search: searchQuery };
      dispatch(fetchArticles({ filters: updatedFilters, csrfToken }));
    }
  }, [csrfToken, filters, searchQuery, dispatch]);

  // Filter change handler
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Handle logout
  const handleLogout = () => {
    try {
      dispatch(logout());
      localStorage.removeItem("csrfToken");
      localStorage.removeItem("username");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  // Close dropdown when clicking outside
  const handleClickOutside = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Define Articles Data
  const articlesData: Article[] = articles?.data || []; // Ensure `data` is an array

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex flex-col">
      {/* Navbar */}
      <div className="bg-white shadow-lg p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Newsboard</h1>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="flex items-center space-x-2 text-lg font-semibold text-gray-800"
          >
            <span>Welcome, {username || "User"}</span>
            <FaChevronDown />
          </button>
          {dropdownVisible && (
            <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-lg w-40 z-10">
              <ul className="py-2">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <Link to="/account">Account</Link>
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center py-10">
        <div className="bg-white shadow-lg rounded-lg w-full max-w-5xl p-8">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
            Newsboard
          </h1>

          {/* Search Bar */}
          <div className="flex justify-center mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search articles..."
              className="w-2/3 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center items-center space-x-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Source
              </label>
              <select
                name="source"
                value={filters.source}
                onChange={handleFilterChange}
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">All Sources</option>
                {sources.length > 0 && sources.map((source: string, index: number) => (
                  <option key={index} value={source}>
                    {source}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">All Categories</option>
                {categories.length > 0 && categories.map((category: string, index: number) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={filters.startDate}
                onChange={handleFilterChange}
                max={getTodayDate()} // Prevent selecting future dates
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={filters.endDate}
                onChange={handleFilterChange}
                max={getTodayDate()} // Prevent selecting future dates
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Articles Grid */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {articlesData.length > 0 ? (
              articlesData.map((article) => (
                <div
                  key={article.id}
                  className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
                >
                  {article.urlToImage && (
                    <img
                      src={article.urlToImage}
                      alt={article.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">{article.title}</h2>
                    <p className="text-sm text-gray-600">{article.description}</p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-sm text-gray-500">{article.source}</span>
                      <span className="text-sm text-gray-500">{article.published_at}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-red-500 col-span-full">
                No articles found.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
