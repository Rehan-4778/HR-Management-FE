import React, { useState } from "react";
import { BsFillPeopleFill } from "react-icons/bs";
import EmployeeTable from "../../components/Tables/EmployeeTable";

const PeoplePage = () => {
  const [employees, setEmployees] = useState([
    {
      photoUrl:
        "https://images7.bamboohr.com/620828/photos/8-19-4.jpg?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9pbWFnZXM3LmJhbWJvb2hyLmNvbS82MjA4MjgvKiIsIkNvbmRpdGlvbiI6eyJEYXRlR3JlYXRlclRoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTcyMDYzODMyNn0sIkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzIzMjMwMzM2fX19XX0_&Signature=L72CJVC6zePHVkxIkizNepigNEryR8F5qg7ZzPfPi6emRxvuSOdBT3vh681BgsuoyXE17W758UvHmtNIXzQvms9~NlZLNRhoWHbURwv7OVsjc4RixmObedz-4SN-eMaSuzH2QAzTF0m4iTzqm~LvX5hH0hFS4X0UMWdmts93FU6BBNU42O-N3v9JIQ3RaxAr0~pLrs55VqDUEmmrFL9kGSh0iAV2-dM1Q4Yr1CLJytwpDJ3OSo8qQcrQoY4U7s2u7rccRvMFUtqB-mNlsbZiCdsqJeitJjv5qX3w60LWIyKgR0HY5EAd6TZbDKsguYvCcWLc8iYwW4RBx5Nk3BX5Nw__&Key-Pair-Id=APKAIZ7QQNDH4DJY7K4Q",
      employeeNumber: 1,
      lastName: "Doe",
      firstName: "John",
      jobTitle: "Software Engineer",
      location: "Lagos",
      employmentStatus: "Full-Time",
      hireDate: "2021-09-01",
    },
    {
      photoUrl:
        "https://images7.bamboohr.com/620828/photos/8-19-4.jpg?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9pbWFnZXM3LmJhbWJvb2hyLmNvbS82MjA4MjgvKiIsIkNvbmRpdGlvbiI6eyJEYXRlR3JlYXRlclRoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTcyMDYzODMyNn0sIkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzIzMjMwMzM2fX19XX0_&Signature=L72CJVC6zePHVkxIkizNepigNEryR8F5qg7ZzPfPi6emRxvuSOdBT3vh681BgsuoyXE17W758UvHmtNIXzQvms9~NlZLNRhoWHbURwv7OVsjc4RixmObedz-4SN-eMaSuzH2QAzTF0m4iTzqm~LvX5hH0hFS4X0UMWdmts93FU6BBNU42O-N3v9JIQ3RaxAr0~pLrs55VqDUEmmrFL9kGSh0iAV2-dM1Q4Yr1CLJytwpDJ3OSo8qQcrQoY4U7s2u7rccRvMFUtqB-mNlsbZiCdsqJeitJjv5qX3w60LWIyKgR0HY5EAd6TZbDKsguYvCcWLc8iYwW4RBx5Nk3BX5Nw__&Key-Pair-Id=APKAIZ7QQNDH4DJY7K4Q",
      employeeNumber: 2,
      lastName: "Doe",
      firstName: "Jane",
      jobTitle: "Product Manager",
      location: "Lagos",
      employmentStatus: "Full-Time",
      hireDate: "2021-09-01",
    },
    {
      photoUrl:
        "https://images7.bamboohr.com/620828/photos/8-19-4.jpg?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9pbWFnZXM3LmJhbWJvb2hyLmNvbS82MjA4MjgvKiIsIkNvbmRpdGlvbiI6eyJEYXRlR3JlYXRlclRoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTcyMDYzODMyNn0sIkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzIzMjMwMzM2fX19XX0_&Signature=L72CJVC6zePHVkxIkizNepigNEryR8F5qg7ZzPfPi6emRxvuSOdBT3vh681BgsuoyXE17W758UvHmtNIXzQvms9~NlZLNRhoWHbURwv7OVsjc4RixmObedz-4SN-eMaSuzH2QAzTF0m4iTzqm~LvX5hH0hFS4X0UMWdmts93FU6BBNU42O-N3v9JIQ3RaxAr0~pLrs55VqDUEmmrFL9kGSh0iAV2-dM1Q4Yr1CLJytwpDJ3OSo8qQcrQoY4U7s2u7rccRvMFUtqB-mNlsbZiCdsqJeitJjv5qX3w60LWIyKgR0HY5EAd6TZbDKsguYvCcWLc8iYwW4RBx5Nk3BX5Nw__&Key-Pair-Id=APKAIZ7QQNDH4DJY7K4Q",
      employeeNumber: 3,
      lastName: "Smith",
      firstName: "John",
      jobTitle: "Software Engineer",
      location: "Lagos",
      employmentStatus: "Full-Time",
      hireDate: "2021-09-01",
    },
    {
      photoUrl:
        "https://images7.bamboohr.com/620828/photos/8-19-4.jpg?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9pbWFnZXM3LmJhbWJvb2hyLmNvbS82MjA4MjgvKiIsIkNvbmRpdGlvbiI6eyJEYXRlR3JlYXRlclRoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTcyMDYzODMyNn0sIkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzIzMjMwMzM2fX19XX0_&Signature=L72CJVC6zePHVkxIkizNepigNEryR8F5qg7ZzPfPi6emRxvuSOdBT3vh681BgsuoyXE17W758UvHmtNIXzQvms9~NlZLNRhoWHbURwv7OVsjc4RixmObedz-4SN-eMaSuzH2QAzTF0m4iTzqm~LvX5hH0hFS4X0UMWdmts93FU6BBNU42O-N3v9JIQ3RaxAr0~pLrs55VqDUEmmrFL9kGSh0iAV2-dM1Q4Yr1CLJytwpDJ3OSo8qQcrQoY4U7s2u7rccRvMFUtqB-mNlsbZiCdsqJeitJjv5qX3w60LWIyKgR0HY5EAd6TZbDKsguYvCcWLc8iYwW4RBx5Nk3BX5Nw__&Key-Pair-Id=APKAIZ7QQNDH4DJY7K4Q",
      employeeNumber: 4,
      lastName: "Smith",
      firstName: "Jane",
      jobTitle: "Product Manager",
      location: "Lagos",
      employmentStatus: "Full-Time",
      hireDate: "2021-09-01",
    },
  ]);

  return (
    <div className="mt-24 px-10 min-h-screen">
      <div className="flex gap-3 ">
        <BsFillPeopleFill size={30} />
        <h1 className="text-3xl font-bold">People</h1>
      </div>
      <div className="mt-5">
        <EmployeeTable data={employees} />
      </div>
    </div>
  );
};

export default PeoplePage;
