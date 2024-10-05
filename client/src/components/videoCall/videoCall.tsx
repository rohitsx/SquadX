import  { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import useSocket from "../hooks/useSocket";
import ChatBox from "./chatInterface";
import Header from "../header";
import Controls from "./controlBtn";
import axios from "axios";
import PopUp from "@/assets/utils/popUp";

interface Message {
    text: string;
    sender: string;
}
interface PeerData {
    pairedUserId: string;
    strangerUsername: string;
    polite: boolean;
}

export default function VideoCall(): JSX.Element {
    const socket: Socket | null = useSocket();
    const [strangerId, setStrangerId] = useState<string | null>(null);
    const [strangerUsername, setStrangerUsername] = useState<string | null>(
        null
    );
    const [messages, setMessages] = useState<Message[]>([]);
    const [isMatched, setIsMatched] = useState<boolean>(false);
    setMessages;
    const localVideo = useRef<HTMLVideoElement>(null);
    const remoteVideo = useRef<HTMLVideoElement>(null);
    const polite = useRef<boolean>(false);
    const makingOffer = useRef<boolean>(false);
    const ignoreOffer = useRef<boolean>(false);
    const pcRef = useRef<RTCPeerConnection | null>(null);
    const [popMessage, setPopMessage] = useState<string | null>(null);

    async function getMedia(pc?: RTCPeerConnection) {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });
            pc &&
                stream
                    .getTracks()
                    .forEach((track) => pc.addTrack(track, stream));
            if (localVideo.current) localVideo.current.srcObject = stream;
        } catch (err) {
            console.error("Error accessing media devices:", err);
        }
    }

    async function handleEndCall() {
        setIsMatched(false);
        setMessages([]);
        setStrangerId(null);
        polite.current = false;
        socket && socket.emit("connectPeer");

        // Stop the remote stream
        if (remoteVideo.current && remoteVideo.current.srcObject) {
            const stream = remoteVideo.current.srcObject as MediaStream;
            stream.getTracks().forEach((track) => track.stop());
            remoteVideo.current.srcObject = null;
        }

        // Close the existing peer connection
        if (pcRef.current) {
            pcRef.current.close();
            pcRef.current = null;
        }
    }
    const handleReport = () => {
        setPopMessage("Reported");
        axios
            .post(import.meta.env.VITE_API_URL + "/report", {
                username: strangerUsername,
            })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        if (localVideo.current) {
            getMedia();
        }
    }, [localVideo]);

    useEffect(() => {
        let pairId: null | string;
        if (!socket) return;
        socket.on("disconnect", () => console.log("socket not working"));
        socket.on("connect", () => console.log("socket working"));
        socket.emit("connectPeer");

        socket.on("peer", (v: PeerData) => {
            console.log(v, "this one is workin");

            pairId = v.pairedUserId;
            setStrangerId(v.pairedUserId);
            setStrangerUsername(v.strangerUsername);
            polite.current = v.polite;
            setIsMatched(true);
        });

        socket.on("strangerLeft", () => {
            handleEndCall();
        });

        socket.on("chat", (m: string) => {
            console.log("chat", m);
            const chat = m.trim();
            const newMessage: Message = {
                text: chat,
                sender: "stranger",
            };
            console.log(messages, newMessage);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
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

    console.log(messages);

    useEffect(() => {
        if (!strangerId) return;

        const config: RTCConfiguration = {
            iceServers: [{ urls: "stun:stun.mystunserver.tld" }],
        };
        const pc = new RTCPeerConnection(config);
        pcRef.current = pc;

        getMedia(pc);

        pc.ontrack = ({ track, streams }) => {
            track.onunmute = () => {
                if (remoteVideo.current && !remoteVideo.current.srcObject) {
                    remoteVideo.current.srcObject = streams[0];
                }
            };
        };

        pc.onnegotiationneeded = async () => {
            try {
                makingOffer.current = true;
                await pc.setLocalDescription();
                socket &&
                    socket.emit("message", {
                        description: pc.localDescription,
                        to: strangerId,
                    });
            } catch (err) {
                console.error("Error during negotiation:", err);
            } finally {
                makingOffer.current = false;
            }
        };

        pc.onicecandidate = ({ candidate }) => {
            socket && socket.emit("message", { candidate, to: strangerId });
        };

        socket &&
            socket.on(
                "message",
                async (m: {
                    description?: RTCSessionDescriptionInit;
                    candidate?: RTCIceCandidateInit;
                }) => {
                    if (!m) return;
                    const { description, candidate } = m;

                    try {
                        if (description) {
                            const offerCollision =
                                description.type === "offer" &&
                                (makingOffer.current ||
                                    pc.signalingState !== "stable");

                            ignoreOffer.current =
                                !polite.current && offerCollision;
                            if (ignoreOffer.current) return;

                            await pc.setRemoteDescription(description);
                            if (description.type === "offer") {
                                await pc.setLocalDescription();
                                socket.emit("message", {
                                    description: pc.localDescription,
                                    to: strangerId,
                                });
                            }
                        } else if (candidate) {
                            try {
                                await pc.addIceCandidate(candidate);
                            } catch (err) {
                                if (!ignoreOffer.current) throw err;
                            }
                        }
                    } catch (err) {
                        console.error("Error processing message:", err);
                    }
                }
            );

        return () => {
            pc.close();
            socket && socket.off("message");
        };
    }, [strangerId, socket]);

    return (
        <div className="flex flex-col h-screen bg-gray-900 text-gray-100">
            <Header />
            <div className="flex-1 flex p-6 space-x-6">
                {popMessage && (
                    <PopUp
                        message={popMessage}
                        setMessage={setPopMessage}
                        navigation="/"
                    />
                )}
                <div className="flex-1 flex flex-col bg-gray-800 rounded-2xl shadow-xl overflow-hidden relative">
                    <div className="flex-1 relative bg-gray-900">
                        {isMatched ? (
                            <>
                                <video
                                    ref={remoteVideo}
                                    autoPlay
                                    playsInline
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                                    <p className="text-xl font-semibold text-white">
                                        {strangerUsername}
                                    </p>
                                </div>
                                <Controls
                                    setIsMatched={setIsMatched}
                                    setMessages={setMessages}
                                    strangerId={strangerId}
                                    socket={socket}
                                    handelCallEnd={handleEndCall}
                                    handleReport={handleReport}
                                />
                            </>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700">
                                <p className="text-3xl text-white font-semibold">
                                    Finding your match...
                                </p>
                            </div>
                        )}
                    </div>
                </div>
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
