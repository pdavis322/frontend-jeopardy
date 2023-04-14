import { io, Socket} from "socket.io-client";


export class Client {
    roomCode: string = "";
    socket: Socket; 
    name: string = "";

    constructor() {
        this.socket = io("localhost:3000");
        this.connect();
    }

    async connect(): Promise<any> {
        this.roomCode = await this.socket.emitWithAck("host");
    }

}