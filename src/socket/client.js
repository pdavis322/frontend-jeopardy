import { io, Socket } from "socket.io-client";
export class Client {
    roomCode = "";
    socket;
    name = "";
    answering = false;
    submitting = false;
    answer = "";
    constructor() {
        this.socket = io();
    }
    async connect(roomCode, name) {
        this.roomCode = roomCode;
        this.name = name;
        return (await this.socket.emitWithAck("join", roomCode, name)).status;
    }
    waitForQuestion(setAnswering) {
        this.socket.on("startAnswering", () => {
            setAnswering(true);
        });
        this.socket.on("stopAnswering", () => {
            setAnswering(false);
        });
    }
    startAnswer() {
        this.socket.emit("playerStartAnswer", this.name);
    }
    submitAnswer(answer) {
        this.socket.emit("playerSubmitAnswer", answer);
    }
}
