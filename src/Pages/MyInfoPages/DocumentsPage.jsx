import React, { useEffect, useState } from "react";
import { FaFolder } from "react-icons/fa";
import { HiDownload, HiFolderAdd } from "react-icons/hi";
import Modal from "../../components/Modals/Modal";
import NewFolderModal from "../../components/Modals/NewFolderModal";
import { useDispatch, useSelector } from "react-redux";
import {
  createDocument,
  getDocuments,
} from "../../store/thunks/documentsThunk";
import { useNavigate, useParams } from "react-router-dom";
import FolderCard from "../../components/Cards/FolderCard";
import { hideLoading, showLoading } from "../../store/slices/loadingSlice";

const DocumentsPage = ({ folders }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { employeeId } = useParams();
  const companyId = useSelector(
    (state) => state?.auth?.selectedCompany?.company?._id
  );
  const documents = useSelector((state) => state?.document?.documents);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // get the url
  const url = window.location.pathname;

  const fetchDocuments = async () => {
    try {
      dispatch(showLoading());
      await dispatch(getDocuments({ employeeId, companyId }));
    } catch (error) {
    } finally {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [dispatch, employeeId, companyId]);

  const handleSave = (values) => {
    dispatch(
      createDocument({
        name: values.folderName,
        description: values.description,
        companyId,
        employeeId,
      })
    );
  };

  const handleFolderClick = (item) => {
    navigate(`${url}/${item.name} `, {
      state: { folderId: item?._id },
    });
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-black">Documents</h1>
      </div>
      <div className="flex justify-between space-x-2 border-b mb-10">
        <div className="flex gap-3 h-8">
          <button
            className="bg-gray-300 text-gray-700 px-3 py-1 rounded flex items-center"
            onClick={() => setIsModalOpen(true)}
          >
            <HiFolderAdd className="w-5 h-5" />
          </button>
        </div>
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Search documents..."
            className="border border-gray-300 rounded text-sm px-3 py-[6px] w-full"
          />
          <button className="border-gray-500 border px-3 py-1 rounded ml-2">
            <HiDownload className="w-4 h-4" />
          </button>
        </div>
      </div>
      <FolderCard
        folders={documents}
        onClick={(item) => handleFolderClick(item)}
      />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <NewFolderModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={(values) => handleSave(values)}
        />
      </Modal>
    </div>
  );
};

export default DocumentsPage;
