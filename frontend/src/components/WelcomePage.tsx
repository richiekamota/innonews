import React from "react";
import { Link } from "react-router-dom";

const WelcomePage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-blue-600">
      <div className="bg-white shadow-xl rounded-lg w-full max-w-md p-8 transform transition-all hover:scale-105 hover:shadow-2xl">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4 text-center">
          Welcome to Innonews
        </h1>
        <p className="text-md text-gray-600 mb-8 text-center">
          Stay updated with the latest news, personalized for you. Start your journey today!
        </p>
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">New to Innonews?</p>
            <Link
              to="/register"
              className="inline-block bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 hover:shadow-lg transition-all"
            >
              Create an Account
            </Link>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Already have an account?</p>
            <Link
              to="/login"
              className="inline-block bg-transparent border-2 border-blue-500 text-blue-500 py-2 px-4 rounded-md shadow-md hover:bg-blue-100 hover:shadow-lg transition-all"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
