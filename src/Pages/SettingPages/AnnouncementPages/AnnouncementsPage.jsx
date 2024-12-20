import React, { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import AnnouncementTable from "../../../components/Tables/AnnouncementTable";
import Modal from "../../../components/Modals/Modal";
import AnnouncementModal from "../../../components/Modals/AnnouncementModal";
import { useDispatch, useSelector } from "react-redux";
import {
  addAnnouncement,
  deleteAnnouncement,
  getAnnouncements,
  updateAnnouncement,
} from "../../../store";
import { toast } from "react-toastify";

const AnnouncementsPage = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const headings = ["Date", "Title", "Description"];
  const [editAnnouncementItem, setEditAnnouncementItem] = useState(null);
  const companyId = useSelector(
    (state) => state?.auth?.selectedCompany?.company?._id
  );

  const announcements = useSelector((state) => state?.setting?.announcements);

  const handleEdit = (item) => {
    setEditAnnouncementItem(item);
    setIsModalOpen(true);
  };

  const fetchAnnouncements = async () => {
    await dispatch(getAnnouncements({ companyId }));
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleSave = async (values) => {
    const response = await dispatch(
      addAnnouncement({
        title: values.title,
        date: values.date,
        description: values.description,
        companyId,
      })
    );

    if (response.payload.success) {
      toast.success(response.payload.message);
      fetchAnnouncements();
    }
  };

  const handleEditAnnouncement = async (item) => {
    const response = await dispatch(
      updateAnnouncement({
        announcementId: editAnnouncementItem?._id,
        title: item.title,
        date: item?.date,
        description: item.description,
      })
    );

    if (response.payload.success) {
      toast.success(response.payload.message);
      fetchAnnouncements();
    }
  };

  const handleDelete = async (id) => {
    const response = await dispatch(deleteAnnouncement({ announcementId: id }));

    if (response.payload.success) {
      toast.success(response.payload.message);
      fetchAnnouncements();
    }
  };

  return (
    <div className="w-5/6 mx-auto my-5">
      <h1 className="text-xl mb-4 font-medium">Announcements</h1>
      <div className="mt-5">
        <div className="flex items-center justify-end">
          <button
            className="mb-5 border-[1.5px] border-green1 hover:bg-green1 hover:text-white px-4 h-[35px] text-green1 font-medium text-sm rounded-full flex justify-center items-center gap-1"
            onClick={() => {
              setEditAnnouncementItem(null);
              setIsModalOpen(true);
            }}
          >
            <FaPlusCircle size={14} />
            Add Announcement
          </button>
        </div>
        <div>
          <AnnouncementTable
            headings={headings}
            list={announcements || []}
            allowDelete={true}
            allowEdit={true}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <AnnouncementModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              announcement={editAnnouncementItem}
              onSave={handleSave}
              onEdit={handleEditAnnouncement}
            />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementsPage;
