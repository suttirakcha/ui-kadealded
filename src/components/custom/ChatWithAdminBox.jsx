import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Loading from "../icons/Loading";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { chatSchema } from "@/schemas/chatSchema";

function ChatWithAdminBox() {
  const [isConnected, setIsConnected] = useState(false);
  const socket = io("http://localhost:8000");

  useEffect(() => {
    socket.on("connect", () => setIsConnected(socket.id ? true : false));

    socket.on("receive-message", (message) => {
      console.log(message);
    });
  }, []);

  const { register, handleSubmit } = useForm({
    defaultValues: { chat: "", id: socket.id },
    resolver: yupResolver(chatSchema),
  });

  const onSubmit = (data) => {
    const message = {
      chat: data.chat,
      id: socket.id
    };
    socket.emit("send-message", message);
  };

  return (
    <div className="fixed shadow-2xl rounded-lg right-6 bottom-6 bg-white z-8 w-[400px] h-[500px]">
      {isConnected ? (
        <div>
          <h2 className="p-4 w-full text-center font-bold text-xl">
            Chat with Admin
          </h2>
          <div className="p-4">
            {/* {chats.map(chat => <p>{chat.chat}</p>)} */}
          </div>
          <form
            className="flex items-center gap-4 p-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input placeholder="Type message here..." {...register("chat")} />
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
