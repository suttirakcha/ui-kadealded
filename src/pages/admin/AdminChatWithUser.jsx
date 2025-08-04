import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function AdminChatWithUser() {
  const socket = io("http://localhost:8000");

  const [selectedUser, setSelectedUser] = useState("");
  const [userList, setUserList] = useState([]);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.emit("join-admin");

    socket.on("user-list", (users) => {
      setUserList(users);
    });

    socket.on("receive-message", (data) => {
      setChat((prev) => [...prev, data]);
    });

    return () => {
      socket.off("user-list");
      socket.off("receive-message");
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!selectedUser) return;

    socket.emit("send-to-user", {
      to: selectedUser,
      message,
    });

    setChat((prev) => [...prev, { from: "you", message }]);
    setMessage("");
  };

  return (
    <div>
      <h2>Admin Panel</h2>

      <h4>Users:</h4>
      <div>
        {userList.map((user) => (
          <button key={user} onClick={() => setSelectedUser(user)}>
            {user}
          </button>
        ))}
      </div>

      {selectedUser && (
        <>
          <h4>Chat with {selectedUser}</h4>
          <div>
            {chat.map((c, i) => (
              <p
                key={i}
                className={cn("px-4 py-2 rounded-md bg-[#003F66] text-white", {
                  "bg-gray-200 text-black": c.from === selectedUser,
                })}
              >
                {c.message}
              </p>
            ))}
          </div>
          <form className="flex items-center gap-4" onSubmit={sendMessage}>
            <Input
              placeholder="Type message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button type="submit">Send</Button>
          </form>
        </>
      )}
    </div>
  );
}
