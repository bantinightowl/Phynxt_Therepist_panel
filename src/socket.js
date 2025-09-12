// import { io } from "socket.io-client";
// import Cookies from "js-cookie";

// const socket = io("https://physiotherapy-1.onrender.com", {
//   auth: {
//     token: Cookies.get("accessToken"),
//   },
//   autoConnect: false,
// });

// export default socket;

// src/socket.js


// import { io } from "socket.io-client";

// const socket = io("https://physiotherapy-1.onrender.com", {
//   withCredentials: true,
//   transports: ["websocket"], // Ensures compatibility
// });

// export default socket;


import { io } from "socket.io-client";

const socket = io("https://physiotherapy-1.onrender.com", {
  transports: ["websocket"],
});

socket.on("connect", () => {
  console.log("✅ Connected to socket:", socket.id);
});

socket.on("connect_error", (err) => {
  console.error("❌ Socket connection error:", err.message);
});

export default socket;


