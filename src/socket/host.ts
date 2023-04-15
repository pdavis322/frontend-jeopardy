import { io, Socket} from 'socket.io-client';


export class Host {
    roomCode: string = '';
    socket: Socket; 
    players: Object[] = [];

    constructor() {
        this.socket = io('localhost:3000');
    }

    async connect(): Promise<any> {
        this.roomCode = (await this.socket.emitWithAck('host')).roomCode;
    }

    waitForJoins(): void {
        this.socket.on('playerJoined', (name) => {
            this.players.push({name: name, score: 0});
        })
    }

    stopWaitForJoins(): void {
        this.socket.removeAllListeners('playerJoined');
    }

    async getQuestion(): Promise<any> {
        this.socket.emit('getQuestion');
    }

}