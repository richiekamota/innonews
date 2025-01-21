import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/api";
import { FaArrowLeft } from "react-icons/fa";

interface LoginPageProps {
  login: (username: string) => void; // Pass username to mark the user as logged in
}

const LoginPage: React.FC<LoginPageProps> = ({ login }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fetch CSRF token
  const fetchCsrfToken = async () => {
    try {
      await apiClient.get("/sanctum/csrf-cookie", { withCredentials: true });
      const csrfToken = document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith("XSRF-TOKEN="))
        ?.split("=")[1];
      setCsrfToken(csrfToken || null);
    } catch (error) {
      console.error("Failed to fetch CSRF token:", error);
      setMessage("Unable to fetch CSRF token. Please refresh the page.");
    }
  };

  useEffect(() => {
    fetchCsrfToken();
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle login form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await apiClient.post(
        "/api/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            "X-XSRF-TOKEN": csrfToken ?? "",
          },
        }
      );

      if (response.status === 200) {
        const { name, token } = response.data.data;
        console.log("Login:" +token);
        setMessage("Login successful! Redirecting...");
        setUsername(name);
        localStorage.setItem("csrfToken", token);
        localStorage.setItem("username", name);
        login(name); // Notify parent component of login and pass username
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        setMessage(response.data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
      console.error("Login error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToWelcome = () => {
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          {username ? `Welcome Back, ${username}!` : "Welcome Back"}
        </h1>
        <p className="text-sm text-gray-600 mb-6">Login to continue.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
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
          <button
            type="submit"
            className={`w-full py-2 rounded-md ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white transition`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging In..." : "Log In"}
          </button>
        </form>

        {message && (
          <p
            className={`text-sm mt-4 ${
              message.includes("successful") ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        <p className="text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>

        <button
          onClick={handleBackToWelcome}
          className="text-sm text-blue-500 hover:underline mt-4 flex items-center"
        >
          <FaArrowLeft className="w-3 h-3 mr-2" />
          Back to Home Page
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
