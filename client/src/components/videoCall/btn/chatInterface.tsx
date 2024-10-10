import { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import { SendHorizontal } from "lucide-react";
import logo from "../../assets/img/btc.png";

interface Message {
    text: string;
    sender: string;
}

interface ChatBoxProps {
    socket: Socket | null;
    strangerId: string | null;
    messages: Message[];
    setMessages: (value: Message[]) => void;
}

export default function ChatBox({
    socket,
    strangerId,
    messages,
    setMessages,
}: ChatBoxProps) {
    const [message, setMessage] = useState<string>("");
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop =
                chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();

        const chat = message.trim();
        const newMessage: Message = { text: chat, sender: "You" };
        setMessages([...messages, newMessage]);
      socket && socket.emit("chat", { message, to: strangerId });
      
        setMessage("");
    };

    return (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end">
            <div
                ref={chatContainerRef}
                className="p-4 space-y-4 overflow-y-auto max-h-[70%] scrollbar-hide"
            >
                {messages.map((msg, index) => (
                    <div key={index} className="flex items-start space-x-2">
                        <img
                            src={logo}
                            alt="User"
                            className="w-8 h-8 rounded-full border-2 border-gray-600 self-start"
                        />
                        <div
                            className={`p-3 rounded-lg max-w-[75%] ${
                                msg.sender === "You"
                                    ? "bg-blue-500 bg-opacity-75 text-white"
                                    : "bg-gray-600 bg-opacity-75 text-gray-100"
                            } shadow-md ml-2`}
                        >
                            <p className="text-sm leading-snug">{msg.text}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="p-4">
                <form
                    onSubmit={handleSendMessage}
                    className="flex items-center space-x-2"
                >
                    <div className="relative flex-1">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="w-full bg-gray-700 border border-gray-600 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-gray-100 placeholder-gray-400 pr-12"
                        />
                        <button
                            type="submit"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:bg-blue-600 text-white rounded-full p-2 transition duration-200 shadow-md"
                        >
                            <SendHorizontal size={20} strokeWidth={1.5} />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
