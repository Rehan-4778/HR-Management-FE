import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import FileUploadModal from "../../components/Modals/FileUploadModal";
import { Modal } from "@mui/material";
import FileCard from "../../components/Cards/FileCard";
import {
  deleteFile,
  getDocuments,
  getSignableDocuments,
  uploadFile,
} from "../../store";
import { hideLoading, showLoading } from "../../store/slices/loadingSlice";
import { toast } from "react-toastify";

const FilesPage = () => {
  const dispatch = useDispatch();
  const loc = useLocation();
  const isNavigatedFromNotification = loc?.state?.isNavigatedFromNotification;
  const folderId = loc?.state?.folderId;
  const companyId = useSelector(
    (state) => state?.auth?.selectedCompany?.company?._id
  );
  const { employeeId } = useParams();
  const documents = useSelector((state) => state?.document?.documents);
  const [searchQuery, setSearchQuery] = useState("");

  const [folder, setFolder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    if (isNavigatedFromNotification) {
      fetchDocuments();
    }
  }, [folderId, employeeId, companyId]);

  useEffect(() => {
    if (folderId && documents) {
      const foundFolder = documents.find(
        (document) => document._id === folderId
      );
      setFolder(foundFolder);
    }
  }, [folderId, documents]);

  const handleUploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("companyId", companyId);

    console.log(folderId);

    const response = await dispatch(
      uploadFile({ formData, employeeId, folderId })
    );
    if (response?.payload?.success) {
      toast.success("File uploaded successfully");
      fetchDocuments();
    }
  };

  const handleDeleteFile = async (fileId) => {
    const response = await dispatch(
      deleteFile({companyId, employeeId, folderId, fileId })
    );

    if (response?.payload?.success) {
      toast.success("File deleted successfully");
      fetchDocuments();
    }
  };

  const fetchSignableDocuments = async () => {
    try {
      const response = await dispatch(
        getSignableDocuments({
          companyId,
          employeeId,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSignableDocuments();
  }, [dispatch, employeeId]);

  // const filteredFiles = folder?.files?.filter((file) =>
  //   file?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  // );

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-secondary">Documents</h1>
      </div>
      <div className="flex justify-between mb-10">
        <button
          className="text-green1 font-semibold px-3 py-[1.5px] rounded-sm flex items-center text-sm border border-green1"
          onClick={() => setIsModalOpen(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Upload
        </button>
        <input
          type="text"
          placeholder="Search documents..."
          className="border border-gray-300 rounded text-sm px-3 py-[6px] outline-none focus:border-green1 focus:border-[1.25px]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div>
        {folder?.files?.length > 0 ? (
          <div className="flex gap-8">
            {folder?.files?.length > 0 ? (
              folder?.files?.map((file) => (
                <FileCard
                  key={file._id}
                  file={file}
                  onDelete={() => {
                    handleDeleteFile(file._id);
                  }}
                  onClick={() => {
                    window.open(file.url, "_blank");
                  }}
                />
              ))
            ) : (
              <div>
                <span className="text-center">No files found</span>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full h-screen flex flex-col items-center gap-3 mt-[20%]">
            <div>
              <h1 className="text-lg text-gray-600">No file uploaded yet</h1>
            </div>
            <div>
              <button
                className="text-green1 font-semibold px-5 py-1 text-center border border-green1"
                onClick={() => setIsModalOpen(true)}
              >
                Upload
              </button>
            </div>
          </div>
        )}
        <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <FileUploadModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={(file) => handleUploadFile(file)}
          />
        </Modal>
      </div>
    </div>
  );
};

export default FilesPage;
