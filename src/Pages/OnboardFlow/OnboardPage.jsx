import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { loadState } from "../../../utils/storageManager";

const OnboardPage = () => {
  const { onboardToken } = useParams();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    let state = loadState("storedStatse");
    if (state && state.token) {
      setAuthToken(state.token);
    } else {
      setRedirecting(true);
      setTimeout(() => {
        navigate(`/onboard/${onboardToken}/login`);
      }, 2000);
    }
  }, [onboardToken, navigate]);

  const handleLogout = () => {
    // Handle logout logic here
    console.log("Logged out");
  };

  return (
    <div className="h-screen flex flex-col">
      {redirecting && (
        <div className="fixed top-0 left-0 right-0 text-black p-2 text-center">
          Redirecting to login...
        </div>
      )}
      {authToken && (
        <>
          <nav className="bg-white shadow-sm p-4 flex justify-between items-center">
            <div className="text-xl font-bold">Your Logo</div>
            <div className="relative">
              <FaUserCircle
                size={30}
                className="cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </nav>
          <div className="flex-grow flex items-center justify-center">
            <div className="bg-white shadow rounded py-8 px-12 max-w-lg">
              <h2 className="text-2xl font-bold mb-4">Welcome to</h2>
              <p className="mb-4 ">
                We are excited to have you join our team at [Company Name]. To
                complete your onboarding process and gain access to our
                resources, please accept the invitation below. We look forward
                to your valuable contributions and collaboration.
              </p>
              <button className="bg-primary text-white px-3 py-2 rounded font-medium text-sm">
                Accept Invitation
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OnboardPage;
