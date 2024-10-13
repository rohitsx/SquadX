import Media from "./MediaStream";

type strangerProp = {

  pairId: string;
  pairName: string;
  polite: boolean;
};


export default class SoloCallUtils {
  private webRTC: any;
  private setStream: (stream: any) => void;
  private setStranger: (stranger: any) => void;
  private setIsMatched: (isMatched: boolean) => void;
  private setMessages: (messages: any[]) => void;
  private socket: any;
  private stranger: any;

  constructor(
    webRTC: any,
    setStream: (stream: any) => void,
    setStranger: (stranger: any) => void,
    setIsMatched: (isMatched: boolean) => void,
    setMessages: (messages: any[]) => void,
    socket: any
  ) {
    this.webRTC = webRTC;
    this.setStream = setStream;
    this.setStranger = setStranger;
    this.setIsMatched = setIsMatched;
    this.setMessages = setMessages;
    this.socket = socket;
  }

  async media() {
    await this.webRTC.start(); // start the stream too from Media class
    this.setStream(Media.Stream);
  }

  handelPeer(data: strangerProp) {
    console.log("received stranger id and username", this.socket?.id);
    this.setStranger({
      pairId: data.pairId,
      pairName: data.pairName,
      polite: data.polite,
    });
    this.setIsMatched(true);
  }

  handelCallEnd() {
    this.setMessages([]);
    this.setStranger(null);
    this.webRTC.polite = false;
  }

  strangerLeft() {
    this.handelCallEnd();
    this.socket?.emit("connectPeer");
    console.log(this.socket?.id);
    this.setIsMatched(false);
    console.log("received stranger left");
  }

  handleBeforeUnload = () => {
    this.socket?.emit("pairedclosedtab", this.stranger?.pairId);
    this.socket?.disconnect();
  }
}
