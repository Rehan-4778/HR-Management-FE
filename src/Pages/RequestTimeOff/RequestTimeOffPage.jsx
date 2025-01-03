import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import IconInput from "../../components/InputFields/IconInput";
import IconSelect from "../../components/SelectFields/IconSelect";
import { IoIosArrowRoundBack } from "react-icons/io";
import { SlCalender } from "react-icons/sl";
import { useNavigate, useParams } from "react-router-dom";
import { differenceInDays, eachDayOfInterval, format } from "date-fns";
import { getTimeOffDetails, requestTimeOff } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const RequestTimeOffPage = ({ payScheduleOptions, payTypeOptions }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { companyDomain } = useParams();
  // const user = useSelector((state) => state?.employee?.userInfo);
  const companyId = useSelector(
    (state) => state?.auth?.selectedCompany?.company?._id
  );
  const employeeId = useSelector(
    (state) => state?.auth?.selectedCompany?.profile?.employeeId
  );
  const [leaveTypes, setLeaveTypes] = useState([]);

  const timeOffDetails = useSelector((state) => state?.timeOff?.timeOffDetails);

  const fetchTimeOffDetail = async () => {
    await dispatch(
      getTimeOffDetails({
        companyId,
        employeeId,
      })
    );
  };

  useEffect(() => {
    fetchTimeOffDetail();
  }, [companyId, employeeId]);

  useEffect(() => {
    setLeaveTypes(
      timeOffDetails?.map((item) => {
        return {
          value: item.leaveId,
          label: item.leaveName,
        };
      })
    );
  }, [timeOffDetails]);

  const initialValues = {
    fromDate: "",
    toDate: "",
    timeOffCategory: "",
    note: "",
    dayHours: [],
  };

  const validationSchema = Yup.object().shape({
    fromDate: Yup.date().required("Required"),
    toDate: Yup.date(),
    timeOffCategory: Yup.string().required("Required"),
    balanceDate: Yup.date(),
    note: Yup.string(),
    dayHours: Yup.array().of(
      Yup.object().shape({
        date: Yup.date().required("Required"),
        hours: Yup.number().required("Required"),
      })
    ),
  });

  const handleSubmit = async (values) => {
    const { fromDate, toDate, timeOffCategory, dayHours, note } = values;

    try {
      const response = await dispatch(
        requestTimeOff({
          companyId,
          employeeId,
          leaveTypeId: timeOffCategory,
          startDate: fromDate,
          endDate: toDate,
          dayHours,
          note,
        })
      );

      if (response?.payload?.success) {
        toast.success("Time off request sent");
        // navigate(`/${companyDomain}/home`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDateChange = (setFieldValue, fieldName, date, values) => {
    const { fromDate, toDate } = values;
    if (fieldName === "fromDate" && new Date(date) > new Date(toDate)) {
      setFieldValue("toDate", date);
    } else if (fieldName === "toDate" && new Date(date) < new Date(fromDate)) {
      setFieldValue("fromDate", date);
    }
    setFieldValue(fieldName, date);

    const start = new Date(fieldName === "fromDate" ? date : fromDate);
    const end = new Date(fieldName === "toDate" ? date : toDate);

    if (start) {
      const days =
        end && start <= end
          ? eachDayOfInterval({ start, end }).map((d) => ({
              date: format(d, "yyyy-MM-dd"),
              hours: "",
            }))
          : [{ date: format(start, "yyyy-MM-dd"), hours: "" }];

      setFieldValue("dayHours", days);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        setFieldValue,
        handleBlur,
        values,
        errors,
        touched,
        handleSubmit,
      }) => (
        <Form className="p-8 mt-12">
          <div className="flex items-center mb-2">
            <button
              type="button"
              className="flex gap-2 text-gray-600 text-sm font-medium"
              onClick={() => navigate(`/${companyDomain}/home`)}
            >
              <IoIosArrowRoundBack size={20} />
              <span className="hover:underline">Back</span>
            </button>
          </div>
          <div className="flex gap-3 items-center">
            <SlCalender size={25} className="text-green1" />
            <h1 className="my-2 text-2xl font-semibold text-green1">
              Request Time Off
            </h1>
          </div>
          <div className="w-full h-[0.8px] mb-5 bg-gray-200 border-gray-200" />

          <div className="flex justify-between px-5">
            <div className="w-2/3">
              <div className="flex space-x-2">
                <IconInput
                  width={160}
                  label="From*"
                  type="date"
                  name="fromDate"
                  onChange={(e) =>
                    handleDateChange(
                      setFieldValue,
                      "fromDate",
                      e.target.value,
                      values
                    )
                  }
                  onBlur={handleBlur}
                  value={values.fromDate}
                  error={errors.fromDate && touched.fromDate}
                />
                <span className="py-7">-</span>
                <IconInput
                  width={160}
                  label="To*"
                  type="date"
                  name="toDate"
                  onChange={(e) =>
                    handleDateChange(
                      setFieldValue,
                      "toDate",
                      e.target.value,
                      values
                    )
                  }
                  onBlur={handleBlur}
                  value={values.toDate}
                  error={errors.toDate && touched.toDate}
                />
              </div>

              <IconSelect
                width={250}
                label="Time Off Category"
                name="timeOffCategory"
                options={leaveTypes.length > 0 ? leaveTypes : []}
                onChange={(item) => {
                  setFieldValue("timeOffCategory", item);
                }}
                onBlur={handleBlur}
                value={values.timeOffCategory}
                error={errors.timeOffCategory && touched.timeOffCategory}
              />

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Amount
                </label>
                {!values.fromDate && (
                  <span className="text-[12px] text-gray-400">
                    *Select dates to enter hours
                  </span>
                )}
                {values.fromDate && (
                  <div className="border pt-2 mt-2 w-72 rounded-sm">
                    {values.dayHours.map((day, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center mt-2 px-4"
                      >
                        <span className="text-sm">
                          {format(new Date(day.date), "EEE, MMM d")}
                        </span>
                        <div className="flex items-center">
                          <Field
                            type="number"
                            name={`dayHours[${index}].hours`}
                            className={`w-12 text-center border rounded-sm text-sm  outline-none ${
                              errors.dayHours &&
                              touched.dayHours &&
                              "border-danger border-[1.25px]"
                            }`}
                            min={1}
                            max={24}
                          />
                          {errors.dayHours && touched.dayHours ? (
                            <span className="text-danger text-[12px]">
                              <ErrorMessage
                                name={`dayHours[${index}].hours`}
                                className="ml-2"
                              />
                            </span>
                          ) : (
                            <span className="ml-2 text-sm">hour</span>
                          )}
                        </div>
                      </div>
                    ))}
                    <div className="mt-4 bg-gray-200 py-1">
                      <span className="font-semibold text-sm px-4">
                        Total:{" "}
                        {values.dayHours.reduce(
                          (acc, day) => acc + (parseFloat(day.hours) || 0),
                          0
                        )}{" "}
                        hours
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 w-1/2">
                <label className="block text-sm font-medium text-gray-700 ">
                  Note
                </label>
                <Field
                  as="textarea"
                  name="note"
                  rows="3"
                  className="mt-2 p-2 border rounded w-full outline-none text-sm"
                />
              </div>
            </div>

            <div className="w-1/3 pl-6">
              <div className="border rounded">
                <div className="h-12 flex gap-3 items-center bg-gray-200 px-4">
                  <span className="font-semibold">Balance as of</span>
                  <IconInput
                    className={"mt-4"}
                    width={140}
                    type="date"
                    name="balanceDate"
                    disabled
                    onBlur={handleBlur}
                    value={new Date(Date.now()).toISOString().split("T")[0]}
                    error={errors.balanceDate && touched.balanceDate}
                  />
                </div>
                <ul className="px-6 py-2">
                  {timeOffDetails?.map((item, index) => {
                    return (
                      <li className="flex flex-col pb-3" key={item?.leaveId}>
                        <span className="font-medium text-[15px]">
                          {item?.leaveName}
                        </span>
                        <span className="text-xs text-gray-500">
                          {item?.leaveTotalTime === 0
                            ? "N/A"
                            : item?.leaveRemainingTime}{" "}
                          hours available
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          <div className="-ms-8 px-10 flex items-center mt-6 fixed bottom-0 h-20 bg-white border-t border-gray-200 w-full">
            <button
              type="submit"
              className="bg-green1 text-white rounded-sm mr-4 h-10 px-4 font-medium"
            >
              Send Request
            </button>
            <button
              type="button"
              className="text-danger"
              onClick={() => navigate(`/${companyDomain}/home`)}
            >
              Cancel
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default RequestTimeOffPage;
