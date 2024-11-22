import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
  auth: {
    token:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMyMjg3MDY0LCJleHAiOjE3MzIyOTA2NjR9.6yXF9-nZ5Wj6kKUC7nAbNk0cJjkzIn64MKGX-UzwYD8",
  },
});

socket.on("connect", () => {
  console.log("Connected to server:", socket.id);

  // Join a chat room
  socket.emit("join_chat", 1);

  // Test typing indicator
  socket.emit("typing", { chat_id: 1, user_id: "testuser" });

  // Test sending a message
  socket.emit("send_message", {
    chat_id: 1,
    sender_id: 1,
    content: "Hello from client!",
    type: "text",
  });

  // Test read receipt
  socket.emit("read_message", { message_id: 6, user_id: 1 });
});

// Listen for events
socket.on("user_typing", (data) => console.log("Typing event:", data));
socket.on("new_message", (message) =>
  console.log("New message event:", message)
);
socket.on("message_read", (data) => console.log("Message read event:", data));
