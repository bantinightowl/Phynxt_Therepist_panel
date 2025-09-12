import React, { useState, useEffect } from 'react';

const Profile = ({ onSave }) => {
  const defaultProfilePic = 'path/to/default-profile-pic.jpg';
  const [profilePic, setProfilePic] = useState(defaultProfilePic);
  const [profileName, setProfileName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('');

  // Prefill on load
  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem('userProfile'));
    if (storedProfile) {
      setProfileName(`${storedProfile.firstName} ${storedProfile.lastName}`);
      setPhoneNumber(storedProfile.phone || '');
      setEmail(storedProfile.email || '');
      setService(storedProfile.service || '');
    }
  }, []);

  const handleChangePicture = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePic(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePicture = () => {
    setProfilePic(defaultProfilePic);
  };

  const handleSaveChanges = () => {
    onSave?.(profilePic);
  };

  return (
    <div className="flex flex-col justify-center items-center mt-8">
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={profilePic}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover"
        />
        <label className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
          Change Picture
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleChangePicture}
            className="hidden"
          />
        </label>
        <button
          onClick={handleRemovePicture}
          className="text-red-500 px-4 py-2 rounded border border-red-500"
        >
          Remove Picture
        </button>
      </div>

      <div className="flex flex-col space-y-4 w-full max-w-md">
        <input
          type="text"
          value={profileName}
          disabled
          className="px-4 py-2 border rounded w-full bg-gray-100 text-gray-700"
          placeholder="Profile Name"
        />
        <input
          type="tel"
          value={phoneNumber}
          disabled
          className="px-4 py-2 border rounded w-full bg-gray-100 text-gray-700"
          placeholder="Phone Number"
        />
        <input
          type="email"
          value={email}
          disabled
          className="px-4 py-2 border rounded w-full bg-gray-100 text-gray-700"
          placeholder="Email"
        />
        <input
          type="text"
          value={service}
          disabled
          className="px-4 py-2 border rounded w-full bg-gray-100 text-gray-700"
          placeholder="Service"
        />
      </div>

      <div className="flex justify-end w-full max-w-md mt-6">
        <button
          onClick={handleSaveChanges}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Profile;
