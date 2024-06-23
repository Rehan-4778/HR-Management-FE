import React from "react";
import Button from "../../components/Buttons/Button";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="mt-2 text-2xl text-gray-600">Page Not Found</p>
        <p className="my-4 text-gray-500">
          Sorry, the page you are looking for does not exist.
        </p>
        <div className="flex justify-center">
          <Button
            tertiary
            rounded
            classnames="nav-button text-white h-10"
            onClick={() => navigate("/")}
          >
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
