// import React, { useState } from 'react';

// const ProfileModel = () => {
//   const [user, setUser] = useState({
//     name: 'Bharti Sharma',
//     email: 'bharti@example.com',
//     images: [
//       'https://via.placeholder.com/300',
//       'https://via.placeholder.com/301',
//       'https://via.placeholder.com/302',
//     ],
//     about: 'Passionate about building things.',
//     experience: '3 years',
//     position: 'Frontend Developer',
//     profileImage: 'https://via.placeholder.com/150',
//   });

//   const [isEditing, setIsEditing] = useState(false);
//   const [editData, setEditData] = useState({ ...user });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditData({ ...editData, [name]: value });
//   };

//   const handleSave = () => {
//     setUser({ ...user, ...editData });
//     setIsEditing(false);
//   };

//   const renderImages = () => {
//     if (user.images.length === 1) {
//       return <img src={user.images[0]} alt="Profile" className="rounded w-full max-h-[300px] object-cover" />;
//     }

//     return (
//       <div className="carousel space-x-4 flex overflow-x-auto snap-x">
//         {user.images.map((img, index) => (
//           <img
//             key={index}
//             src={img}
//             alt={`Profile ${index + 1}`}
//             className="rounded w-[300px] h-[200px] object-cover snap-center"
//           />
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div className="p-4 max-w-4xl mx-auto space-y-6">
//       <div className="text-xl font-bold">Profile</div>

//       <div className="space-y-4">
//         <div><strong>Name:</strong> {user.name}</div>
//         <div><strong>Email:</strong> {user.email}</div>

//         <div className="mt-4">{renderImages()}</div>

//         <div className="mt-4">
//           <strong>About:</strong> <p>{user.about}</p>
//         </div>
//         <div><strong>Experience:</strong> {user.experience}</div>
//         <div><strong>Position:</strong> {user.position}</div>
//         <div className="mt-2">
//           <img src={user.profileImage} alt="Profile Pic" className="w-24 h-24 rounded-full object-cover" />
//         </div>

//         <button
//           onClick={() => setIsEditing(true)}
//           className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
//         >
//           Edit
//         </button>
//       </div>

//       {/* MODAL */}
//       {isEditing && (
//         <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
//           <div className="bg-white p-4 sm:p-6 rounded-lg w-[90%] max-w-md sm:max-w-lg md:max-w-2xl max-h-[90vh] overflow-y-auto space-y-4">
//             <h2 className="text-xl font-bold">Edit Profile</h2>

//             <div>
//               <label className="block font-medium">About</label>
//               <textarea
//                 name="about"
//                 value={editData.about}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border rounded"
//               />
//             </div>

//             <div>
//               <label className="block font-medium">Experience</label>
//               <input
//                 name="experience"
//                 value={editData.experience}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border rounded"
//               />
//             </div>

//             <div>
//               <label className="block font-medium">Position</label>
//               <input
//                 name="position"
//                 value={editData.position}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border rounded"
//               />
//             </div>

//             <div>
//               <label className="block font-medium">Profile Image URL</label>
//               <input
//                 name="profileImage"
//                 value={editData.profileImage}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border rounded"
//               />
//             </div>

//             <div className="flex justify-end space-x-3 mt-4">
//               <button onClick={() => setIsEditing(false)} className="px-4 py-2 border rounded">
//                 Cancel
//               </button>
//               <button onClick={handleSave} className="bg-blue-700 text-white px-4 py-2 rounded">
//                 Save Changes
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfileModel;

// second version

// import React, { useState } from 'react';
// import { FaGreaterThan ,FaLessThan } from "react-icons/fa";

// const ProfileModel = () => {
//   const [user, setUser] = useState({
//     name: 'Bharti Sharma',
//     email: 'bharti@example.com',
//     images: [
//       '/assets/cer1.jpg',
//         '/assets/cer2.jpg',
//       'https://via.placeholder.com/301',
//       'https://via.placeholder.com/302',
//     ],
//     about: 'Passionate about building things.',
//     experience: '3 years',
//     position: 'Frontend Developer',
//     profileImage: 'https://via.placeholder.com/150',
//   });

