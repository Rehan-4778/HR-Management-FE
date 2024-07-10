import React from "react";
import MyInfoNav from "../../components/Navbars/MyInfoNav";
import { Link, NavLink } from "react-router-dom";
import { FaGear } from "react-icons/fa6";

const MyInfoHeader = ({ user, companyDomain }) => {
  return (
    <div className="flex justify-between dashboard-home-page bg-gradient-to-r from-green2 to-green3 px-8  text-white shadow-md">
      <div className="w-1/5">
        {/* circle */}
        <div className="absolute ml-5 rounded-full w-48 h-48 border-[3px] my-8">
          <img
            src="https://images7.bamboohr.com/620828/photos/8-19-4.jpg?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9pbWFnZXM3LmJhbWJvb2hyLmNvbS82MjA4MjgvKiIsIkNvbmRpdGlvbiI6eyJEYXRlR3JlYXRlclRoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTcyMDYzODMyNn0sIkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzIzMjMwMzM2fX19XX0_&Signature=L72CJVC6zePHVkxIkizNepigNEryR8F5qg7ZzPfPi6emRxvuSOdBT3vh681BgsuoyXE17W758UvHmtNIXzQvms9~NlZLNRhoWHbURwv7OVsjc4RixmObedz-4SN-eMaSuzH2QAzTF0m4iTzqm~LvX5hH0hFS4X0UMWdmts93FU6BBNU42O-N3v9JIQ3RaxAr0~pLrs55VqDUEmmrFL9kGSh0iAV2-dM1Q4Yr1CLJytwpDJ3OSo8qQcrQoY4U7s2u7rccRvMFUtqB-mNlsbZiCdsqJeitJjv5qX3w60LWIyKgR0HY5EAd6TZbDKsguYvCcWLc8iYwW4RBx5Nk3BX5Nw__&Key-Pair-Id=APKAIZ7QQNDH4DJY7K4Q"
            alt="User"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </div>
      <div className="flex flex-col w-4/5">
        <div className="flex-1 content-center">
          <div className="justify-between flex items-center">
            <h2 className="text-2xl font-bold">
              {user?.firstName + user?.lastName}
            </h2>
            <div className="flex space-x-4">
              <Link
                className="btn-outline"
                to={`/${companyDomain}/request-change`}
              >
                Request a Change
              </Link>
              <button className="btn-outline">
                <FaGear className="mr-2" />
                Settings
              </button>
            </div>
          </div>
        </div>
        <div className="flex content-end overflow-x-scroll scrollbar-hide">
          <MyInfoNav />
        </div>
      </div>
    </div>
  );
};

export default MyInfoHeader;
