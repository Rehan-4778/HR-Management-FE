import React, { useEffect, useState } from "react";
import { FaClock } from "react-icons/fa6";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import TimeLogTable from "../../components/Tables/TimeLogTable";
import { BsClockHistory } from "react-icons/bs";
import { getTimeLogs } from "../../store";
import { hideLoading, showLoading } from "../../store/slices/loadingSlice";

const clockInOutHeadings = [
  "Date",
  "Clock In",
  "Start Break",
  "End Break",
  "Clock Out",
  "Total Working Hours",
];

const ClockInOutPage = () => {
  const dispatch = useDispatch();
  const companyId = useSelector(
    (state) => state?.auth?.selectedCompany?.company?._id
  );
  const { employeeId } = useParams();
  const clockInOutList = useSelector((state) => state?.timeLog?.timeLogsList);

  console.log("clockInOutList", clockInOutList);

  const fetchClockInOutHistory = async () => {
    try {
      dispatch(showLoading());
      await dispatch(
        getTimeLogs({
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
    fetchClockInOutHistory();
  }, [companyId, employeeId]);

  return (
    <div className="py-5 px-10">
      <div className="flex flex-col gap-3 py-3">
        <div className="flex gap-3 border-b border-gray-400 mb-2">
          <FaClock size={22} color="green" />
          <h2 className="text-lg font-semibold mb-4">Clock In and Out</h2>
        </div>
        <Formik initialValues={{}} onSubmit={() => {}}>
          {() => (
            <Form>
              <div className="flex justify-between items-center py-3">
                <div className="flex gap-3">
                  <BsClockHistory size={22} color="green" />
                  <h2 className="text-lg font-semibold">
                    Clock In/Out Records
                  </h2>
                </div>
              </div>
              <TimeLogTable
                headings={clockInOutHeadings}
                list={clockInOutList?.length ? clockInOutList : []}
              />
            </Form>
          )}
        </Formik>
        <div className="mb-6"></div>
      </div>
    </div>
  );
};

export default ClockInOutPage;
