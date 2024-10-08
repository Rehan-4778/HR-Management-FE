import React, { useState, useRef, useEffect } from "react";
import MyInfoNav from "../../components/Navbars/MyInfoNav";
import { Link, NavLink, useParams } from "react-router-dom";
import { FaGear, FaImage, FaPenNib, FaUpload } from "react-icons/fa6";
import { FaSave } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../Modals/Modal";
import RequestSignatureModal from "../Modals/RequestSignatureModal";
import { getSignableDocuments, requestSignature } from "../../store";
import { toast } from "react-toastify";

const MyInfoHeader = ({ companyDomain, onEditImage }) => {
  const userInfo = useSelector((state) => state?.employee?.userInfo);
  const [isProfilePicHovered, setIsProfilePicHovered] = useState(false);
  const fileRef = useRef(null);
  const selectedCompany = useSelector((state) => state.auth.selectedCompany);
  const [profilePic, setProfilePic] = useState(userInfo?.image);
  const [showModal, setShowModal] = useState(false);
  const { employeeId } = useParams();
  const dispatch = useDispatch();
  const signableDocs = useSelector(
    (state) => state?.employee?.signableDocuments
  );

  console.log(signableDocs);

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      onEditImage(file);
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const fetchSignableDocuments = async () => {
    try {
      const response = await dispatch(
        getSignableDocuments({
          companyId: selectedCompany?.company?._id,
          employeeId,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSignableDocuments();
  }, [employeeId]);

  useEffect(() => {
    setProfilePic(userInfo?.image);
  }, [userInfo]);

  const handleRequestSignature = async (item) => {
    const response = await dispatch(
      requestSignature({
        companyId: selectedCompany?.company?._id,
        employeeId,
        folderId: item.selectedFolder,
        fileId: item.selectedFile,
        message: item.message,
      })
    );

    if (response.payload.success) {
      toast.success("Signature request sent successfully");
    }
  };

  return (
    <div className="flex justify-between dashboard-home-page bg-gradient-to-r from-green2 to-green3 px-8  text-white shadow-md">
      <div className="w-1/5">
        {/* circle */}
        <div className="absolute ml-5 rounded-full w-48 h-48 border-[3px] my-8">
          <div
            className="absolute w-[100%] h-[100%]"
            onMouseEnter={() => setIsProfilePicHovered(true)}
            onMouseLeave={() => setIsProfilePicHovered(false)}
          >
            <img
              src={
                profilePic ||
                "https://static-00.iconduck.com/assets.00/profile-user-icon-512x512-nm62qfu0.png"
              }
              loading="lazy"
              alt="User"
              // reduce the quality of image
              quality="50"
              className="w-full h-full rounded-full object-cover"
            />

            {isProfilePicHovered && (
              <div
                className="absolute inset-0 bg-black opacity-70 rounded-full flex justify-center items-center cursor-pointer"
                onClick={() => fileRef.current.click()}
              >
                <FaUpload className="mb-2" />
              </div>
            )}
            <input
              type="file"
              className="hidden"
              ref={fileRef}
              onChange={handleProfilePicChange}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col w-4/5">
        <div className="flex-1 content-center">
          <div className="justify-between flex items-center">
            <div className="flex flex-col gap-3">
              <h2 className="text-3xl font-bold">
                {userInfo?.firstName + " " + userInfo?.lastName}
              </h2>
              <span className="font-medium">
                {userInfo?.jobInformation?.length > 0
                  ? userInfo?.jobInformation[0]?.jobTitle
                  : ""}
              </span>
            </div>
            <div className="flex space-x-4">
              {/* <Link
                className="btn-outline"
                to={`/${companyDomain}/request-change`}
              >
                Request a Change
              </Link> */}
              <button
                type="button"
                className="btn-outline"
                onClick={() => setShowModal(true)}
              >
                <FaPenNib className="mr-2" />
                Request Signature
              </button>
            </div>
          </div>
        </div>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <RequestSignatureModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            onRequest={(item) => handleRequestSignature(item)}
            list={signableDocs}
          />
        </Modal>

        <div className="flex content-end overflow-x-scroll scrollbar-hide">
          <MyInfoNav user={userInfo} />
        </div>
      </div>
    </div>
  );
};

export default MyInfoHeader;
