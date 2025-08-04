import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Loading from "../icons/Loading";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import useAuthStore from "@/stores/useAuthStore";
import { cn } from "@/lib/utils";

function ChatWithAdminBox() {
  const { user } = useAuthStore();
  const socket = io("http://localhost:8000");

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const username = user?.name; // Replace with real user info

  useEffect(() => {
    socket.emit("register", username);

    socket.on("receive-message", (data) => {
      setChat((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive-message");
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("send-to-admin", { from: username, message });
    setChat((prev) => [...prev, { from: "You", message }]);
    setMessage("");
  };

  return (
    <div className="fixed shadow-2xl rounded-lg right-6 bottom-6 bg-white z-8 w-[400px] h-[500px]">
      {true ? (
        <div>
          <h2 className="p-4 w-full text-center font-bold text-xl">
            Chat with Admin
          </h2>
          <div className="p-4 space-y-2">
            {chat.map((c, i) => (
              <div
                className={cn("w-full flex justify-end", {
                  "justify-start": c.from === "admin",
                })}
              >
                <p
                  key={i}
                  className={cn(
                    "px-4 py-2 rounded-md bg-[#003F66] text-white",
                    "w-fit",
                    {
                      "bg-gray-200 text-black": c.from === "admin",
                    }
                  )}
                >
                  {c.message}
                </p>
              </div>
            ))}
          </div>
          <form className="flex items-center gap-4 p-4" onSubmit={sendMessage}>
            <Input
              placeholder="Type message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button type="submit">Send</Button>
          </form>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default ChatWithAdminBox;
