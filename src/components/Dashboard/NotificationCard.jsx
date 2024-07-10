import React, { useState } from "react";
import NotificationItem from "./NotificationItem";
import IconFileSignature from "../../assets/FileSignature";
import Assessment from "../../assets/Assessment";

const NotificationCard = () => {
  const [hovered, setHovered] = useState(false);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      icon: <IconFileSignature color="#777" />,
      activeIcon: <IconFileSignature color="green" />,
      title: "W-4 (2024) is waiting for your signature!",
      time: "In 2 months",
      link: "#",
    },
    {
      id: 2,
      icon: "👤",
      activeIcon: "👤",
      title:
        "Charlotte Abbott requested Jun 4–Jun 6 off – 40 hours of Vacation",
      time: "In 2 months",
      allowButton: true,
      denyButton: true,
      allowButtonAction: () => alert("Allow"),
      denyButtonAction: () => alert("Deny"),
    },
    {
      id: 3,
      icon: <Assessment color="#777" />,
      activeIcon: <Assessment color="green" />,
      title: "Take a moment to complete your Employee Assessments.",
      description:
        "Complete the assessments on the Performance tab on each employee's profile. Please complete by Jun 30 (8 days ago).",
      status: "PAST DUE",
      buttonText: "Complete Now",
      buttonAction: () => alert("Complete Now"),
    },
    {
      id: 4,
      icon: <Assessment color="#777" />,
      activeIcon: <Assessment color="green" />,
      title: "Take a few minutes to complete your Self Assessment.",
      description: "Please complete your assessment by Jun 30 (8 days ago).",
      status: "PAST DUE",
    },
    {
      id: 5,
      icon: <IconFileSignature color="#777" />,
      activeIcon: <IconFileSignature color="green" />,
      title: "Background_Check_Auth.pdf is waiting for your signature!",
      time: "15 days ago",
    },
  ]);

  return (
    <div className="bg-white rounded-lg shadow-md p-1 w-full">
      <div className="flex justify-between items-center mb-4 py-2 px-6 bg-gray-100 rounded-tl-md rounded-tr-md">
        <h2 className="text-lg font-semibold green">
          What's happening at testa
        </h2>
        <a
          href="#"
          className="text-blue-500 text-sm hover:text-tertiary hover:underline"
        >
          Announcements
        </a>
      </div>
      <div className="space-y-4 px-6  h-[400px] overflow-y-scroll">
        {notifications.map((notification, index) => (
          <NotificationItem
            key={index}
            {...notification}
            hovered={hovered === notification.id}
            setHovered={setHovered}
          />
        ))}
      </div>
    </div>
  );
};

export default NotificationCard;
