import { io, Socket} from "socket.io-client";


export class Host {
    roomCode: string = "";
    socket: Socket; 

    constructor() {
        this.socket = io("localhost:3000");
    }

    async connect(): Promise<any> {
        this.roomCode = (await this.socket.emitWithAck("host")).code;
    }

}