import React, { useEffect, useState } from "react";
import { FaBriefcase } from "react-icons/fa6";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import EmployeeDetailTable from "../../components/Tables/EmployeeDetailTable";
import Modal from "../../components/Modals/Modal";
import { toast } from "react-toastify";
import { deleteTimeOffRequest, getTimeOffRequests } from "../../store";
import TimeOffTable from "../../components/Tables/TimeOffTable";
import { FaRegCalendarAlt } from "react-icons/fa";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { hideLoading, showLoading } from "../../store/slices/loadingSlice";

const timeOffHeadings = [
  "Leave Type",
  "From Date",
  "To Date",
  "Hours Per Day",
  "Total Hours",
  "Note",
  "Status",
];

const TimeOffPage = () => {
  const [scheduledList, setScheduledList] = useState([]);
  const [historyList, setHistoryList] = useState([]);

  const dispatch = useDispatch();
  const companyId = useSelector(
    (state) => state?.auth?.selectedCompany?.company?._id
  );
  const { employeeId } = useParams();
  const timeOffList = useSelector(
    (state) => state?.timeOff?.timeOffRequestHistory
  );

  console.log("timeOffList", timeOffList);

  const fetchTimeOffHistory = async () => {
    try {
      dispatch(showLoading());
      await dispatch(
        getTimeOffRequests({
          companyId,
          employeeId,
        })
      );
    } catch (error) {
    } finally {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    fetchTimeOffHistory();
  }, [companyId, employeeId]);

  useEffect(() => {
    if (timeOffList) {
      const today = new Date();

      const transformedHolidays =
        timeOffList?.holidayList?.map((holiday) => ({
          leaveType: { name: "Holiday" },
          startDate: holiday.date,
          endDate: holiday.date,
          hoursPerDay: [{ date: holiday.date, hours: 8 }],
          note: holiday.description || "",
          status: "Approved",
        })) || [];

      const pastHolidays = transformedHolidays.filter(
        (holiday) => new Date(holiday.startDate) < today
      );

      console.log(pastHolidays, "Past holidays");

      setHistoryList((prev) => [ ...(timeOffList?.history || []), ...pastHolidays]);

      const upcomingHolidays = transformedHolidays.filter(
        (holiday) => new Date(holiday.startDate) >= today
      );
      setScheduledList([
        ...(timeOffList?.scheduled || []),
        ...upcomingHolidays,
      ]);
    }
  }, [timeOffList]);

  const initialValues = {
    leaveType: "",
    fromDate: "",
    toDate: "",
    totalHours: "",
    note: "",
    status: "Pending",
  };

  const validationSchema = Yup.object({
    leaveType: Yup.string().required("Required"),
    fromDate: Yup.date().required("Required"),
    toDate: Yup.date().required("Required"),
    totalHours: Yup.number().required("Required").min(1, "Minimum 1 hour"),
    note: Yup.string(),
    status: Yup.string().oneOf(["Pending", "Approved", "Denied"]).required(),
  });

  const handleCancelRequest = async (requestId) => {
    const response = await dispatch(
      deleteTimeOffRequest({ companyId, employeeId, requestId })
    );

    if (response?.payload?.success) {
      toast.success(response?.payload?.message);
      fetchTimeOffHistory();
    }
  };

  return (
    <div className="py-5 px-10">
      <div className="flex flex-col gap-3 py-3">
        <div className="flex gap-3 border-b border-gray-400 mb-2">
          <FaRegCalendarAlt size={22} color="green" />
          <h2 className="text-lg font-semibold mb-4">Time Off</h2>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={(values) => handleSave(values, "timeOffRequests")}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form>
              <div className="flex justify-between items-center pt-5 mb-5">
                <div className="flex gap-3">
                  <RiCalendarScheduleFill size={22} color="green" />
                  <h2 className="text-lg font-semibold">Scheduled Time Offs</h2>
                </div>
              </div>
              <TimeOffTable
                headings={timeOffHeadings}
                list={scheduledList || []}
                allowDelete={true && timeOffList?.isAllowedToDelete}
                onDelete={handleCancelRequest}
              />
              <div className="flex justify-between items-center border-t border-gray-400 my-5 pt-5">
                <div className="flex gap-3">
                  <FaRegCalendarAlt size={22} color="green" />
                  <h2 className="text-lg font-semibold">Time Off History</h2>
                </div>
              </div>
              <TimeOffTable
                headings={timeOffHeadings}
                list={historyList || []}
              />
            </Form>
          )}
        </Formik>
        <div className="mb-6"></div>
      </div>
    </div>
  );
};

export default TimeOffPage;
