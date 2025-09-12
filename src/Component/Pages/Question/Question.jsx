// import React, { useState, useEffect } from 'react';
// import Sidebar from '../../../Sidebar/Sidebar';
// import Header from '../../../Header/Header';
// import Pagination from '../../../Pagination/Pagination';

// const initialData = [
//   {
//     id: 1,
//     type: 'Feedback',
//     userName: 'John Doe',
//     messages: [
//       { sender: 'user', text: 'Great physiotherapy sessions!' },
//       { sender: 'therapist', text: 'Thank you so much, John!' },
//     ],
//   },
//   {
//     id: 2,
//     type: 'Query',
//     userName: 'Jane Smith',
//     messages: [
//       { sender: 'user', text: 'How many sessions are needed for knee recovery?' },
//       { sender: 'therapist', text: 'Usually around 6-8 sessions, but it depends.' },
//     ],
//   },
//   {
//     id: 3,
//     type: 'Feedback',
//     userName: 'Alice Johnson',
//     messages: [
//       { sender: 'user', text: 'The sessions were helpful!' },
//       { sender: 'therapist', text: 'Glad to hear that, Alice!' },
//     ],
//   },
//   {
//     id: 4,
//     type: 'Query',
//     userName: 'Bob Brown',
//     messages: [
//       { sender: 'user', text: 'What is the best treatment for back pain?' },
//       { sender: 'therapist', text: 'We recommend a combination of physical therapy and strength training.' },
//     ],
//   },
// ];

// const FeedbackQueries = () => {
//   const [data, setData] = useState(initialData);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [newMessage, setNewMessage] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const rowsPerPage = 10;

//   const modalRef = React.useRef();

//   const openChatModal = (item) => {
//     setSelectedItem(item);
//     setNewMessage('');
//   };

//   const closeChatModal = () => {
//     setSelectedItem(null);
//     setNewMessage('');
//   };

//   const handleSendMessage = (e) => {
//     e.preventDefault();
//     if (selectedItem && newMessage.trim()) {
//       const updatedData = data.map((item) =>
//         item.id === selectedItem.id
//           ? {
//               ...item,
//               messages: [...item.messages, { sender: 'therapist', text: newMessage }],
//             }
//           : item
//       );
//       setData(updatedData);
//       setSelectedItem(updatedData.find((item) => item.id === selectedItem.id)); // update chat live
//       setNewMessage('');
//     }
//   };

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const indexOfLastItem = currentPage * rowsPerPage;
//   const indexOfFirstItem = indexOfLastItem - rowsPerPage;
//   const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

//   const totalPages = Math.ceil(data.length / rowsPerPage);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (modalRef.current && !modalRef.current.contains(e.target)) {
//         closeChatModal();
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar activePage="/feedback" />
//       <div className="flex flex-col flex-1 overflow-x-hidden">
//         <Header />
//         <main className="flex-1 p-4 md:p-6">
//           <div className="bg-white rounded-lg shadow p-4 md:p-6">
//             <div className="flex flex-wrap items-center justify-between mb-6">
//               <h2 className="text-2xl font-bold text-gray-800">Feedback & Queries</h2>
//             </div>
//             <div className="overflow-x-auto">
//               <table className="min-w-full table-auto text-sm md:text-base text-gray-700">
//                 <thead className="bg-gradient-to-r from-blue-700 to-blue-500 text-white">
//                   <tr>
//                     <th className="px-4 py-2 text-left">Type</th>
//                     <th className="px-4 py-2 text-left">User Name</th>
//                     <th className="px-4 py-2 text-left">Message</th>
//                     <th className="px-4 py-2 text-left">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {currentItems.map((item) => (
//                     <tr key={item.id} className="border-b hover:bg-gray-50">
//                       <td className="px-4 py-2">{item.type}</td>
//                       <td className="px-4 py-2">{item.userName}</td>
//                       <td className="px-4 py-2">
//                         {item.messages.length > 0 && item.messages[0].text}
//                       </td>
//                       <td className="px-4 py-2">
//                         <button
//                           onClick={() => openChatModal(item)}
//                           className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
//                         >
//                           View Chat
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//             <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
//           </div>
//         </main>
//       </div>

