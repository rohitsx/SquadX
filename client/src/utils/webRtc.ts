import { Socket, io } from "socket.io-client";

export default class WebRTC {
    pc: RTCPeerConnection;
    stream: MediaStream | null;
    makingOffer: boolean;
    ignoreOffer: boolean;
    polite: boolean;
    socket: Socket;

    constructor() {
        this.pc = new RTCPeerConnection({
            iceServers: [{ urls: "stun:stun.mystunserver.tld" }],
        });
        this.socket = io(import.meta.env.VITE_APP_WEBSOCKET_URL, {
            transports: ["websocket"],
            auth: { username: localStorage.getItem("username") },
        });
        this.stream = null;
        this.makingOffer = false;
        this.ignoreOffer = false;
        this.polite = false;
    }

    async getStream(localVideo: HTMLVideoElement | null) {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
              video: true,
              audio: true,
            });
            stream.getTracks().forEach((track) => this.pc.addTrack(track, stream));
            if (localVideo) localVideo.srcObject = stream;
          } catch (err) {
            console.error("Error accessing media devices:", err);
          }
    }

    async addRemoteStream(remoteVideo : HTMLVideoElement | null) {
        this.pc.ontrack = ({ track, streams }) => {
            track.onunmute = () => {
              if (remoteVideo && !remoteVideo.srcObject) {
                remoteVideo.srcObject = streams[0];
              }
            };
          };
    }


    async sendOffer(strangerId:string) {
        this.pc.onnegotiationneeded = async () => {
            try {
              this.makingOffer = true;
              await this.pc.setLocalDescription();
              this.socket.emit("message", {
                description: this.pc.localDescription,
                to: strangerId,
              });
            } catch (err) {
              console.error("Error during negotiation:", err);
            } finally {
              this.makingOffer = false;
            }
          };
    }

    async handelIce(strangerId:string) {
        this.pc.onicecandidate = ({ candidate }) => {
            this.socket.emit("message", { candidate, to: strangerId });
          };
    }

    async handeMessage(m: {
        description?: RTCSessionDescriptionInit;
        candidate?: RTCIceCandidateInit;
    }, strangerId: string) {
        console.log('handeMessage', m);
        
        if (!m) return;
        const { description, candidate } = m;

        try {
          if (description) {
            const offerCollision =
              description.type === "offer" &&
              (this.makingOffer || this.pc.signalingState !== "stable");

            this.ignoreOffer = !this.polite && offerCollision;
            if (this.ignoreOffer) return;

            await this.pc.setRemoteDescription(description);
            if (description.type === "offer") {
              await this.pc.setLocalDescription();
              this.socket.emit("message", {
                description: this.pc.localDescription,
                to: strangerId,
              });
            }
          } else if (candidate) {
            try {
              await this.pc.addIceCandidate(candidate);
            } catch (err) {
              if (!this.ignoreOffer) throw err;
            }
          }
        } catch (err) {
          console.error("Error processing message:", err);
        }
      }
}