//   const [isEditing, setIsEditing] = useState(false);
//   const [editData, setEditData] = useState({ ...user });
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditData({ ...editData, [name]: value });
//   };

//   const handleSave = () => {
//     setUser({ ...user, ...editData });
//     setIsEditing(false);
//   };

//   const handlePrev = () => {
//     setCurrentIndex((prev) =>
//       prev === 0 ? user.images.length - 1 : prev - 1
//     );
//   };

//   const handleNext = () => {
//     setCurrentIndex((prev) =>
//       prev === user.images.length - 1 ? 0 : prev + 1
//     );
//   };

//   const renderImages = () => {
//     if (user.images.length === 1) {
//       return (
//         <img
//           src={user.images[0]}
//           alt="Profile"
//           className="rounded-lg w-full max-h-[300px] object-cover shadow"
//         />
//       );
//     }

//     return (
//       <div className="relative w-full max-w-xl mx-auto">
//         {/* Image */}
//         <img
//           src={user.images[currentIndex]}
//           alt={`Slide ${currentIndex + 1}`}
//           className="rounded-lg w-full h-[300px] object-cover shadow-lg transition-all duration-500"
//         />

//         {/* Arrows */}
//         <button
//           onClick={handlePrev}
//           className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-black p-2 rounded-full shadow transition duration-200 text-xl"
//         >
        
// <FaLessThan /> 
//         </button>

//         <button
//           onClick={handleNext}
//           className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-black p-2 rounded-full shadow transition duration-200 text-xl"
//         >
//       <FaGreaterThan />
//         </button>

//         {/* Dots */}
//         <div className="flex justify-center mt-3 space-x-2">
//           {user.images.map((_, idx) => (
//             <div
//               key={idx}
//               className={`w-3 h-3 rounded-full ${
//                 idx === currentIndex ? 'bg-blue-700' : 'bg-gray-300'
//               }`}
//               onClick={() => setCurrentIndex(idx)}
//               style={{ cursor: 'pointer' }}
//             />
//           ))}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="p-4 max-w-4xl mx-auto space-y-6">
//       <div className="text-xl font-bold">Profile</div>

//       <div className="space-y-4">
//         <div><strong>Name:</strong> {user.name}</div>
//         <div><strong>Email:</strong> {user.email}</div>

//         <div className="mt-4">{renderImages()}</div>

//         <div className="mt-4">
//           <strong>About:</strong> <p>{user.about}</p>
//         </div>
//         <div><strong>Experience:</strong> {user.experience}</div>
//         <div><strong>Position:</strong> {user.position}</div>
//         <div className="mt-2">
//           <img src={user.profileImage} alt="Profile Pic" className="w-24 h-24 rounded-full object-cover border shadow" />
//         </div>

//         <button
//           onClick={() => setIsEditing(true)}
//           className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
//         >
//           Edit
//         </button>
//       </div>

//       {/* MODAL */}
//       {isEditing && (
//         <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
//           <div className="bg-white p-4 sm:p-6 rounded-lg w-[90%] max-w-md sm:max-w-lg md:max-w-2xl max-h-[90vh] overflow-y-auto space-y-4">
//             <h2 className="text-xl font-bold">Edit Profile</h2>

//             <div>
//               <label className="block font-medium">About</label>
//               <textarea
//                 name="about"
//                 value={editData.about}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border rounded"
//               />
//             </div>

//             <div>
//               <label className="block font-medium">Experience</label>
//               <input
//                 name="experience"
//                 value={editData.experience}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border rounded"
//               />
//             </div>

//             <div>
//               <label className="block font-medium">Position</label>
//               <input
//                 name="position"
//                 value={editData.position}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border rounded"
//               />
//             </div>

//             <div>
//               <label className="block font-medium">Profile Image URL</label>
//               <input

//                 name="profileImage"
//                 value={editData.profileImage}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border rounded"
//               />
//             </div>

