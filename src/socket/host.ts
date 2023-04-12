import { io, Socket} from "socket.io-client";


export class Host {
    code: string = "";
    socket: Socket; 

    constructor() {
        this.socket = io("localhost:3000");
        this.connect();
    }

    async connect(): Promise<any> {
        return await this.socket.emitWithAck("host");
    }

}