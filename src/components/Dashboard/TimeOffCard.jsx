import React from "react";
import {
  FaBackward,
  FaChevronCircleLeft,
  FaChevronCircleRight,
} from "react-icons/fa";
import Slider from "react-slick";
import { useNavigate, useParams } from "react-router-dom";

const TimeOffCard = ({ list }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    arrows: true,
    prevArrow: (
      <div>
        <FaChevronCircleLeft className="text-gray-800" size={18} />
      </div>
    ),
    nextArrow: (
      <div>
        <FaChevronCircleRight className="text-gray-800" size={18} />
      </div>
    ),
  };

  const navigate = useNavigate();
  const { companyDomain } = useParams();

  return (
    <div className="bg-white rounded-lg shadow-md p-1">
      <div className="flex justify-between items-center py-2 px-6 rounded-tr-md rounded-tl-md bg-gray-100">
        <h2 className="text-lg font-semibold text-green1">Time Off</h2>
      </div>
      <div className="my-6 px-6 w-full">
        <Slider {...settings}>
          {list?.map((item, index) => {
            return (
              <div
                className={`text-center w-[50%] ${
                  item !== list[list.length - 1] &&
                  "border-r-[1.5px] border-gray-200"
                }`}
                key={item?.leaveId}
              >
                <div className="text-sm font-medium text-gray-700">
                  {item?.leaveName}
                </div>
                <div className="text-2xl font-bold">
                  {item?.leaveTotalTime === 0 ? "-" : item?.leaveRemainingTime}
                </div>
                <div className="text-sm text-green1 font-medium">
                  HOURS AVAILABLE
                </div>
                <div className="text-xs text-gray-400">
                  {item?.leaveScheduledHours} hours scheduled
                </div>
              </div>
            );
          })}
        </Slider>
      </div>

      <div className="mb-4 px-6">
        <button
          className="bg-green2 text-white py-2 px-4 rounded-sm w-full hover:bg-green1 transition duration-300 font-bold"
          onClick={() => navigate(`/${companyDomain}/request-time-off`)}
        >
          Request Time Off
        </button>
      </div>
    </div>
  );
};

export default TimeOffCard;
