import React from "react";

const TimeOffCard = ({
  vacationHoursAvailable,
  vacationHoursScheduled,
  sickHoursAvailable,
  sickHoursScheduled,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-1">
      <div className="flex justify-between items-center py-2 px-6 rounded-tr-md rounded-tl-md bg-gray-100">
        <h2 className="text-lg font-semibold text-green1">Time Off</h2>
      </div>
      <div className="flex justify-between my-6 px-6">
        <div className="text-center">
          <div className="text-sm font-medium text-gray-700">Vacation</div>
          <div className="text-2xl font-bold">{vacationHoursAvailable}</div>
          <div className="text-sm text-green1 font-medium">HOURS AVAILABLE</div>
          <div className="text-xs text-gray-400">
            {vacationHoursScheduled} hours scheduled
          </div>
        </div>
        <div className="border-r-[1.5px] border-gray-200"></div>
        <div className="text-center">
          <div className="text-sm font-medium text-gray-700">Sick</div>
          <div className="text-2xl font-bold">{sickHoursAvailable}</div>
          <div className="text-sm text-green1 font-medium">HOURS AVAILABLE</div>
          <div className="text-xs text-gray-400">
            {sickHoursScheduled} hours scheduled
          </div>
        </div>
      </div>
      <div className=" mb-4 px-6">
        <button className="bg-green1 text-white py-2 px-4 rounded-sm w-full hover:bg-green-700 transition duration-300">
          Request Time Off
        </button>
      </div>
    </div>
  );
};

export default TimeOffCard;
