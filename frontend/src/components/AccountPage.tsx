import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaChevronDown, FaArrowLeft } from "react-icons/fa";
import { fetchDropdownOptions } from "../redux/actions/dropdownActions";
import { savePreferences } from "../redux/actions/preferencesActions";
import { logoutUser } from "../redux/actions/logoutActions";

const AccountPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [preferences, setPreferences] = useState({
    sources: [] as string[],
    categories: [] as string[],
    authors: [] as string[],
  });
  const [dropdownVisible, setDropdownVisible] = useState({
    sources: false,
    categories: false,
    authors: false,
    username: false,
  });

  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  const { sources, categories, authors } = useSelector((state: any) => state.dropdown);
  
  useEffect(() => {
      const storedCsrfToken = localStorage.getItem("csrfToken");
      setCsrfToken(storedCsrfToken || null);
      const storedUsername = localStorage.getItem("username");
      setUsername(storedUsername);
    }, []);

  const dropdownRefs = {
    sources: useRef<HTMLDivElement | null>(null),
    categories: useRef<HTMLDivElement | null>(null),
    authors: useRef<HTMLDivElement | null>(null),
    username: useRef<HTMLDivElement | null>(null),
  };

  useEffect(() => {
    // Fetch dropdown options
    dispatch(fetchDropdownOptions({ csrfToken }));

    // Close dropdowns on outside click
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !Object.values(dropdownRefs).some((ref) => ref.current?.contains(event.target as Node))
      ) {
        setDropdownVisible({
          sources: false,
          categories: false,
          authors: false,
          username: false,
        });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch, csrfToken]);

  const toggleDropdown = (field: "sources" | "categories" | "authors" | "username") => {
    setDropdownVisible((prev) => ({
      ...prev,
      [field]: !prev[field],
      ...(field !== "username" && { username: false }),
    }));
  };

  const handlePreferencesChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "sources" | "categories" | "authors"
  ) => {
    const { value, checked } = e.target;
    setPreferences((prev) => {
      const updatedValues = checked
        ? [...prev[field], value]
        : prev[field].filter((item) => item !== value);

      return {
        ...prev,
        [field]: updatedValues,
      };
    });
  };

  const handleSavePreferences = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
  
    setIsSubmitting(true);
    setMessage("");
  
    try {
      await dispatch(
        savePreferences(preferences, csrfToken, (success: boolean) => {
          if (success) {
            setMessage("Preferences saved successfully!");
          } else {
            setMessage("Failed to save preferences.");
          }
        })
      );
    } catch (error) {
      setMessage("An error occurred while saving preferences.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleLogout = async () => {
    try {
      await dispatch(logoutUser(csrfToken ?? ""));
      localStorage.removeItem("csrfToken");
      localStorage.removeItem("username");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex flex-col">
      {/* Navbar */}
      <div className="bg-white shadow-lg p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Account Settings</h1>
        <div className="relative" ref={dropdownRefs.username}>
          <button
            onClick={() => toggleDropdown("username")}
            className="flex items-center space-x-2 text-lg font-semibold text-gray-800"
          >
            <span>{username || "User"}</span>
            <FaChevronDown />
          </button>
          {dropdownVisible.username && (
            <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-lg w-40 z-10">
              <ul className="py-2">
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
        <div className="bg-white shadow-lg rounded-lg w-full max-w-3xl p-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
            Personalize Your News Feed
          </h2>

          {/* Preferences Form */}
          <form onSubmit={handleSavePreferences}>
            {/* Dropdowns for Sources, Categories, Authors */}
            {[
              { field: "sources", options: sources },
              { field: "categories", options: categories },
              { field: "authors", options: authors || ["Author A", "Author B", "Author C"] },
            ].map(({ field, options }) => (
              <div className="mb-6" key={field}>
                <label className="block text-gray-700 font-semibold mb-2 capitalize">
                  Preferred {field}
                </label>
                <div
                  className="relative"
                  ref={dropdownRefs[field as keyof typeof dropdownRefs]}
                >
                  <button
                    type="button"
                    onClick={() => toggleDropdown(field as "sources" | "categories" | "authors")}
                    className="w-full p-2 border rounded-md text-left flex items-center justify-between focus:ring-2 focus:ring-blue-500"
                  >
                    <span>
                      {preferences[field as keyof typeof preferences].length > 0
                        ? preferences[field as keyof typeof preferences].join(", ")
                        : `Select ${field}`}
                    </span>
                    <FaChevronDown />
                  </button>
                  {dropdownVisible[field as "sources" | "categories" | "authors"] && (
                    <div className="absolute left-0 right-0 mt-2 bg-white border rounded-md shadow-lg z-10">
                      <ul className="py-2">
                        {options.map((option: string) => (
                          <li key={option} className="px-4 py-2">
                            <label>
                              <input
                                type="checkbox"
                                value={option}
                                checked={preferences[field as keyof typeof preferences].includes(option)}
                                onChange={(e) => handlePreferencesChange(e, field as keyof typeof preferences)}
                                className="mr-2"
                              />
                              {option}
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Save Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 transition"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save Preferences"}
              </button>
            </div>
          </form>

          {/* Message Display */}
          {message && (
            <p
              className={`text-center mt-4 ${message.includes("success") ? "text-green-500" : "text-red-500"}`}
            >
              {message}
            </p>
          )}
        </div>
      </div>

      {/* Back to Dashboard */}
      <div className="bg-white p-4 text-center">
        <button
          onClick={handleBackToDashboard}
          className="text-blue-500 hover:underline"
        >
          <FaArrowLeft className="inline mr-2" />
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default AccountPage;
