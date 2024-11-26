import React, { useEffect, useState } from "react";
import { FaFile, FaFilePdf } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { hideLoading, showLoading } from "../../store/slices/loadingSlice";
import { getAllFiles } from "../../store";
import FileCard from "../../components/Cards/FileCard";

const FilesPage = () => {
  const dispatch = useDispatch();
  const companyId = useSelector(
    (state) => state?.auth?.selectedCompany?.company?._id
  );
  //   const { employeeId } = useParams();
  const folderofFiles = useSelector((state) => state?.document?.files);

  console.log(folderofFiles);
  //   const [searchQuery, setSearchQuery] = useState("");

  //   const [folderofFiles, setFolderofFiles] = useState(null);
  //   const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchFiles = async () => {
    try {
      dispatch(showLoading());
      await dispatch(getAllFiles({ companyId }));
    } catch (error) {
    } finally {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [companyId]);

  return (
    <div className="mt-24 px-10 min-h-screen">
      <div className="flex gap-3 mb-5">
        <FaFilePdf size={30} className="text-green1" />
        <h1 className="text-3xl font-semibold text-green1">Files</h1>
      </div>
      <div className="my-10">
        {folderofFiles?.length > 0 ? (
          <div className="flex flex-wrap gap-8 lg:px-24 ">
            {folderofFiles?.map((folder) =>
              folder?.files?.map((file) => (
                <>
                  <FileCard
                    showCreator={true}
                    key={file._id}
                    file={file}
                    onDelete={() => {
                      // handleDeleteFile(file._id);
                    }}
                    onClick={() => {
                      window.open(file.url, "_blank");
                    }}
                  />
                </>
              ))
            )}
          </div>
        ) : (
          <div className="flex justify-center py-36">
            <span>No File found</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilesPage;
