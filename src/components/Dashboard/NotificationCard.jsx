import React, { useState } from "react";
import NotificationItem from "./NotificationItem";
import IconFileSignature from "../../assets/FileSignature";
import Assessment from "../../assets/Assessment";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const NotificationCard = () => {
  const [hovered, setHovered] = useState(false);
  const companyName = useSelector(
    (state) => state?.auth?.selectedCompany?.company?.name
  );
  const navigate = useNavigate();

  const pathName = window.location.pathname?.split("/")[0];

  console.log("url", pathName);
  const selectedCompany = useSelector(
    (state) => state?.auth?.selectedCompany?.company?.domain
  );
  const notifications = useSelector((state) => state?.employee?.notifications);
  console.log("notifications", notifications);
  const employeeId = useSelector(
    (state) => state?.auth?.selectedCompany?.profile?.employeeId
  );

  const icons = {
    signature_request: {
      icon: <IconFileSignature color="#777" />,
      activeIcon: <IconFileSignature color="green" />,
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-1 w-full">
      <div className="flex justify-between items-center mb-4 py-2 px-6 bg-gray-100 rounded-tl-md rounded-tr-md">
        <h2 className="text-lg font-semibold green">
          What's happening at {companyName}
        </h2>
        <a
          href="#"
          className="text-blue-500 text-sm hover:text-tertiary hover:underline"
        >
          Announcements
        </a>
      </div>
      <div className="space-y-4 px-6  h-[400px] overflow-y-scroll">
        {notifications?.map((notification) => (
          <NotificationItem
            key={notification._id}
            {...notification}
            icons={icons[notification?.type] || {}}
            hovered={hovered === notification._id}
            setHovered={setHovered}
            onClick={() =>
              navigate(
                `${pathName}/${selectedCompany}/employee/${employeeId}/documents/${notification?.folderId?.name}
                `,
                {
                  state: {
                    folderId: notification?.folderId?._id,
                    isNavigatedFromNotification: true,
                  },
                }
              )
            }
          />
        ))}
      </div>
    </div>
  );
};

export default NotificationCard;