//       {/* Chat Modal */}
//       {selectedItem && (
//         <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4">
//           <div
//             ref={modalRef}
//             className="bg-white rounded-lg p-6 w-full max-w-md mx-auto flex flex-col h-96"
//           >
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg md:text-xl font-bold text-gray-800">
//                 Chat with {selectedItem.userName} ({selectedItem.type})
//               </h3>
//               <button
//                 onClick={closeChatModal}
//                 className="text-xl text-gray-500 hover:text-gray-800"
//               >
//                 ×
//               </button>
//             </div>
//             <div className="flex-1 overflow-y-auto border p-3 rounded bg-gray-50 space-y-3">
//               {selectedItem.messages.map((msg, index) => (
//                 <div
//                   key={index}
//                   className={`flex ${msg.sender === 'therapist' ? 'justify-end' : 'justify-start'}`}
//                 >
//                   <div
//                     className={`p-2 rounded-lg max-w-xs ${
//                       msg.sender === 'therapist'
//                         ? 'bg-blue-600 text-white'
//                         : 'bg-gray-300 text-gray-800'
//                     }`}
//                   >
//                     {msg.text}
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <form onSubmit={handleSendMessage} className="mt-4 flex gap-2">
//               <input
//                 type="text"
//                 className="flex-1 border rounded p-2"
//                 placeholder="Type your message..."
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 required
//               />
//               <button
//                 type="submit"
//                 className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
//               >
//                 Send
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FeedbackQueries;
import React, { useState, useEffect } from "react";
import Sidebar from "../../../Sidebar/Sidebar";
import Header from "../../../Header/Header";
import Pagination from "../../../Pagination/Pagination";
import { TailSpin, ThreeDots } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import { useFetcher, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { RxCross2 } from "react-icons/rx";
import { MdDelete } from "react-icons/md";
import { GoReport } from "react-icons/go";
import Van from "../../Van";

const Question = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [allQuestion, setAllQuestion] = useState([]);
  const [loader, setLoading] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [answerText, setAnswerText] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const navigate = useNavigate();

  const fetchAllQuestionData = async () => {
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
        "https://physiotherapy-1.onrender.com/apis/questionNaires/getAllQuestions",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log("allquestion", data?.data);
      if (data.success) {
        setAllQuestion(data.data);
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
    fetchAllQuestionData();
  }, []);

  const modalRef = React.useRef();

  const openChatModal = (item) => {
    setSelectedItem(item);
    setNewMessage("");
  };

  const closeChatModal = () => {
    setSelectedItem(null);
    setNewMessage("");
  };

  // const handleSendMessage = (e) => {
  //   e.preventDefault();
  //   if (selectedItem && newMessage.trim()) {
  //     const updatedData = data.map((item) =>
  //       item.id === selectedItem.id
  //         ? {
  //             ...item,
  //             messages: [...item.messages, { sender: 'therapist', text: newMessage }],
  //           }
  //         : item
  //     );
  //     setData(updatedData);
  //     setSelectedItem(updatedData.find((item) => item.id === selectedItem.id)); // update chat live
  //     setNewMessage('');
  //   }
  // };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // const indexOfLastItem = currentPage * rowsPerPage;
  // const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  // const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // const totalPages = Math.ceil(data.length / rowsPerPage);

  // useEffect(() => {
  //   const handleClickOutside = (e) => {
  //     if (modalRef.current && !modalRef.current.contains(e.target)) {
  //       closeChatModal();
  //     }
  //   };

  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => document.removeEventListener('mousedown', handleClickOutside);
  // }, []);

  const handleSubmitAnswer = async (id) => {
    const token = Cookies.get("accessToken");
    if (!token) {
      toast.error("You are not logged in. Please log in.", {
        position: "top-right",
      });
      navigate("/login");
      return;
    }
    setBtnLoading(true);
    try {
      const res = await fetch(
        `https://physiotherapy-1.onrender.com/apis/questionNaires/replyToQuestionByPhysiotherapist/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ answer: answerText }),
        }
      );
      const result = await res.json();

      if (result.success) {
        toast.success("Your Reply added successfully!", {
          position: "top-right",
        });

        setModalContent(null);
        setAnswerText("");
        setModalType(null);
      } else {
        alert("Failed to submit answer");
      }
    } catch (error) {
      console.error("Error submitting answer", error);
      alert("An error occurred");
    } finally {
      setModalContent(null);
      setAnswerText("");
      setModalType(null);
      fetchAllQuestionData();
      setBtnLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar activePage="/question" />
      <div className="flex flex-col flex-1 overflow-x-hidden">
        <Header />
        <main className="flex-1 p-4 md:p-6">
          <div className="bg-white rounded-lg shadow p-4 md:p-6">
            <div className="flex flex-wrap items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Question's</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto text-sm md:text-base text-gray-700 ">
                <thead className="bg-[#1E2A3A] text-white ">
                  <tr>
                    <th className="px-4 py-2 text-left">Serial No.</th>
                    <th className="px-4 py-2 text-left">Patient Name</th>
                    {/* <th className="px-4 py-2 text-left">Patient Details</th> */}
                    <th className="px-4 py-2 text-left">Question</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 text-sm sm:text-base">
                  {loader ? (
                    <tr>
                      <td colSpan={11} className="py-6 text-center">
                        <div className="flex justify-center items-center">
                          <TailSpin
                            visible={true}
                            height="80"
                            width="80"
                            color="#4fa94d"
                            ariaLabel="tail-spin-loading"
                          />
                        </div>
                      </td>
                    </tr>
                  ) : allQuestion.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center text-2xl font-medium"
                      >
                        No Data Found
                      </td>
                    </tr>
                  ) : (
                    allQuestion.map((que, index) => (
                      // <tr key={que?.patient?._id}>
                      //   <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
                      //     {index + 1}
                      //   </td>
                      //   <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
                      //     {que?.patient.fullName}
                      //   </td>

                      //   <td className="border border-gray-300 px-4 py-2 text-sm max-w-[200px] whitespace-normal break-words">
                      //     <button
                      //       className="text-blue-600 underline"
                      //       onClick={() => {
                      //         setModalType("patient Details");
                      //         setModalContent(que?.patient);
                      //       }}
                      //     >
                      //       View{" "}
                      //     </button>
                      //   </td>

                      //   <td className="border border-gray-300 w-full  text-sm  whitespace-normal break-words">

                      //   {que.questions.map((q) => (
                      //     <tr key={q._id} className="w-full">

                      //       <td className="border px-4 py-2 w-full" >
                      //         <p className="pb-1 text-lg ">

                      //         <strong>Q:</strong> {q.askQuestion}
                      //         </p>
                      //         <br />
                      //         <strong>Ans:</strong>{" "}
                      //         {q.answer ? (
                      //          <span>{q.answer?.slice(0, 50)}{q.answer?.length > 30 ? '...' : ''}</span>

                      //         ) : (
                      //           <span className="text-gray-400">
                      //             Not answered
                      //           </span>
                      //         )}
                      //       </td>
                      //       <td className="border px-4 py-2">
                      //         <button
                      //           className="text-blue-600 underline"
                      //           onClick={() => {
                      //             setModalType("answer");
                      //             setModalContent(q);
                      //           }}
                      //         >
                      //           {q.answer ? "View" : "Answer"}
                      //         </button>
                      //       </td>
                      //     </tr>
                      //   ))}
                      //      </td>
                      // </tr>

                      <tr key={que?.patient?._id}>
                        <td className="border border-gray-300 px-4 py-2 text-sm align-top">
                          {index + 1}
                        </td>

                        <td className="border border-gray-300 px-4 py-2 text-sm align-top">
                          {que?.patient.fullName}
                        </td>

                        {/* <td className="border border-gray-300 px-4 py-2 text-sm align-top">
    <button
      className="text-blue-600 underline"
      onClick={() => {
        setModalType("patient Details");
        setModalContent(que?.patient);
      }}
    >
      View
    </button>
  </td> */}

                        <td className="border border-gray-300 px-4 py-2 text-sm align-top max-w-[300px]">
                          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                            {[...que.questions].reverse().map((q) => (
                              <div
                                key={q._id}
                                className="border p-2 rounded bg-gray-50"
                              >
                                <p className="text-sm">
                                  <strong>Q:</strong> {q.askQuestion}
                                </p>
                                <p className="text-sm mt-1">
                                  <strong>Ans:</strong>{" "}
                                  {q.answer ? (
                                    <span>
                                      {q.answer.slice(0, 50)}
                                      {q.answer.length > 50 ? "..." : ""}
                                    </span>
                                  ) : (
                                    <span className="text-gray-400">
                                      Not answered
                                    </span>
                                  )}
                                </p>
                                <button
                                  className="text-blue-600 underline mt-1 text-sm"
                                  onClick={() => {
                                    setModalType("answer");
                                    setModalContent(q);
                                  }}
                                >
                                  {q.answer ? "View" : "Answer"}
                                </button>
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {/* <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} /> */}
          </div>
        </main>
      </div>

      {modalContent && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg w-[90%] max-w-md sm:max-w-lg md:max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-semibold ">{modalType}</h1>

              <button
                className="ml-auto  text-red-600 font-semibold text-3xl"
                onClick={() => {
                  setModalContent(null);
                  setModalType(null);
                }}
              >
                <RxCross2 />
              </button>
            </div>

            {modalType === "patient Details" && (
              <div>
                <p>
                  <strong>Name:</strong> {modalContent?.fullName}
                </p>
                <p>
                  <strong>Email:</strong> {modalContent?.email}
                </p>
              </div>
            )}

            {modalType === "service Details" && (
              <div>
                <p>
                  <strong> Service Name:</strong>{" "}
                  {modalContent?.therapyServiceId?.serviceId?.serviceName}
                </p>
                <p>
                  <strong>Title:</strong> {modalContent?.title}
                </p>
                <p>
                  <strong> Description:</strong> {modalContent?.description}
                </p>
                <p>
                  <strong> City:</strong> {modalContent?.therapyServiceId?.city}
                </p>
              </div>
            )}

            {modalType === "answer" && (
              <div>
                <p>
                  <strong>Question:</strong> {modalContent.askQuestion}
                </p>

                {modalContent.answer ? (
                  <p>
                    <strong>Answer:</strong> {modalContent.answer}
                  </p>
                ) : (
                  <div className="mt-4 text-center">
                    <textarea
                      className="w-full border rounded p-2"
                      rows="4"
                      placeholder="Type your answer..."
                      value={answerText}
                      onChange={(e) => setAnswerText(e.target.value)}
                    />
                    <button
                      onClick={() => handleSubmitAnswer(modalContent?._id)}
                      className="bg-blue-600 text-white px-4 py-2 mt-2 rounded text-center"
                    >
                      {btnLoading ? (
                        <div>
                          <ThreeDots
                            visible={true}
                            height="20"
                            width="40"
                            color="white"
                            radius="9"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                          />
                        </div>
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Chat Modal */}
      {/* {selectedItem && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4">
          <div
            ref={modalRef}
            className="bg-white rounded-lg p-6 w-full max-w-md mx-auto flex flex-col h-96"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg md:text-xl font-bold text-gray-800">
                Chat with {selectedItem.userName} ({selectedItem.type})
              </h3>
              <button
                onClick={closeChatModal}
                className="text-xl text-gray-500 hover:text-gray-800"
              >
                ×
              </button>
            </div>
            <div className="flex-1 overflow-y-auto border p-3 rounded bg-gray-50 space-y-3">
              {selectedItem.messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === 'therapist' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`p-2 rounded-lg max-w-xs ${
                      msg.sender === 'therapist'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-300 text-gray-800'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="mt-4 flex gap-2">
              <input
                type="text"
                className="flex-1 border rounded p-2"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Question;
