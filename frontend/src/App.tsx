import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistrationPage from "./components/RegistrationPage";
import LoginPage from "./components/LoginPage";
import WelcomePage from "./components/WelcomePage";
import DashboardPage from "./components/DashboardPage";
import AccountPage from "./components/AccountPage";
import ProtectedRoute from "./components/ProtectedRoute";

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(
    sessionStorage.getItem("loggedIn") === "true"
  );

  const login = () => {
    setLoggedIn(true);
    sessionStorage.setItem("loggedIn", "true");
  };

  const logout = () => {
    setLoggedIn(false);
    sessionStorage.setItem("loggedIn", "false");
  };

  return (
    <Router>
      <Routes>
        <Route path="/account" element={
          <ProtectedRoute loggedIn={loggedIn}>
            <AccountPage />
          </ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute loggedIn={loggedIn}>
            <DashboardPage />
          </ProtectedRoute>
        } />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage login={login} />} />
        <Route path="/" element={<WelcomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
