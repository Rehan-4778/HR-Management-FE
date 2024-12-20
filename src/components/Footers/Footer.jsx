import React from "react";
import { useSelector } from "react-redux";

const Footer = () => {
  const companyLogo = useSelector(
    (state) => state?.auth?.selectedCompany?.company?.image
  );
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
          <div className="text-sm text-gray-500">© 3AM Consulting Services</div>
        </div>
        <div>
          {companyLogo ? (
            <img
              src={companyLogo}
              alt="Company Logo"
              className="w-24 h-12 object-contain"
            />
          ) : (
            <div className="border-dashed border-[1.75px] rounded-sm px-4 py-3 border-gray-500">
              <h1 className="font-medium text-gray-700">COMPANY LOGO HERE</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Footer;