//             <div className="flex justify-end space-x-3 mt-4">
//               <button onClick={() => setIsEditing(false)} className="px-4 py-2 border rounded">
//                 Cancel
//               </button>
//               <button onClick={handleSave} className="bg-blue-700 text-white px-4 py-2 rounded">
//                 Save Changes
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfileModel;

// second version
// import React, { useState } from 'react';
// import { FaGreaterThan, FaLessThan } from 'react-icons/fa';

// const ProfileModel = ({profile ,handleUpdateProfile}) => {




// const [user, setUser] = useState({
//   ...profile,
//   images: profile?.certificate || []
// });


//   const [isEditing, setIsEditing] = useState(false);
//   const [editData, setEditData] = useState({ ...user });
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const handleInputChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === 'profileImage' && files.length > 0) {
//       const fileURL = URL.createObjectURL(files[0]);
//       setEditData({ ...editData, profileImage: fileURL });
//     } else {
//       setEditData({ ...editData, [name]: value });
//     }
//   };

//   const handleSave = () => {
//     setUser({ ...user, ...editData });
//     setIsEditing(false);
//   };

//   const handlePrev = () => {
//     setCurrentIndex((prev) =>
//       prev === 0 ? user.images.length - 1 : prev - 1
//     );
//   };

//   const handleNext = () => {
//     setCurrentIndex((prev) =>
//       prev === user.images.length - 1 ? 0 : prev + 1
//     );
//   };


  
//   const renderImages = () => {

//     console.log("user.images", user.images);

//     if (user.images.length === 1) {
//       return (
//         <img
//           src={user.images[0]}
//           alt="Profile"
//           className="rounded-lg w-full max-h-[300px] object-cover shadow"
//         />
//       );
//     }

//     return (
//       <div className="relative w-full max-w-xl mx-auto">
//         {/* Image */}
//         <img
//           src={user.images[currentIndex]}
//           alt={`Slide ${currentIndex + 1}`}
//           className="rounded-lg w-full h-[300px] object-cover shadow-lg transition-all duration-500"
//         />

//         {/* Arrows */}
//         <button
//           onClick={handlePrev}
//           className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-black p-2 rounded-full shadow transition duration-200 text-xl"
//         >
//           <FaLessThan />
//         </button>

//         <button
//           onClick={handleNext}
//           className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-black p-2 rounded-full shadow transition duration-200 text-xl"
//         >
//           <FaGreaterThan />
//         </button>

//         {/* Dots */}
//         <div className="flex justify-center mt-3 space-x-2">
//           {user.images.map((_, idx) => (
//             <div
//               key={idx}
//               className={`w-3 h-3 rounded-full ${
//                 idx === currentIndex ? 'bg-blue-700' : 'bg-gray-300'
//               }`}
//               onClick={() => setCurrentIndex(idx)}
//               style={{ cursor: 'pointer' }}
//             />
//           ))}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="p-4 max-w-4xl mx-auto space-y-6">
//       <div className="text-xl font-bold">Profile</div>

//       <div className="space-y-4">
//         <div><strong>Name:</strong> {user.
// firstName}
// </div>
//         <div><strong>Email:</strong> {user.email}</div>

//         <div className="mt-4">{renderImages()}</div>

//         <div className="mt-4">
//           <strong>About:</strong> <p>{user?.profile ?.about}</p>
//         </div>
//         <div><strong>Experience:</strong> {user?.profile?.experience}</div>
//         <div><strong>Position:</strong> {user?.profile?.position}</div>
//         <div className="mt-2">
//           <img
//             src={user?.profile?.profileImage}
//             alt="Profile Pic"
//             className="w-24 h-24 rounded-full object-cover border shadow"
//           />
//         </div>

//         <button
//           onClick={() => setIsEditing(true)}
//           className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
//         >
//           Edit
//         </button>
//       </div>

//       {/* MODAL */}
//       {isEditing && (
//         <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
//           <div className="bg-white p-4 sm:p-6 rounded-lg w-[90%] max-w-md sm:max-w-lg md:max-w-2xl max-h-[90vh] overflow-y-auto space-y-4">
//             <h2 className="text-xl font-bold">Edit Profile</h2>

//             <div>
//               <label className="block font-medium">About</label>
//               <textarea
//                 name="about"
//                 value={editData ?.profile ?.about}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border rounded"
//               />
//             </div>

//             <div>
//               <label className="block font-medium">Experience</label>
//               <input
//                 name="experience"
//                 value={editData?.profile?.experience}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border rounded"
//               />
//             </div>

//             <div>
//               <label className="block font-medium">Position</label>
//               <input
//                 name="position"
//                 value={editData?.profile?.position}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border rounded"
//               />
//             </div>

//             <div>
//               <label className="block font-medium">Upload Profile Image</label>
//               <input
//                 type="file"
//                 name="profileImage"
//                 accept="image/*"
//                 onChange={handleInputChange}
//                 className="w-full p-2 border rounded"
//               />
//               {editData.profileImage && (
//                 <img
//                   src={editData?.profile?.profileImage}
//                   alt="Preview"
//                   className="w-20 h-20 rounded-full mt-2 object-cover border"
//                 />
//               )}
//             </div>

//             <div className="flex justify-end space-x-3 mt-4">
//               <button onClick={() => setIsEditing(false)} className="px-4 py-2 border rounded">
//                 Cancel
//               </button>
//               <button onClick={handleSave} className="bg-blue-700 text-white px-4 py-2 rounded">
//                 Save Changes
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfileModel;


// second 

// import React, { useState } from "react";
// import Cookies from "js-cookie";

// import { FaGreaterThan, FaLessThan } from "react-icons/fa";

// import { ToastContainer, toast } from "react-toastify";

// const ProfileModel = ({ profile, fetchProfileDataTest }) => {
//   const [user, setUser] = useState({
//     ...profile,
//     images: profile?.certificate || [],
//   });

//   const [isEditing, setIsEditing] = useState(false);
//   const [editData, setEditData] = useState({
//     about: profile?.profile?.about || "",
//     experience: profile?.profile?.experience || "",
//     position: profile?.profile?.position || "",
//     profileImage: null,
//   });
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [btnLoading, setBtnLoading] = useState(false);
//   const [previewImage, setPreviewImage] = useState(
//     profile?.profile?.profileImage || ""
//   );

//   const handleInputChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "profileImage" && files.length > 0) {
//       const file = files[0];
//       setEditData((prev) => ({ ...prev, profileImage: file }));
//       setPreviewImage(URL.createObjectURL(file));
//     } else {
//       setEditData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleUpdateProfile = async () => {
//     const token = Cookies.get("accessToken");
//     if (!token) {
//       toast.error("You are not logged in. Please log in.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("about", editData.about);
//     formData.append("experience", editData.experience);
//     formData.append("position", editData.position);
//     if (editData.profileImage instanceof File) {
//       formData.append("profileImage", editData.profileImage);
//     }

//     setBtnLoading(true);

//     try {
//       const response = await fetch(
//         "https://physiotherapy-1.onrender.com/apis/physiotherapistProfile/updateProfile",
//         {
//           method: "PATCH",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           body: formData,
//         }
//       );

//       const data = await response.json();

//       if (data.success) {
//         toast.success("Profile updated successfully");
//         setIsEditing(false);
//         fetchProfileDataTest();
//       } else {
//         toast.error(data.message || "Failed to update profile.");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Something went wrong. Try again.");
//     } finally {
//       setBtnLoading(false);
//     }
//   };

//   const renderImages = () => {
//     if (user.images.length === 1) {
//       return (
//         <img
//           src={user.images[0]}
//           alt="Profile"
//           className="rounded-lg w-full max-h-[300px] object-cover shadow"
//         />
//       );
//     }

//     return (
//       <div className="relative w-full max-w-xl mx-auto">
//         <img
//           src={user.images[currentIndex]}
//           alt={`Slide ${currentIndex + 1}`}
//           className="rounded-lg w-full h-[300px] object-cover shadow-lg transition-all duration-500"
//         />

//         <button
//           onClick={() =>
//             setCurrentIndex((prev) =>
//               prev === 0 ? user.images.length - 1 : prev - 1
//             )
//           }
//           className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-black p-2 rounded-full shadow text-xl"
//         >
//           <FaLessThan />
//         </button>

//         <button
//           onClick={() =>
//             setCurrentIndex((prev) =>
//               prev === user.images.length - 1 ? 0 : prev + 1
//             )
//           }
//           className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-black p-2 rounded-full shadow text-xl"
//         >
//           <FaGreaterThan />
//         </button>

//         <div className="flex justify-center mt-3 space-x-2">
//           {user.images.map((_, idx) => (
//             <div
//               key={idx}
//               className={`w-3 h-3 rounded-full ${
//                 idx === currentIndex ? "bg-blue-700" : "bg-gray-300"
//               }`}
//               onClick={() => setCurrentIndex(idx)}
//               style={{ cursor: "pointer" }}
//             />
//           ))}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="p-4 max-w-4xl mx-auto space-y-6">
//       <div className="text-xl font-bold">Profile</div>

//       <div className="space-y-4">
//         <div>
//           <strong>Name:</strong> {user.firstName}
//         </div>
//         <div>
//           <strong>Email:</strong> {user.email}
//         </div>

//         <div className="mt-4">{renderImages()}</div>

//         <div className="mt-4">
//           <strong>About:</strong> <p>{user?.profile?.about}</p>
//         </div>
//         <div>
//           <strong>Experience:</strong> {user?.profile?.experience}
//         </div>
//         <div>
//           <strong>Position:</strong> {user?.profile?.position}
//         </div>
//         <div className="mt-2">
//           <img
//             src={user?.profile?.profileImage}
//             alt="Profile Pic"
//             className="w-24 h-24 rounded-full object-cover border shadow"
//           />
//         </div>

//         <button
//           onClick={() => setIsEditing(true)}
//           className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
//         >
//           Edit
//         </button>
//       </div>

//       {isEditing && (
//         <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
//           <div className="bg-white p-6 rounded-lg w-full max-w-2xl space-y-4 max-h-[90vh] overflow-y-auto">
//             <h2 className="text-xl font-bold">Edit Profile</h2>

//             <div>
//               <label className="block font-medium">About</label>
//               <textarea
//                 name="about"
//                 value={editData.about}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border rounded"
//               />
//             </div>

//             <div>
//               <label className="block font-medium">Experience</label>
//               <input
//                 name="experience"
//                 value={editData.experience}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border rounded"
//               />
//             </div>

//             <div>
//               <label className="block font-medium">Position</label>
//               <input
//                 name="position"
//                 value={editData.position}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border rounded"
//               />
//             </div>

//             <div>
//               <label className="block font-medium">Upload Profile Image</label>
//               <input
//                 type="file"
//                 name="profileImage"
//                 accept="image/*"
//                 onChange={handleInputChange}
//                 className="w-full p-2 border rounded"
//               />
//               {previewImage && (
//                 <img
//                   src={previewImage}
//                   alt="Preview"
//                   className="w-20 h-20 rounded-full mt-2 object-cover border"
//                 />
//               )}
//             </div>

//             <div className="flex justify-end space-x-3">
//               <button
//                 onClick={() => setIsEditing(false)}
//                 className="px-4 py-2 border rounded"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleUpdateProfile}
//                 className="bg-blue-700 text-white px-4 py-2 rounded"
//                 disabled={btnLoading}
//               >
//                 {btnLoading ? "Saving..." : "Save Changes"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfileModel;

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

//   useEffect(() => {
//   setUser({
//     ...profile,
//     images: profile?.certificate || [],
//   });

//   setEditData({
//     about: profile?.profile?.about || "",
//     experience: profile?.profile?.experience || "",
//     position: profile?.profile?.position || "",
//     profileImage: null,
//   });

//   setPreviewImage(profile?.profile?.profileImage || "");
// }, [refreshTrigger]);


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
    <div className="p-4 max-w-4xl mx-auto space-y-6">
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
