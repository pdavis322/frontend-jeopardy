import { io, Socket} from "socket.io-client";


export class Client {
    roomCode: string = "";
    socket: Socket; 
    name: string = "";

    constructor() {
        this.socket = io("localhost:3000");
    }

    async connect(roomCode: string, name: string): Promise<any> {
        this.roomCode = roomCode;
        return (await this.socket.emitWithAck("join", roomCode, name)).status;
    }

}