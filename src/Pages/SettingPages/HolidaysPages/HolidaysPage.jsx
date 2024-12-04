import React, { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import HolidayTable from "../../../components/Tables/HolidayTable";
import Modal from "../../../components/Modals/Modal";
import HolidayModal from "../../../components/Modals/HolidayModal";
import { useDispatch, useSelector } from "react-redux";
import {
  addHoliday,
  deleteHoliday,
  getHolidays,
  updateHoliday,
} from "../../../store";
import { toast } from "react-toastify";

const HolidaysPage = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const headings = ["Holiday", "Date", "Description"];
  const [editHolidayItem, setEditHolidayItem] = useState(null);
  const companyId = useSelector(
    (state) => state?.auth?.selectedCompany?.company?._id
  );

  const holidays = useSelector((state) => state?.setting?.holidays);

  const handleEdit = (item) => {
    setEditHolidayItem(item);
    setIsModalOpen(true);
  };

  const fetchHolidays = async () => {
    await dispatch(getHolidays({ companyId }));
  };

  useEffect(() => {
    fetchHolidays();
  }, []);

  const handleSave = async (values) => {
    console.log(values);
    const response = await dispatch(
      addHoliday({
        name: values.holiday,
        date: values.date,
        description: values.description,
        companyId,
      })
    );

    if (response.payload.success) {
      console.log(response.payload);
      toast.success(response.payload.message);
      fetchHolidays();
    }
  };

  const handleEditHoliday = async (item) => {
    console.log(editHolidayItem);

    const response = await dispatch(
      updateHoliday({
        holidayId: editHolidayItem?._id,
        name: item.holiday,
        date: item?.date,
        description: item.description,
      })
    );

    if (response.payload.success) {
      toast.success(response.payload.message);
      fetchHolidays();
    }
  };

  const handleDelete = async (id) => {
    const response = await dispatch(deleteHoliday({ holidayId: id }));

    if (response.payload.success) {
      toast.success(response.payload.message);
      fetchHolidays();
    }
  };

  return (
    <div className="w-5/6 mx-auto my-5">
      <h1 className="text-xl mb-4 font-medium">Company Information</h1>
      <div className="mt-5">
        <div className="flex items-center justify-end">
          <button
            className="mb-5 border-[1.5px] border-green1 hover:bg-green1 hover:text-white px-4 h-[35px] text-green1 font-medium text-sm rounded-full flex justify-center items-center gap-1"
            onClick={() => {
              setEditHolidayItem(null);
              setIsModalOpen(true);
            }}
          >
            <FaPlusCircle size={14} />
            Add Holiday
          </button>
        </div>
        <div>
          <HolidayTable
            headings={headings}
            list={holidays || []}
            allowDelete={true}
            allowEdit={true}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <HolidayModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              holiday={editHolidayItem}
              onSave={handleSave}
              onEdit={handleEditHoliday}
            />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default HolidaysPage;
