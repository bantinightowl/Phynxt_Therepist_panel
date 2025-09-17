
import React, { useState , useEffect } from "react";
import Cookies from "js-cookie";
import { FaGreaterThan, FaLessThan } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

const ProfileModel = ({ profile, fetchProfileDataTest }) => {
  const [user, setUser] = useState({
    ...profile,
    images: profile?.certificate || [],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    about: profile?.profile?.about || "",
    experience: profile?.profile?.experience || "",
    position: profile?.profile?.position || "",
    profileImage: null,
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [btnLoading, setBtnLoading] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const [previewImage, setPreviewImage] = useState(
    profile?.profile?.profileImage || ""
  );


// In ProfileModel.js
useEffect(() => {
  setUser({
    ...profile,
    images: profile?.certificate || [],
  });
  setEditData({
    about: profile?.profile?.about || "",
    experience: profile?.profile?.experience || "",
    position: profile?.profile?.position || "",
    profileImage: null,
  });
  setPreviewImage(profile?.profile?.profileImage || "");
}, [profile]); // Add profile as dependency


  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profileImage" && files.length > 0) {
      const file = files[0];
      setEditData((prev) => ({ ...prev, profileImage: file }));
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setEditData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdateProfile = async () => {
    const token = Cookies.get("accessToken");
    if (!token) {
      toast.error("You are not logged in. Please log in.");
      return;
    }

    const formData = new FormData();
    formData.append("about", editData.about);
    formData.append("experience", editData.experience);
    formData.append("position", editData.position);
    if (editData.profileImage instanceof File) {
      formData.append("profileImage", editData.profileImage);
    }

    setBtnLoading(true);

    const isNewProfile = !profile?.profile;

    const url = isNewProfile
      ? "https://physiotherapy-1.onrender.com/apis/physiotherapistProfile/uploadProfileImage"
      : "https://physiotherapy-1.onrender.com/apis/physiotherapistProfile/updateProfile";

    const method = isNewProfile ? "POST" : "PATCH";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        toast.success(
          isNewProfile
            ? "Profile created successfully!"
            : "Profile updated successfully!"
        );
        setIsEditing(false);
        setRefreshTrigger(prev => prev + 1); 
      } else {
        toast.error(data.message || "Operation failed.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Try again.");
    } finally {
      setBtnLoading(false);
      fetchProfileDataTest()
    }
  };

  const renderImages = () => {
    if (user.images.length === 1) {
      return (
        <img
          src={user.images[0]}
          alt="Profile"
          className="rounded-lg w-full max-h-[300px] object-cover shadow"
        />
      );
    }

    return (
      <div className="relative w-full max-w-xl mx-auto">
        <img
          src={user.images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="rounded-lg w-full h-[300px] object-cover shadow-lg transition-all duration-500"
        />

        <button
          onClick={() =>
            setCurrentIndex((prev) =>
              prev === 0 ? user.images.length - 1 : prev - 1
            )
          }
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-black p-2 rounded-full shadow text-xl"
        >
          <FaLessThan />
        </button>

        <button
          onClick={() =>
            setCurrentIndex((prev) =>
              prev === user.images.length - 1 ? 0 : prev + 1
            )
          }
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-black p-2 rounded-full shadow text-xl"
        >
          <FaGreaterThan />
        </button>

        <div className="flex justify-center mt-3 space-x-2">
          {user.images.map((_, idx) => (
            <div
              key={idx}
              className={`w-3 h-3 rounded-full ${
                idx === currentIndex ? "bg-blue-700" : "bg-gray-300"
              }`}
              onClick={() => setCurrentIndex(idx)}
              style={{ cursor: "pointer" }}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 max-w-6xl mx-auto space-y-6">
      <div className="text-xl font-bold">Profile</div>

      <div className="space-y-4">
        <div>
          <strong>Name:</strong> {user.firstName}
        </div>
        <div>
          <strong>Email:</strong> {user.email}
        </div>

        <div className="mt-4">{renderImages()}</div>

        <div className="mt-4">
          <strong>About:</strong> <p>{user?.profile?.about || "N/A"}</p>
        </div>
        <div>
          <strong>Experience:</strong> {user?.profile?.experience || "N/A"}
        </div>
        <div>
          <strong>Position:</strong> {user?.profile?.position || "N/A"}
        </div>
        <div className="mt-2">
          {user?.profile?.profileImage && (
            <img
              src={user?.profile?.profileImage}
              alt="Profile Pic"
              className="w-24 h-24 rounded-full object-cover border shadow"
            />
          )}
        </div>

        <button
          onClick={() => setIsEditing(true)}
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
        >
          {profile?.profile ? "Edit Profile" : "Complete Profile"}
        </button>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold">
              {profile?.profile ? "Edit Profile" : "Add Profile Info"}
            </h2>

            <div>
              <label className="block font-medium">About</label>
              <textarea
                name="about"
                value={editData.about}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block font-medium">Experience</label>
              <input
                name="experience"
                value={editData.experience}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block font-medium">Position</label>
              <input
                name="position"
                value={editData.position}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block font-medium">Upload Profile Image</label>
              <input
                type="file"
                name="profileImage"
                accept="image/*"
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-20 h-20 rounded-full mt-2 object-cover border"
                />
              )}
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateProfile}
                className="bg-blue-700 text-white px-4 py-2 rounded"
                disabled={btnLoading}
              >
                {btnLoading
                  ? "Saving..."
                  : profile?.profile
                  ? "Save Changes"
                  : "Create Profile"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileModel;
