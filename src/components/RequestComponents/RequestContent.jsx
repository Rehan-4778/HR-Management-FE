// pages/RequestContent.jsx
import React from "react";
import RequestItem from "./RequestItem";

const requests = [
  {
    name: "Charlotte Abbott",
    date: "May 31, 2024",
    details:
      "I'm requesting 16 hours of Vacation for May 31, 2024 - Jun 3, 2024.",
  },
  {
    name: "Maja Andev",
    date: "Jun 19, 2024",
    details:
      "I'm requesting 40 hours of Vacation for Sep 28, 2024 - Oct 2, 2024.",
  },
  {
    name: "Jennifer Caldwell",
    date: "Jun 19, 2024",
    details:
      "I'm requesting 40 hours of Vacation for Aug 10, 2024 - Aug 14, 2024.",
  },
  {
    name: "Charlotte Abbott",
    date: "Aug 29, 2024",
    details:
      "I'm requesting 40 hours of Vacation for Aug 29, 2024 - Sep 4, 2024.",
  },
];

const RequestContent = () => {
  return (
    <div className="flex-1 px-4">
      {requests.map((request, idx) => (
        <RequestItem key={idx} request={request} />
      ))}
    </div>
  );
};

export default RequestContent;
