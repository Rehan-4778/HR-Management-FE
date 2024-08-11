import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCompany } from "../../store";
import { toast } from "react-toastify";
import { hideLoading, showLoading } from "../../store/slices/loadingSlice";

const SelectCompanyPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const companies = useSelector((state) => state?.auth?.companies);

  const handleSelectCompany = async (company) => {
    try {
      dispatch(showLoading());
      const response = await dispatch(
        selectCompany({ companyId: company?._id })
      );
      if (response?.payload?.success) {
        navigate(`/${company?.domain}/home`);
      } else {
        toast.error(response.error.message);
      }
    } catch (error) {
    } finally {
      dispatch(hideLoading());
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
      <div className="max-w-4xl min-w-[30%] mx-auto px-12 py-20 shadow-sm bg-white rounded ">
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
              onClick={() => {
                console.log(company._id);
                handleSelectCompany(company);
              }}
              className=" bg-white rounded-lg px-6 h-44 w-44 flex items-center border-[1.5px] border-gray-200 hover:border-primary cursor-pointer transition duration-100 ease-in-out "
            >
              <div className="flex flex-col items-center justify-center w-full">
                <img
                  src={
                    company.image ||
                    "https://png.pngtree.com/png-clipart/20190630/original/pngtree-vector-office-icon-png-image_4171301.jpg"
                  }
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
