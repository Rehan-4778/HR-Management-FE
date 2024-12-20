import React, { useEffect } from "react";
import { FaBullhorn, FaChevronRight, FaSpeakerDeck } from "react-icons/fa";
import { getAnnouncements } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import User from "../../assets/images/people.png";

import moment from "moment";

const AnnouncementPage = () => {
  const dispatch = useDispatch();
  const companyId = useSelector(
    (state) => state?.auth?.selectedCompany?.company?._id
  );
  const announcements = useSelector((state) => state?.setting?.announcements);

  const fetchAnnouncements = async () => {
    await dispatch(getAnnouncements({ companyId }));
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

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
                <div className="self-start mt-2">
                  <img
                    src={announcement?.createdBy?.image || User}
                    alt="image"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-black">
                      {announcement?.title}
                    </p>
                    <p className="text-[13px] text-gray-600">
                      {moment(announcement?.createdAt).format("M/D/Y hh:mm a")}
                    </p>
                    {announcement.description && (
                      <p className="text-[12px] text-gray-500 mt-1 break-words w-[50%]">
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
