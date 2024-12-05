import React, { useEffect } from "react";
import { FaUserCircle, FaUserPlus, FaEdit } from "react-icons/fa";
import "./DashboardHomePage.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TimeOffCard from "../../components/Dashboard/TimeOffCard";
import NotificationCard from "../../components/Dashboard/NotificationCard";
import { useParams } from "react-router-dom";
import Card from "../../components/Dashboard/Card";
import CelebrationItem from "../../components/Dashboard/CelebrationItem";
import WhosOut from "../../components/Dashboard/WhosOut";
import CompanyLinks from "../../components/Dashboard/CompanyLinks";
import ClockInOutCard from "../../components/Dashboard/ClockInOutCard";
import { getNotifications, getTimeOffDetails } from "../../store";

const DashboardHomePage = () => {
  const user = useSelector((state) => state?.auth?.selectedCompany?.profile);
  const companyId = useSelector(
    (state) => state?.auth?.selectedCompany?.company?._id
  );
  const employeeId = useSelector(
    (state) => state?.auth?.selectedCompany?.profile?.employeeId
  );

  const { companyDomain } = useParams();
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state?.employee?.notifications);
  const timeOffDetails = useSelector((state) => state?.timeOff?.timeOffDetails);

  const fetchTimeOffDetail = async () => {
    const response = await dispatch(
      getTimeOffDetails({
        companyId,
        employeeId,
      })
    );
  };

  const fetchNotifications = async () => {
    const response = await dispatch(
      getNotifications({
        companyId,
      })
    );
  };

  useEffect(() => {
    fetchNotifications();
    fetchTimeOffDetail();
  }, [companyId, employeeId]);

  const celebrations = [
    {
      imgSrc: "url1",
      name: "Cheryl Barnet",
      date: "July 23",
      description: "3rd Anniversary",
    },
    {
      imgSrc: "url1",
      name: "Cheryl Barnet",
      date: "July 23",
      description: "3rd Anniversary",
    },
    {
      imgSrc: "url1",
      name: "Cheryl Barnet",
      date: "July 23",
      description: "3rd Anniversary",
    },
    {
      imgSrc: "url1",
      name: "Cheryl Barnet",
      date: "July 23",
      description: "3rd Anniversary",
    },
    {
      imgSrc: "url2",
      name: "Daniel Vance",
      date: "July 23",
      description: "3rd Anniversary",
    },
    {
      imgSrc: "url3",
      name: "Eric Asture",
      date: "July 23",
      description: "3rd Anniversary",
    },
  ];

  const whosOut = [
    {
      date: "Monday, July 07",
      message: "Nobody requested time off for Monday, Jul 07",
    },
    {
      date: "Monday, July 08",
      message: "Nobody requested time off for Monday, Jul 08",
    },
  ];

  return (
    <div className="h-full mt-16">
      <div className="flex justify-between items-start dashboard-home-page bg-gradient-to-r from-green2 to-green3 p-8  text-white shadow-md mb-4">
        <div className="flex items-center space-x-4">
          {user?.image ? (
            <img
              src={
                user?.image ||
                "https://static-00.iconduck.com/assets.00/profile-user-icon-512x512-nm62qfu0.png"
              }
              alt="user"
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <FaUserCircle size={40} />
          )}
          <div>
            <h2 className="text-3xl font-semibold">
              {user?.firstName + " " + user?.lastName}
            </h2>
            <p className="font-medium mt-1">
              {user?.jobInformation && user?.jobInformation[0]?.jobTitle}
            </p>
          </div>
        </div>
        <div className="flex space-x-4">
          <Link className="btn-outline" to={`/${companyDomain}/employees/new`}>
            <FaUserPlus className="mr-2" />
            New Employee
          </Link>
          {/* <button className="btn-outline">
            <FaEdit className="mr-2" />
            Edit
          </button> */}
        </div>
      </div>
      <div className="p-8 grid grid-cols-12 gap-5 -mt-28 w-full">
        <div className="col-span-12 md:col-span-4">
          <div className="flex flex-col gap-3 ">
            <ClockInOutCard />
            <TimeOffCard list={timeOffDetails} />
          </div>
        </div>
        <div className="col-span-12 md:col-span-8">
          <NotificationCard />
        </div>
      </div>
      <div className="p-8 grid grid-cols-12 gap-5 w-full">
        <div className="col-span-12 md:col-span-4 flex flex-col bg-white rounded-lg shadow-md ">
          <div className="flex justify-between items-center py-2 px-6 rounded-tr-md rounded-tl-md bg-gray-100 m-1">
            <h2 className="text-lg font-semibold text-green1">
              🎉 Celebrations
            </h2>
          </div>
          <Card>
            {celebrations?.map((item, index) => {
              return (
                <CelebrationItem
                  key={index}
                  imgSrc={item.imgSrc}
                  name={item.name}
                  date={item.date}
                  description={item.description}
                />
              );
            })}
          </Card>
        </div>
        <div className="col-span-12 md:col-span-4 flex flex-col bg-white rounded-lg shadow-md ">
          <div className="flex justify-between items-center py-2 px-6 rounded-tr-md rounded-tl-md bg-gray-100 m-1">
            <h2 className="text-lg font-semibold text-green1">📅 Who's Out</h2>
          </div>
          <Card>
            {whosOut.map((item, index) => {
              return (
                <WhosOut key={index} date={item.date} message={item.message} />
              );
            })}
          </Card>
        </div>
        <div className="col-span-12 md:col-span-4 flex flex-col bg-white rounded-lg shadow-md ">
          <div className="flex justify-between items-center py-2 px-6 rounded-tr-md rounded-tl-md bg-gray-100 m-1">
            <h2 className="text-lg font-semibold text-green1">
              🔗 Company Links
            </h2>
          </div>
          <Card>
            <CompanyLinks />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardHomePage;
