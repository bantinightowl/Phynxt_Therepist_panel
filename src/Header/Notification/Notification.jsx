// import React, { useState , useEffect } from 'react';
// import Sidebar from '../../Sidebar/Sidebar';
// import Header from '../Header';
// import Cookies from "js-cookie";
// import { RxCross2 } from "react-icons/rx";
// import { MdDelete } from "react-icons/md";
// import { ToastContainer, toast } from "react-toastify";
// import { useFetcher, useNavigate } from "react-router-dom";
// import { MdOutlineArrowDropDown } from "react-icons/md";

// const NotificationsPage = () => {
//   const [allNotifiction , setAllNotification] = useState([]);
//     const [expanded, setExpanded] = useState({});
//   const [loader, setLoading] = useState(false);

//  const navigate = useNavigate();

 

//   const fetchAllNotification = async () => {
//       const token = Cookies.get("accessToken");
//       if (!token) {
//         toast.error("You are not logged in. Please log in.", {
//           position: "top-right",
//         });
//         navigate("/login");
//         return;
//       }
//       setLoading(true);
//       try {
//         const response = await fetch(
//           "https://physiotherapy-1.onrender.com/apis/notification/getNotifications",
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         const data = await response.json();
//         console.log("allquestion", data?.data);
//         if (data.success) {
//           setAllNotification(data.data);
//         }
//       } catch (err) {
//         toast.error(err.message || "Something went wrong. Please try again.", {
//           position: "top-right",
//         });
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     useEffect(() => {
//       fetchAllNotification();
//     }, []);
  
  
//   const handleToggle = async (notifId, isRead) => {
//     setExpanded((prev) => ({
//       ...prev,
//       [notifId]: !prev[notifId],
//     }));

//     if (!isRead) {
//       try {
//         await fetch(`http://localhost:9090/apis/notification/markNotificationAsRead/${notifId}`, {
//           method: "PUT",
//         });

//         setAllNotification((prevData) =>
//           prevData.map((n) =>
//             n._id === notifId ? { ...n, isRead: true } : n
//           )
//         );
//       } catch (err) {
//         console.error("Failed to mark as read:", err);
//       }
//     }
//   };

 

//   return (
//     <div className="flex h-screen">
//         <Sidebar/>
//         <div className="flex-1 flex flex-col">
//             <Header/>
//             <div className="p-4">
//                 <h2 className="text-2xl font-bold mb-4">All Notifications</h2>
//                    {allNotifiction.length === 0 ? (
//         <div className="text-gray-500">No notifications found.</div>
//       ) : (
//         <ul className="space-y-3">
//           {allNotifiction.map((notif) => {
//             const isOpen = expanded[notif._id];

//             return (
//               <li
//                 key={notif._id}
//                 className={`p-4 rounded-xl shadow-md border cursor-pointer transition-all duration-200 ${
//                   notif.isRead ? "bg-white" : "bg-blue-50"
//                 }`}
//                 onClick={() => handleToggle(notif._id, notif.isRead)}
//               >
//                 <div className="flex items-center justify-between">
//                   <p className="text-gray-800 font-medium">{notif.message}</p>

//                   <div className="flex items-center">
//     {!notif.isRead && <span className="w-3 h-3 rounded-full bg-red-500 mr-2" />}
//     <MdOutlineArrowDropDown
//       className={`transform transition-transform duration-200 ${
//         isOpen ? "rotate-180" : ""
//       }`}
//     />
//   </div>
                
//                 </div>

//                 {isOpen && (
//                   <div className="mt-3 text-sm text-gray-600 space-y-1">
//                     <p>
//                       <span className="font-semibold">Patient:</span>{" "}
//                       {notif.patientId?.fullName || "N/A"}
//                     </p>
//                     <p>
//                       <span className="font-semibold">Time:</span>{" "}
//                       {new Date(notif.createdAt).toLocaleString()}
//                     </p>
//                   </div>
//                 )}
//               </li>
//             );
//           })}
//         </ul>
//       )}
               
//             </div>
//         </div>
//     </div>
//   );
// };

// export default NotificationsPage;



// import React, { useState, useEffect } from 'react';
// import Sidebar from '../../Sidebar/Sidebar';
// import Header from '../Header';
// import Cookies from 'js-cookie';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import { MdOutlineArrowDropDown } from 'react-icons/md';

// const NotificationsPage = () => {
//   const [allNotifiction, setAllNotification] = useState([]);
//   const [expanded, setExpanded] = useState({});
//   const navigate = useNavigate();

//   const fetchAllNotification = async () => {
//     const token = Cookies.get('accessToken');
//     if (!token) {
//       toast.error('You are not logged in. Please log in.', {
//         position: 'top-right',
//       });
//       navigate('/login');
//       return;
//     }

//     try {
//       const response = await fetch(
//         'https://physiotherapy-1.onrender.com/apis/notification/getNotifications',
//         {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       const data = await response.json();
//       if (data.success) {
//         setAllNotification(data.data);
//       }
//     } catch (err) {
//       toast.error(err.message || 'Something went wrong. Please try again.', {
//         position: 'top-right',
//       });
//     }
//   };

//   useEffect(() => {
//     fetchAllNotification();
//   }, []);

//   const handleToggle = (notifId) => {
//     setExpanded((prev) => ({
//       ...prev,
//       [notifId]: !prev[notifId],
//     }));
//   };

//   const handleMarkAsRead = async (notifId) => {

//     const token = Cookies.get('accessToken');
//     if (!token) {
//       toast.error('You are not logged in. Please log in.', {
//         position: 'top-right',
//       });
//       navigate('/login');
//       return;
//     }

//     try {
//       await fetch(`https://physiotherapy-1.onrender.com/apis/notification/markNotificationAsRead/${notifId}`, {
//         method: 'POST',
//          headers: {
//           "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//         },
          
//       });

      
//       toast.success('Notification marked as read!');
//     } catch (err) {
//       console.error('Failed to mark as read:', err);
//       toast.error('Failed to mark as read.');
//     }finally{
//       fetchAllNotification();
//     }
//   };

//   return (
//     <div className="flex h-screen">
//       <Sidebar />
//       <div className="flex-1 flex flex-col">
//         <Header />
//         <div className="p-4">
//           <h2 className="text-2xl font-bold mb-4">All Notifications</h2>

//           {allNotifiction.length === 0 ? (
//             <div className="text-gray-500">No notifications found.</div>
//           ) : (
//             <ul className="space-y-3">
//               {allNotifiction.map((notif) => {
//                 const isOpen = expanded[notif._id];

//                 return (
//                   <li
//                     key={notif._id}
//                     className={`p-4 rounded-xl shadow-md border cursor-pointer transition-all duration-200 ${
//                       notif.isRead ? 'bg-white' : 'bg-blue-50'
//                     }`}
//                   >
//                     <div
//                       className="flex items-center justify-between"
//                       onClick={() => handleToggle(notif._id)}
//                     >
//                       <p className="text-gray-800 font-medium">{notif.message}</p>

//                       <div className="flex items-center">
//                         {!notif.isRead && (
//                           <span className="w-3 h-3 rounded-full bg-red-500 mr-2" />
//                         )}
//                         <MdOutlineArrowDropDown
//                           className={`transform transition-transform duration-200 ${
//                             isOpen ? 'rotate-180' : ''
//                           }`}
//                           size={24}
//                         />
//                       </div>
//                     </div>

//                     {isOpen && (
//                       <div className="mt-3 text-sm text-gray-600 space-y-2">
//                         <p>
//                           <span className="font-semibold">Patient:</span>{' '}
//                           {notif.patientId?.fullName || 'N/A'}
//                         </p>
//                         <p>
//                           <span className="font-semibold">Time:</span>{' '}
//                           {new Date(notif.createdAt).toLocaleString()}
//                         </p>

//                         {!notif.isRead && (
//                           <button
//                             className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//                             onClick={() => handleMarkAsRead(notif._id)}
//                           >
//                             Mark as Read
//                           </button>
//                         )}
//                       </div>
//                     )}
//                   </li>
//                 );
//               })}
//             </ul>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NotificationsPage;



// import React, { useState, useEffect } from 'react';
// import Sidebar from '../../Sidebar/Sidebar';
// import Header from '../Header';
// import Cookies from 'js-cookie';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import { MdOutlineArrowDropDown } from 'react-icons/md';
// import { TailSpin } from 'react-loader-spinner';


// const NotificationsPage = () => {
//   const [allNotifiction, setAllNotification] = useState([]);
//   const [expanded, setExpanded] = useState({});
//   const [loader ,setLoading] = useState(false);
//   const [color , setColor]= useState('bg-white')
//   const navigate = useNavigate();

//   const fetchAllNotification = async () => {
//     const token = Cookies.get('accessToken');
//     if (!token) {
//       toast.error('You are not logged in. Please log in.', {
//         position: 'top-right',
//       });
//       navigate('/login');
//       return;
//     }
//    setLoading(true)
//     try {
//       const response = await fetch(
//         'https://physiotherapy-1.onrender.com/apis/notification/getNotifications',
//         {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       const data = await response.json();
//       if (data.success) {
//         setAllNotification(data.data);
//         setLoading(false);
        
//       }
//     } catch (err) {
//       toast.error(err.message || 'Something went wrong. Please try again.', {
//         position: 'top-right',
//       });
//     }finally{
//       setLoading(false)
//     }
//   };

//   useEffect(() => {
//     fetchAllNotification();
//   }, []);

//   const handleToggle = (notifId) => {
//     setExpanded((prev) => ({
//       ...prev,
//       [notifId]: !prev[notifId],
//     }));
//   };

//   const handleMarkAsRead = async (notifId) => {

//     const token = Cookies.get('accessToken');
//     if (!token) {
//       toast.error('You are not logged in. Please log in.', {
//         position: 'top-right',
//       });
//       navigate('/login');
//       return;
//     }

//     try {
//       await fetch(`https://physiotherapy-1.onrender.com/apis/notification/markNotificationAsRead/${notifId}`, {
//         method: 'POST',
//          headers: {
//           "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//         },
          
//       });

      
    
      
//     } catch (err) {
//       console.error('Failed to mark as read:', err);
//       toast.error('Failed to mark as read.');
//     }finally{
//       setColor('bg-blue-50')
      
//     }
//   };

//   return (
//    <div className="flex h-screen">
//   <Sidebar />
//   <div className="flex-1 flex flex-col">
//     <Header />
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">All Notifications</h2>

//       {loader ? (
//         <div className="flex justify-center items-center h-[60vh]">
//           <TailSpin
//             visible={true}
//             height="80"
//             width="80"
//             color="#4fa94d"
//             ariaLabel="tail-spin-loading"
//           />
//         </div>
//       ) : allNotifiction.length === 0 ? (
//         <div className="text-gray-500">No notifications found.</div>
//       ) : (
//         <ul className="space-y-3">
//           {allNotifiction.map((notif) => {
//             const isOpen = expanded[notif._id];

//             return (
//               <li
//                 key={notif._id}
//                  className={`p-4 rounded-xl shadow-md border cursor-pointer transition-all duration-200 ${
//     isOpen
//       ? 'bg-yellow-100' // color when dropdown is open
//       : notif.isRead
//       ? 'bg-white'
//       : 'bg-blue-50'
//   }`}
//               >
//                 <div
//                   className="flex items-center justify-between"
//                   onClick={() => handleToggle(notif._id)}
//                 >
//                   <p className="text-gray-800 font-medium">{notif.message}</p>

//                   {/* <div className="flex items-center">
//                     {!notif.isRead && (
//                       <span className="w-3 h-3 rounded-full bg-red-500 mr-2" />
//                     )}
//                     <MdOutlineArrowDropDown
//                       onClick={() => handleMarkAsRead(notif._id)}
//                       className={`transform transition-transform duration-200 ${
//                         isOpen ? 'rotate-180' : ''
//                       }`}
//                       size={24}
//                     />
//                   </div> */}

//                    <MdOutlineArrowDropDown
//                       onClick={() => handleMarkAsRead(notif._id)}
//                       className={`transform transition-transform duration-200 ${
//                         isOpen ? 'rotate-180' : ''
//                       }`}
//                       size={24}
//                     />
//                 </div>

//                 {isOpen && (
//                   <div className="mt-3 text-sm text-gray-600 space-y-2">
//                     <p>
//                       <span className="font-semibold">Patient:</span>{' '}
//                       {notif.patientId?.fullName || 'N/A'}
//                     </p>
//                     <p>
//                       <span className="font-semibold">Time:</span>{' '}
//                       {new Date(notif.createdAt).toLocaleString()}
//                     </p>

//                     {/* {!notif.isRead && (
//                       <button
//                         className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//                         onClick={() => handleMarkAsRead(notif._id)}
//                       >
//                         Mark as Read
//                       </button>
//                     )} */}
//                   </div>
//                 )}
//               </li>
//             );
//           })}
//         </ul>
//       )}
//     </div>
//   </div>
// </div>

//   );
// };

// export default NotificationsPage;



import React, { useState, useEffect } from 'react';
import Sidebar from '../../Sidebar/Sidebar';
import Header from '../Header';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import { TailSpin } from 'react-loader-spinner';

const NotificationsPage = () => {
  const [allNotifiction, setAllNotification] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [seenOnce, setSeenOnce] = useState({});
  const [loader, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchAllNotification = async () => {
    const token = Cookies.get('accessToken');
    if (!token) {
      toast.error('You are not logged in. Please log in.', {
        position: 'top-right',
      });
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        'https://physiotherapy-1.onrender.com/apis/notification/getNotifications',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        setAllNotification(data.data);
      }
    } catch (err) {
      toast.error(err.message || 'Something went wrong. Please try again.', {
        position: 'top-right',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllNotification();
  }, []);

  const handleToggle = (notifId) => {
    setExpanded((prev) => ({
      ...prev,
      [notifId]: !prev[notifId],
    }));

    // Mark as "seen once"
    setSeenOnce((prev) => ({
      ...prev,
      [notifId]: true,
    }));
  };

  const handleMarkAsRead = async (notifId) => {
    const token = Cookies.get('accessToken');
    if (!token) {
      toast.error('You are not logged in. Please log in.', {
        position: 'top-right',
      });
      navigate('/login');
      return;
    }

    try {
      await fetch(
        `https://physiotherapy-1.onrender.com/apis/notification/markNotificationAsRead/${notifId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.error('Failed to mark as read:', err);
      toast.error('Failed to mark as read.');
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">All Notifications</h2>

          {loader ? (
            <div className="flex justify-center items-center h-[60vh]">
              <TailSpin
                visible={true}
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="tail-spin-loading"
              />
            </div>
          ) : allNotifiction.length === 0 ? (
            <div className="text-gray-500">No notifications found.</div>
          ) : (
            <ul className="space-y-3">
              {allNotifiction.map((notif) => {
                const isOpen = expanded[notif._id];
                const hasBeenSeen = seenOnce[notif._id];
                const isRead = notif.isRead;

                return (
                  <li
                    key={notif._id}
                    className={`p-4 rounded-xl shadow-md border cursor-pointer transition-all duration-200 ${
                      isRead || hasBeenSeen
                        ? 'bg-white'
                        : isOpen
                        ? 'bg-yellow-100'
                        : 'bg-blue-50'
                    }`}
                  >
                    <div
                      className="flex items-center justify-between"
                      onClick={() => handleToggle(notif._id)}
                    >
                      <p className="text-gray-800 font-medium">{notif.message}</p>
                      <MdOutlineArrowDropDown
                        onClick={(e) => {
                          e.stopPropagation(); // prevent double toggle
                          handleMarkAsRead(notif._id);
                          handleToggle(notif._id);
                        }}
                        className={`transform transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        size={24}
                      />
                    </div>

                    {isOpen && (
  <div className="mt-3 text-sm text-gray-600 space-y-2">
    {notif.patientId ? (
      <p>
        <span className="font-semibold">Patient:</span>{' '}
        {notif.patientId.fullName}
      </p>
    ) : (
      <p className="font-semibold">PhysNXT Admin</p>
    )}
    <p>
      <span className="font-semibold">Time:</span>{' '}
      {new Date(notif.createdAt).toLocaleString()}
    </p>
  </div>
)}

                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
