import React from "react";
import { FaBullhorn, FaChevronRight, FaSpeakerDeck } from "react-icons/fa";

const AnnouncementPage = ({ announcement }) => {
  const announcements = [
    {
      name: "Charlotte Abbott",
      date: "May 31, 2024",
      description:
        "I'm requesting 16 hours of Vacation for May 31, 2024 - Jun 3, 2024.",
    },
    {
      name: "Maja Andev",
      date: "Jun 19, 2024",
      description:
        "I'm requesting 40 hours of Vacation for Sep 28, 2024 - Oct 2, 2024.",
    },
    {
      name: "Jennifer Caldwell",
      date: "Jun 19, 2024",
      description:
        "I'm requesting 40 hours of Vacation for Aug 10, 2024 - Aug 14, 2024.",
    },
    {
      name: "Charlotte Abbott",
      date: "Aug 29, 2024",
      description:
        "I'm requesting 40 hours of Vacation for Aug 29, 2024 - Sep 4, 2024.",
    },
  ];

  return (
    <div className="mt-16 px-16 max-w-6xl mx-auto min-h-screen">
      <div className="flex items-center gap-3">
        <FaBullhorn className="text-3xl text-green1" />
        <h1 className="text-3xl font-semibold my-5 text-green1 ">
          Announcements
        </h1>
      </div>
      <div className="flex flex-col border-t-[1.45px]">
        {announcements?.map((announcement) => {
          return (
            <div className="border-b py-3 hover:bg-gray-50 ">
              <div className="flex gap-5 px-5 items-center">
                <img
                  src="https://static-00.iconduck.com/assets.00/profile-user-icon-512x512-nm62qfu0.png"
                  alt="avatar"
                  className="w-8 h-8 rounded-full"
                />

                {/* Main Content */}
                <div className="w-full flex justify-between items-center">
                  <div>
                    {/* Name */}
                    <p className="font-medium text-black">
                      {announcement?.name}
                    </p>
                    {/* Date */}
                    <p className="text-[13px] text-gray-600">
                      {announcement?.date}
                    </p>
                    {/* Description */}
                    {announcement.description && (
                      <p className="text-[12px] text-gray-500 mt-1">
                        {announcement?.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AnnouncementPage;
