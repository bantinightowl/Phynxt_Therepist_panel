import React from "react";

const Van = () => {
  const conversation = [
    { sender: "patient", message: "Hey Doctor!" },
    { sender: "doctor", message: "Hello, how can I help you today?" },
    { sender: "patient", message: "I've been having headaches lately." },
    { sender: "doctor", message: "How long have you been experiencing them?" },
    { sender: "patient", message: "For about a week now." },
    { sender: "doctor", message: "Okay, let's discuss possible causes and treatment." },
  ];

  return (
    <div className="max-w-md mx-auto bg-white border rounded p-4 h-[400px] overflow-y-auto shadow">
      <h2 className="text-xl font-bold mb-4 text-center">Doctor-Patient Chat</h2>
      <div className="space-y-3">
        {conversation.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "doctor" ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-lg text-sm max-w-[75%] ${
                msg.sender === "doctor"
                  ? "bg-blue-100 text-blue-900"
                  : "bg-green-100 text-green-900"
              }`}
            >
              {msg.message}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Van;




