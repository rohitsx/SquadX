import { useEffect, useMemo, useRef, useState } from "react";
import Header from "./header";
import WebRTC from "@/utils/webRtc";
import Controls from "./webrtc/controlBtn";
import ChatBox from "./webrtc/chatInterface";

interface Message {
    text: string;
    sender: string;
}
interface PeerData {
    pairedUserId: string;
    strangerUsername: string;
    polite: boolean;
}

export default function VideoCall() {
    const [strangerId, setStrangerId] = useState<string | null>(null);
    const [strangerUsername, setStrangerUsername] = useState<string | null>(
        null
    );
    const [messages, setMessages] = useState<Message[]>([]);
    const [isMatched, setIsMatched] = useState<boolean>(false);

    const localVideo = useRef<HTMLVideoElement>(null);
    const remoteVideo = useRef<HTMLVideoElement>(null);
    const webRtc = useMemo(() => new WebRTC(), []);
    const socket = useMemo(() => webRtc.socket, [webRtc.socket]);

    useEffect(() => {
        const initializeWebRTC = async () => {
            if (localVideo.current) {
                await webRtc.getStream(localVideo.current);
            }
        };

        initializeWebRTC();
    }, [webRtc]);

    useEffect(() => {
        let pairId: null | string;

        socket.on("disconnect", () => console.log("socket not working"));
        socket.on("connect", () => console.log("socket working"));

        socket.emit("connectPeer");
        socket.on("peer", (v: PeerData) => {
            console.log(v, "this one is workin");

            pairId = v.pairedUserId;
            setStrangerId(v.pairedUserId);
            setStrangerUsername(v.strangerUsername);
            webRtc.polite = v.polite;
            setIsMatched(true);
        });

        socket.on("strangerLeft", () => {
            console.log("this one is workin");

            setIsMatched(false);
            setMessages([]);
            setStrangerId(null);
            webRtc.polite = false;
            socket.emit("connectPeer");

            // Stop the remote stream
            if (remoteVideo.current && remoteVideo.current.srcObject) {
                const stream = remoteVideo.current.srcObject as MediaStream;
                stream.getTracks().forEach((track) => track.stop());
                remoteVideo.current.srcObject = null;
            }

            webRtc.pc.close()
        });

        const handleBeforeUnload = () => {
            socket.emit("pairedclosedtab", pairId);
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            socket.off("disconnect");
            socket.off("connect");
            socket.off("peer");
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [socket]);
  
  useEffect(() => {
    if(!strangerId) return
    webRtc.addRemoteStream(remoteVideo.current);
    webRtc.sendOffer(strangerId);
    webRtc.handelIce(strangerId);
    
    socket.on('messages', m => webRtc.handeMessage(m, strangerId))

    return () => {
      webRtc.pc.close();
      socket.off('messages')
    }
  },[socket])

    return (
        <div className="flex flex-col h-screen bg-gray-900 text-gray-100">
            <Header />
            <div className="flex-1 flex p-6 space-x-6">
                <div className="flex-1 flex flex-col bg-gray-800 rounded-2xl shadow-xl overflow-hidden relative">
                    <div className="flex-1 relative bg-gray-900">
                        {isMatched ? (
                            <video
                                ref={remoteVideo}
                                autoPlay
                                playsInline
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700">
                                <p className="text-3xl text-white font-semibold">
                                    Finding your match...
                                </p>
                            </div>
                        )}
                        <Controls
                            {...{
                                setIsMatched,
                                setMessages,
                                strangerId,
                                socket,
                            }}
                        />
                    </div>
                </div>
                <div>{strangerUsername}</div>

                <div className="w-1/2 flex flex-col bg-gray-800 rounded-2xl shadow-xl overflow-hidden relative">
                    <video
                        ref={localVideo}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover"
                    />
                    <ChatBox
                        socket={socket}
                        strangerId={strangerId}
                        messages={messages}
                        setMessages={setMessages}
                    />
                </div>
            </div>
        </div>
    );
}
