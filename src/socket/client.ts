import { io, Socket} from "socket.io-client";


export class Client {
    roomCode: string = "";
    socket: Socket; 
    name: string = "";
    answering: boolean = false;
    submitting: boolean = false;
    answer: string = "";

    constructor() {
        this.socket = io("https://jeopardy-amet.onrender.com:3000");
    }

    async connect(roomCode: string, name: string): Promise<any> {
        this.roomCode = roomCode;
        this.name = name;
        return (await this.socket.emitWithAck("join", roomCode, name)).status;
    }

    waitForQuestion(setAnswering: (val: boolean) => void): void {
        this.socket.on("startAnswering", () => {
            setAnswering(true);
        });

        this.socket.on("stopAnswering", () => {
            setAnswering(false);
        });
    }

    startAnswer(): void {
        this.socket.emit("playerStartAnswer", this.name);
    }

    submitAnswer(answer: string): void {
        this.socket.emit("playerSubmitAnswer", answer);
    }
}
