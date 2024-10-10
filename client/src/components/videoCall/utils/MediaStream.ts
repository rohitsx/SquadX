export default class Media {
	public static Stream: MediaStream;
	constructor() {
		Media.Stream = new MediaStream();
	}

	static async GetStream(){
		const constraints = {
			'video': {
				width: { max: 1920 },
				height: { max: 1080 }
			},
			'audio': {
				echoCancellation: true, 
				noiseSuppression: true,
				autoGainControl: true
			}
		}
		try {
			const stream = await navigator.mediaDevices.getUserMedia(constraints)
			this.Stream = stream
		} catch (err) {
			console.log("err acces local media stream", err)
		}
	}

	static async Close(){
		this.Stream.getTracks().forEach(track => track.stop())
	}
}
