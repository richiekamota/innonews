import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";
import { registerUser } from '../redux/actions/registrationActions';
import { fetchCsrfToken } from '../redux/actions/csrfActions';
import { RootState } from '../reducers';

const RegistrationPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { csrfToken, isLoading, error } = useSelector(
    (state: RootState) => state.csrf
  );
  const registrationMessage = useSelector(
    (state: RootState) => state.registration.message
  );

  useEffect(() => {
    if (!csrfToken) {
      dispatch(fetchCsrfToken()); // Fetch CSRF token on component mount
    }
  }, [csrfToken, dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLoading) return; // Prevent submission while loading

    const success = await dispatch(registerUser(formData, csrfToken));
    if (success) {
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  const handleBackToWelcome = () => {
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Create Account</h1>
        <p className="text-sm text-gray-600 mb-6">Sign up to access personalized content.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
          <input
            type="password"
            name="password_confirmation"
            placeholder="Confirm Password"
            value={formData.password_confirmation}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Sign Up"}
          </button>
        </form>

        {registrationMessage && (
          <p
            className={`text-sm mt-4 ${registrationMessage.includes("successful") ? "text-green-500" : "text-red-500"}`}
          >
            {registrationMessage}
          </p>
        )}

        <p className="text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Log in
          </a>
        </p>

        <button
          onClick={handleBackToWelcome}
          className="text-sm text-blue-500 hover:underline mt-4 flex items-center"
        >
          <FaArrowLeft className="w-3 h-3 mr-2" />
          Back to Welcome Page
        </button>
      </div>
    </div>
  );
};

export default RegistrationPage;
