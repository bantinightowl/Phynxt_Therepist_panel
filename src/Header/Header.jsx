

// second version

import React, { useEffect, useState } from "react";
import { FaUserCircle, FaBell, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile/Profile";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import socket from "../socket";
import { useSelector, useDispatch } from "react-redux";
import { clearNotifications, markAsRead } from "../redux/notificationSlice";
import { TailSpin, ThreeDots } from "react-loader-spinner";
import ProfileModel from "../Component/ProfileModel/ProfileModel";
import Modal from "../Component/Modal";

const Header = () => {
  const notifications = useSelector((state) => state.notification.list);

  const [isUserPopupVisible, setIsUserPopupVisible] = useState(false);
  const [isNotificationPopupVisible, setIsNotificationPopupVisible] =
    useState(false);
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);

  const [profilePic, setProfilePic] = useState(
    "https://via.placeholder.com/150"
  );
  const [profileName, setProfileName] = useState("Physiotherepist");
  const [collegeName, setCollegeName] = useState("");
  const navigate = useNavigate();
  const authToken = Cookies.get("authToken");
  const dispatch = useDispatch();
  const [profile, setProfile] = useState({});
  const [loader, setLoading] = useState(false);
  const [about, setAbout] = useState("");
  const [experience, setExperience] = useState("");
  const [position, setPosition] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  console.log("College Name: ", collegeName);

  const fetchProfileDataTest = async () => {
    const token = Cookies.get("accessToken");
    if (!token) {
      toast.error("You are not logged in. Please log in.", {
        position: "top-right",
      });
      navigate("/login");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        "https://physiotherapy-1.onrender.com/apis/physiotherapistAuth/getSinglePhysiotherapy",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log("allProfile", data.data);
      if (data.success) {
        setProfile(data.data);
        // console.log("First Name:", data.data.physiotherapistId.firstName);
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong. Please try again.", {
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProfileDataTest();
  }, []);

  const toggleUserPopup = () => {
    setAbout(profile.about || "");
    setExperience(profile.experience || "");
    setPosition(profile.position || "");
    setProfileImage(profile.profileImage || "");
    setIsUserPopupVisible(!isUserPopupVisible);
    setIsNotificationPopupVisible(false);
  };

  const toggleNotificationPopup = () => {
    setIsNotificationPopupVisible(!isNotificationPopupVisible);
    setIsUserPopupVisible(false);
  };

  const handleLogout = () => {
    Cookies.remove("authToken", { path: "/" });
    localStorage.removeItem("userId");
    socket.disconnect();
    toast.success("Logout successful! Redirecting...", {
      position: "top-right",
    });
    setTimeout(() => navigate("/login"), 2000);
  };

  const handleSaveProfileChanges = (newProfilePic, newProfileName) => {
    setProfilePic(newProfilePic);
    setProfileName(newProfileName);
    setIsProfileModalVisible(false);
    toast.success("Profile updated successfully");
  };

  const handleProfile = () => {
    setIsProfileModalVisible(true);
    setIsUserPopupVisible(false);
  };

  // ✅ Rename to avoid conflict with the Redux action
  const handleClearNotifications = () => {
    dispatch(clearNotifications()); // This now correctly refers to the Redux action
    toast.info("All notifications cleared");
  };

  const closeProfileModal = () => {
    setIsProfileModalVisible(false);
  };

  const handleSeeAllNotifications = () => {
    navigate("/notifications");
  };

  const handleNotificationClick = (notification) => {
    // Mark as read
    dispatch(markAsRead(notification._id));

    if (notification.type === "appointment" && notification.appointmentId) {
      navigate(`/appointments?appointmentId=${notification.appointmentId}`);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const token = Cookies.get("accessToken");
    if (!token) {
      toast.error("You are not logged in. Please log in.");
      return;
    }

    const formData = new FormData();
    if (profileImage instanceof File) {
      formData.append("profileImage", profileImage);
    }
    formData.append("about", about);
    formData.append("position", position);
    formData.append("experience", experience);
    setBtnLoading(true);
    try {
      const response = await fetch(
        "https://physiotherapy-1.onrender.com/apis/physiotherapistProfile/updateProfile",
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();
      if (data.success) {
        toast.success("Profile updated successfully");
        setIsProfileModalVisible(false);
        fetchProfileDataTest(); // Refresh profile
        setBtnLoading(false);
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (error) {
      toast.error("Error uploading profile. Check network and try again.");
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <>
      {/* <header className="bg-gradient-to-r from-blue-700 to-indigo-900 text-white p-4 flex justify-between items-center shadow-xl"> */}
      <header className="bg-[#0B1B33] text-white p-4 flex justify-between items-center shadow-xl">
        <ToastContainer />
        <div className="flex justify-between  w-full pl-8">
          <h1 className="text-3xl font-bold underline">{collegeName}</h1>
          <div className="flex items-center space-x-6">
            <div className="relative group">
              <button
                onClick={toggleNotificationPopup}
                className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200 relative"
              >
                <FaBell className="text-xl" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 rounded-full">
                    {notifications.length}
                  </span>
                )}
              </button>
              {isNotificationPopupVisible && (
                <div
                  className={`
      fixed z-50
      sm:absolute
      mt-24
      left-1/2 sm:top-auto sm:left-auto sm:right-4 sm:mt-2
      transform -translate-x-1/2 -translate-y-1/2 sm:translate-x-0 sm:translate-y-0
      bg-white text-gray-800 p-4 rounded-xl shadow-2xl
      w-[90%] max-w-sm sm:w-72
      transition-all duration-200
    `}
                >
                  <div className="flex justify-between items-center mb-4 border-b pb-2">
                    <h3 className="font-bold text-lg text-blue-700">
                      Notifications
                    </h3>
                    <button
                      onClick={handleClearNotifications}
                      className="text-sm text-red-500 hover:text-red-700 transition-colors"
                    >
                      Clear All
                    </button>
                  </div>

                  <ul className="max-h-60 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <>
                        <li className="text-gray-500 text-center py-4">
                          No new notifications
                        </li>
                        <li className="mt-3 text-center">
                          <button
                            onClick={handleSeeAllNotifications}
                            className="text-blue-500 hover:text-blue-700 text-sm font-medium"
                          >
                            View All Previous Notifications →
                          </button>
                        </li>
                      </>
                    ) : (
                      <>
                        {notifications
                          .slice(0, 5)
                          .map((notification, index) => (
                            <li
                              key={index}
                              onClick={() =>
                                handleNotificationClick(notification)
                              }
                              className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer text-sm"
                            >
                              <span className="mr-2 text-blue-500">•</span>
                              {notification.message}
                              <p className="text-xs text-gray-400 mt-1">
                                {new Date(
                                  notification.createdAt
                                ).toLocaleString()}
                              </p>
                            </li>
                          ))}
                        <li className="mt-3 text-center">
                          <button
                            onClick={handleSeeAllNotifications}
                            className="text-blue-500 hover:text-blue-700 text-sm font-medium"
                          >
                            View All Notifications →
                          </button>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              )}
            </div>
            <div className="relative group">
              <button
                onClick={toggleUserPopup}
                className="flex items-center space-x-2 p-2 rounded-full hover:bg-white/10 transition-colors duration-200"
              >
                <img
                  src={profile?.profile?.profileImage}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover border-2 border-white"
                />
                <span className="font-medium"> {profile?.firstName}</span>
              </button>

              {isUserPopupVisible && (
                <div
                  className={`
      fixed z-50
      sm:absolute
      mt-36
      left-1/2 sm:top-auto sm:left-auto sm:right-4 sm:mt-2
      transform -translate-x-1/2 -translate-y-1/2 sm:translate-x-0 sm:translate-y-0
      bg-white text-gray-800 p-4 rounded-xl shadow-2xl
      w-[90%] max-w-sm sm:w-72
      transition-all duration-200
    `}
                >
                  <div className="text-center mb-4">
                    <img
                      src={profile?.profile?.profileImage}
                      alt="Profile"
                      className="w-16 h-16 rounded-full object-cover mx-auto border-4 border-blue-100 mb-3"
                    />
                    <h4 className="font-bold text-lg">{profile?.firstName}</h4>

                    <p className="text-sm text-gray-500">Administrator</p>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={handleProfile}
                      className="w-full p-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors flex items-center justify-center"
                    >
                      <FaUserCircle className="mr-2" />
                      Edit Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full p-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-colors flex items-center justify-center"
                    >
                      <FaSignOutAlt className="mr-2" />
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Profile Modal */}
      {isProfileModalVisible && (
        <Modal
          isOpen={isProfileModalVisible}
          onClose={closeProfileModal}
          title="Edit Profile"
        >
           <ProfileModel
              profile={profile}
              fetchProfileDataTest={fetchProfileDataTest}
            />
        </Modal>
      )}
    </>
  );
};

export default Header;
