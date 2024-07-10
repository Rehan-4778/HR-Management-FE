import React from "react";

const InfoTable = () => {
  const visaInfo = {
    date: "09/13/2024",
    visa: "Permanent Resident",
    issuingCountry: "United States",
    issued: "05/23/2020",
    expiration: "09/14/2029",
    status: "CURRENT",
    note: "Canadian Citizenship",
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-gray-200 rounded-lg">
          <tr>
            <th className="py-5 text-left font-semibold text-[15px] text-gray-700 first:rounded-tl-sm last:rounded-tr-sm rounded-bl-sm">
              Date
            </th>
            <th className="py-5 text-left font-semibold text-[15px] text-gray-700">
              Visa
            </th>
            <th className="py-5 text-left font-semibold text-[15px] text-gray-700">
              Issuing Country
            </th>
            <th className="py-5 text-left font-semibold text-[15px] text-gray-700">
              Issued
            </th>
            <th className="py-5 text-left font-semibold text-[15px] text-gray-700">
              Expiration
            </th>
            <th className="py-5 text-left font-semibold text-[15px] text-gray-700">
              Status
            </th>
            <th className="py-5 text-left font-semibold text-[15px] text-gray-700 last:rounded-tr-sm rounded-br-sm">
              Note
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-1 w-1/6 text-sm py-4 border-b border-gray-200">
              {visaInfo.date}
            </td>
            <td className="px-1 w-1/6 text-sm py-4 border-b border-gray-200">
              {visaInfo.visa}
            </td>
            <td className="px-1 w-1/6 text-sm py-4 border-b border-gray-200">
              {visaInfo.issuingCountry}
            </td>
            <td className="px-1 w-1/6 text-sm py-4 border-b border-gray-200">
              {visaInfo.issued}
            </td>
            <td className="px-1 w-1/6 text-sm py-4 border-b border-gray-200">
              {visaInfo.expiration}
            </td>
            <td className="px-1 w-1/6 text-sm py-4 border-b border-gray-200">
              <span className="px-2 inline-flex text-[10px] leading-4 font-semibold rounded-md bg-tertiary text-white">
                {visaInfo.status}
              </span>
            </td>
            <td className="px-1 w-1/6 text-sm py-4 border-b border-gray-200">
              {visaInfo.note}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default InfoTable;
