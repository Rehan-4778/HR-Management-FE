import React, { useEffect } from "react";
import { BsCup } from "react-icons/bs";
import { GoClock } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { getWorkLog, uploadTimeLog } from "../../store";
import { toast } from "react-toastify";

const ClockInOutCard = () => {
  const dispatch = useDispatch();
  const companyId = useSelector(
    (state) => state?.auth?.selectedCompany?.company?._id
  );
  const employeeId = useSelector(
    (state) => state?.auth?.selectedCompany?.profile?.employeeId
  );
  const workLogs = useSelector((state) => state?.timeLog?.timeLogs);

  const handleTimeAction = async (action) => {
    const response = await dispatch(
      uploadTimeLog({ action, companyId, employeeId })
    );

    if (response.payload.success) {
      dispatch(getWorkLog({ companyId, employeeId }));

      switch (action) {
        case "clock-in":
          toast.success("Clocked In");
          break;
        case "clock-out":
          toast.success("Clocked Out");
          break;

        case "start-break":
          toast.success("Break Started");
          break;

        case "end-break":
          toast.success("Break End");
          break;

        default:
          break;
      }
    }
  };

  const formatTime = (time) => {
    if (!time) {
      return "--:--";
    } else {
      let newTime = new Date(time);
      const hours = newTime.getHours().toString().padStart(2, "0");
      const minutes = newTime.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    }
  };

  const convertToHoursMinutes = (milliseconds) => {
    if (!milliseconds) {
      return "--:--";
    }

    const totalMinutes = Math.floor(milliseconds / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}:${minutes.toString().padStart(2, "0")}`;
  };

  const workMilliseconds = 677661;
  const workTime = convertToHoursMinutes(workMilliseconds);
  console.log(workTime);

  useEffect(() => {
    dispatch(getWorkLog({ companyId, employeeId }));
  }, [companyId, employeeId, dispatch]);

  console.log("workLogs", workLogs);

  return (
    <div className="bg-white rounded-lg shadow-md p-1 pb-5">
      <div className="flex justify-between items-center py-2 px-6 rounded-tr-md rounded-tl-md bg-gray-100">
        <h2 className="text-lg font-semibold text-green1">Clock In/Out</h2>
      </div>
      <div className="grid grid-cols-12 px-3">
        <div className="col-span-6 text-center mt-2 border-r-[1.5px] border-gray-200 me-5">
          <div className="mb-3">
            <h2 className="text-md font-medium text-black">Day total</h2>
            <p className="text-md font-bold text-black">
              {convertToHoursMinutes(
                workLogs?.daily?.break + workLogs?.daily?.work
              )}
            </p>
            <div className="">
              <span className="text-xs font-medium text-gray-500">Break: </span>
              <span className="text-xs font-semibold text-gray-500">
                {convertToHoursMinutes(workLogs?.daily?.break)}
              </span>
            </div>
            <div className="">
              <span className="text-xs font-medium text-gray-500">Work: </span>
              <span className="text-xs font-semibold text-gray-500">
                {convertToHoursMinutes(workLogs?.daily?.work)}
              </span>
            </div>
          </div>
          <div className="">
            <h2 className="text-md font-medium text-black">Week total</h2>
            <p className="text-md font-bold text-black">
              {convertToHoursMinutes(
                workLogs?.weekly?.break + workLogs?.weekly?.work
              )}
            </p>
            <div className="">
              <span className="text-xs font-medium text-gray-500">Break: </span>
              <span className="text-xs font-semibold text-gray-500">
                {convertToHoursMinutes(workLogs?.weekly?.break)}
              </span>
            </div>
            <div className="">
              <span className="text-xs font-medium text-gray-500">Work: </span>
              <span className="text-xs font-semibold text-gray-500">
                {convertToHoursMinutes(workLogs?.weekly?.work)}
              </span>
            </div>
          </div>
        </div>

        <div className="col-span-6 flex flex-col justify-between">
          <div className="mt-2">
            <h2 className="text-md font-medium text-black">Today</h2>
            <div className="flex justify-between items-center">
              <div className="flex flex-col items-start">
                <span className="text-xs font-medium text-gray-500">
                  Clock in
                </span>
                <span className="text-xs font-semibold text-gray-500">
                  {formatTime(workLogs?.currentWorkLog?.clockIn)}
                </span>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-xs font-medium text-gray-500">
                  Clock out
                </span>
                <span className="text-xs font-semibold text-gray-500">
                  {formatTime(workLogs?.currentWorkLog?.clockOut)}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center my-1">
              <div className="flex flex-col items-start">
                <span className="text-xs font-medium text-gray-500">
                  Start break
                </span>
                <span className="text-xs font-semibold text-gray-500">
                  {formatTime(workLogs?.currentWorkLog?.breakStart)}
                </span>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-xs font-medium text-gray-500">
                  End break
                </span>
                <span className="text-xs font-semibold text-gray-500">
                  {formatTime(workLogs?.currentWorkLog?.breakEnd)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-center">
            {!workLogs?.currentWorkLog || workLogs?.currentWorkLog.clockOut ? (
              <button
                className="bg-green2 py-2 w-[95%] rounded-sm flex justify-center items-center"
                onClick={() => handleTimeAction("clock-in")}
              >
                <GoClock size={26} className="text-white mr-2" />
                <span className="text-white">Clock in</span>
              </button>
            ) : (
              <button
                className="bg-green2 py-2 w-[95%] rounded-sm flex justify-center items-center"
                onClick={() => handleTimeAction("clock-out")}
              >
                <GoClock size={26} className="text-white mr-2" />
                <span className="text-white">Clock out</span>
              </button>
            )}

            {workLogs?.currentWorkLog &&
            workLogs?.currentWorkLog.clockIn &&
            (!workLogs?.currentWorkLog.breakStart ||
              workLogs?.currentWorkLog.breakEnd) ? (
              <button
                className="bg-orange-500 py-2 w-[95%] rounded-sm flex justify-center items-center"
                onClick={() => handleTimeAction("start-break")}
                disabled={!workLogs?.currentWorkLog?.clockIn}
              >
                <BsCup size={26} className="text-white mr-2" />
                <span className="text-white">Start break</span>
              </button>
            ) : (
              <button
                className="bg-orange-500 py-2 w-[95%] rounded-sm flex justify-center items-center"
                onClick={() => handleTimeAction("end-break")}
              >
                <BsCup size={26} className="text-white mr-2" />
                <span className="text-white">End break</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClockInOutCard;
