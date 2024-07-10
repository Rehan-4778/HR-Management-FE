import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { BiChevronDown } from "react-icons/bi";
import {
  checkOnboardExpiry,
  acceptOnboardingInvite,
  logout,
} from "../../store";
import { toast } from "react-toastify";

const OnboardPage = () => {
  const user = useSelector((state) => state.onboard.user);
  const token = useSelector((state) => state.onboard.token);
  const { onboardToken } = useParams();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const [redirecting, setRedirecting] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [tokenExpired, setTokenExpired] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const verifyOnboardToken = async () => {
      if (token && onboardToken) {
        try {
          const response = await dispatch(checkOnboardExpiry({ onboardToken }));
          if (response?.payload?.success) {
            setAuthToken(token);
            setCompanyName(response?.payload?.data);
          } else {
            setAuthToken(token);
            setTokenExpired(true);
          }
        } catch (error) {
          console.error("Error checking onboard expiry:", error);
          setTokenExpired(true);
        }
      } else {
        handleRedirect();
      }
    };

    const handleRedirect = () => {
      setRedirecting(true);
      const timeoutId = setTimeout(() => {
        navigate(`/onboard/${onboardToken}/login`);
      }, 2500);

      return () => clearTimeout(timeoutId);
    };

    verifyOnboardToken();
  }, [onboardToken, token, dispatch]);

  const handleLogout = async () => {
    try {
      setAuthToken(null);
      const response = await dispatch(logout());
      if (response?.payload?.success) {
        toast.success(response?.payload?.message);
      } else {
        toast.error(response?.error?.message);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleAcceptInvitation = async () => {
    const response = await dispatch(
      acceptOnboardingInvite({
        onboardingToken: onboardToken,
      })
    );

    if (response?.payload?.success) {
      toast.success(response?.payload?.message);
    } else {
      toast.error(response?.error?.message);
    }
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
          <nav className="bg-white shadow-sm px-4 flex justify-between items-center">
            <div className="text-xl font-bold">Your Logo</div>
            <div
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <div className="py-4 flex items-center gap-3 cursor-pointer">
                <FaUserCircle size={32} color="green" />
                <span className="font-medium">
                  {user?.firstName + " " + user?.lastName}
                </span>
                <BiChevronDown size={25} className="cursor-pointer" />
              </div>
              {dropdownOpen && (
                <div className="absolute right-0 w-48 mr-3 bg-gray-100 rounded shadow-sm py-2">
                  <button
                    className="w-full text-left px-4 py-2 font-medium text-black text-sm hover:bg-gray-200"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </nav>
          <div className="flex-grow flex items-center justify-center">
            {tokenExpired ? (
              <div className="bg-white shadow rounded py-8 px-12 max-w-lg">
                <h2 className="text-2xl font-bold mb-4">Invitation Expired</h2>
                <p className="mb-4">
                  The invitation you are trying to access has expired. Please
                  contact the administrator for a new invitation.
                </p>
                <button className="bg-primary text-white px-3 py-2 rounded font-medium text-sm">
                  Contact Administrator
                </button>
              </div>
            ) : (
              <div className="bg-white shadow rounded py-8 px-12 max-w-lg">
                <h2 className="text-2xl font-bold mb-4">
                  Welcome to {companyName}
                </h2>
                <p className="mb-4 ">
                  We are excited to have you join our team at {companyName}. To
                  complete your onboarding process and gain access to our
                  resources, please accept the invitation below. We look forward
                  to your valuable contributions and collaboration.
                </p>
                <button
                  className="bg-primary text-white px-3 py-2 rounded font-medium text-sm"
                  onClick={handleAcceptInvitation}
                >
                  Accept Invitation
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default OnboardPage;
