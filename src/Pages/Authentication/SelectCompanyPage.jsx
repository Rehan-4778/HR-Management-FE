import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCompany } from "../../store";

const SelectCompanyPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const companies = useSelector((state) => state?.auth?.companies);
  const selectedCompany = useSelector((state) => state?.auth?.selectedCompany);
  console.log(selectedCompany);

  const handleSelectCompany = async (id) => {
    const response = await dispatch(selectCompany({ companyId: id }));

    if (selectCompany.fulfilled.match(response)) {
      navigate(`/${selectedCompany?.company?.domain}/home`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
      <div className="max-w-4xl mx-auto px-12 py-20 shadow-sm bg-white rounded ">
        <h1 className="text-2xl font-bold text-primary mb-3 text-center select-none">
          Companies
        </h1>
        <p className="text-md text-gray-600 mb-6 text-center">
          Select a company to continue
        </p>
        <div className="w-full flex justify-center self-center flex-wrap gap-6">
          {companies?.map((company) => (
            <div
              key={company._id}
              onClick={() => handleSelectCompany(company._id)}
              className=" bg-white rounded-lg px-6 h-44 w-44 flex items-center border-[1.5px] border-gray-200 hover:border-primary cursor-pointer transition duration-100 ease-in-out "
            >
              <div className="flex flex-col items-center justify-center w-full">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-16 h-16 rounded-full mb-2"
                />
                <h2 className="text-md font-semibold text-gray-800">
                  {company.name?.length > 12
                    ? company.name.slice(0, 12) + "..."
                    : company.name}
                </h2>
                <p className="text-sm mt-1 text-quaternary">{company.domain}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectCompanyPage;
