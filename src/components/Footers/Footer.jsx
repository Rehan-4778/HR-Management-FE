import React from "react";

const Footer = () => {
  return (
    <div className="h-20 flex items-center bg-white border-t-[1.5px] px-5">
      <div className="flex justify-between w-full">
        <div className="flex gap-2 items-center">
          <div className="flex items-center text-sm text-gray-500 gap-2 ">
            <div className="w-1 h-1 rounded-xl bg-gray-500" />
            <span>Privacy Policy</span>
          </div>
          <div className="flex items-center text-sm text-gray-500 gap-2 ">
            <div className="w-1 h-1 rounded-xl bg-gray-500" />
            <span>Terms of Service</span>
          </div>
          <div className="text-sm text-gray-500">© 2024 Company Name</div>
        </div>
        <div>
          {/* logo */}
          <img src="logo.png" alt="Logo" className="w-24 h-8" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
