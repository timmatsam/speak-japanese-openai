import React, { useEffect, useState } from "react";

const EXPRESS_SERVER = import.meta.env.VITE_EXPRESS_SERVER;
const Chat = () => {
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [newMessage, setNewMessage] = useState<{role: string, content: string}>({ role: "", content: "" });
  const handleMessageSubmit = (e:any) => {
    e.preventDefault();
    const userMessage = {
      role: "user",
      content: e.target[0].value,
    };
    setNewMessage(userMessage);
    setMessages([...messages, userMessage]);
  };
  useEffect(() => {
    fetch(`${EXPRESS_SERVER}/openai/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([...messages, newMessage]),
    })
      .then((res) => res.json())
      .then(message => {
        setMessages([...messages, message]);
      });
  }, [newMessage]);
  return (
    <div className='flex-col justify-center w-screen'>
        <div className="flex flex-col overscroll-none overflow-auto h-72 my-1">
          {messages.map((message, index) => (
            <div key={index} className={`p-2 ${message.role === "user" ? "self-end" : "self-start"}`}>
              <div className={`rounded-lg p-2 ${message.role === "user" ? "bg-gray-200 text-black" : "bg-blue-600 text-white"}`}>
                {message.content}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleMessageSubmit} className="w-full">
          <input type='text' className='border-solid border-4 border-sky-400  w-full' placeholder="send a chat as if you were texting your friend (but in japanese)"/>
        </form>
    </div>
  );
};

export default Chat;
