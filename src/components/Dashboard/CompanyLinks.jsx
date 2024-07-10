import React from "react";

const CompanyLinks = () => {
  return (
    <div>
      <div className="text-sm text-black uppercase font-medium">Company</div>
      <a
        href="#"
        className="text-sm text-gray-500 mb-1 hover:text-tertiary hover:underline"
      >
        Company Website
      </a>
      <div className="mt-4 mb-1 text-sm text-black uppercase font-medium">
        BENEFITS
      </div>
      <div className="text-sm  text-gray-500 mb-1">401k</div>
      <div className="text-sm  text-gray-500 mb-1">Health</div>
      <div className="text-sm  text-gray-500 mb-1">Vision</div>
      <div className="text-sm  text-gray-500 mb-1">Dental</div>
    </div>
  );
};

export default CompanyLinks;
