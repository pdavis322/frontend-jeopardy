import { io, Socket} from "socket.io-client";


export class Host {
    code: string;
    socket: Socket; 

    constructor() {
        this.socket = io("localhost:3000");
        this.code = "";
        this.socket.emit("host", (response: any) => {
            console.log(this.code);
        });
    }

    async connect(): Promise<void> {

    }

}