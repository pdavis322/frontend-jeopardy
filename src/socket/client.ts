import { io, Socket} from "socket.io-client";


export class Client {
    roomCode: string = "";
    socket: Socket; 
    name: string = "";
    answering: boolean = false;

    constructor() {
        this.socket = io("localhost:3000");
    }

    async connect(roomCode: string, name: string): Promise<any> {
        this.roomCode = roomCode;
        this.name = name;
        return (await this.socket.emitWithAck("join", roomCode, name)).status;
    }

    waitForQuestion(): void {
        this.socket.on("startAnswering", () => {
            this.answering = true;
        });
    }

    startAnswer(): void {
        this.socket.emit("playerStartAnswer", this.name);
    }
    // submit(answer: string): void {
    //     this.socket.emit("playerAnswer", answer);
    // }



}