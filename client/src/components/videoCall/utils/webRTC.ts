import { Socket } from "socket.io-client";
import Media from "./MediaStream";

type handelOfferProp = {
  socket: Socket;
  message: {
    description?: RTCSessionDescriptionInit;
    candidate?: RTCIceCandidateInit;
  };
  strangerId: string;
  polite: boolean;
};

export class WebRTC {
  public PeerConnection: RTCPeerConnection;
  private MakingOffer: boolean;
  private IgnoreOffer: boolean;
  public polite: boolean;
	

  constructor() {
    this.PeerConnection = new RTCPeerConnection();
    this.MakingOffer = false;
    this.IgnoreOffer = false;
	this.polite = false;
  }

  public async start() {
    this.PeerConnection = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.mystunserver.tld" }],
    });

    await Media.GetStream();
  }

  public async sendOffer(socket: Socket, strangerId: string) {
    for (const track of Media.Stream.getTracks()) {
      this.PeerConnection.addTrack(track, Media.Stream);
    }
    this.PeerConnection.onicecandidate = ({ candidate }) => {
      socket.emit("message", { candidate, to: strangerId });
    };

    this.PeerConnection.onnegotiationneeded = async () => {
      try {
        this.MakingOffer = true;
        await this.PeerConnection.setLocalDescription();
        socket.emit("message", {
          description: this.PeerConnection.localDescription,
          to: strangerId,
        });
      } catch (err) {
        console.error("error sending offer", err);
      } finally {
        this.MakingOffer = false;
      }
    };
  }

  public async handelOffer({ socket, message, strangerId, polite }: handelOfferProp) {
	this.polite = polite
    const { description, candidate } = message;
    try {
      if (description) {
        const offerCollision =
          description.type === "offer" &&
          (this.MakingOffer || this.PeerConnection.signalingState !== "stable");

		console.log('polite', this.polite)
        this.IgnoreOffer = !this.polite && offerCollision;
        if (this.IgnoreOffer) return;

        await this.PeerConnection.setRemoteDescription(description);
        if (description.type === "offer") {
          await this.PeerConnection.setLocalDescription();
          socket.emit("message", {
            description: this.PeerConnection.localDescription,
            to: strangerId,
          });
        }
      } else if (candidate) {
        try {
          await this.PeerConnection.addIceCandidate(candidate);
        } catch (err) {
          if (!this.IgnoreOffer) {
            throw err;
          }
        }
      }
    } catch (err) {
      console.error("error in handel offer", err);
    }
  }
}
