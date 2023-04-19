import { io, Socket } from "socket.io-client";
export class Host {
    roomCode: string = '';
    socket: Socket; 
    players: Object[] = [];
    answering: Set<string> = new Set();

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

    getQuestions(): Promise<any> {
        return this.socket.emitWithAck('getQuestions'); 
    }

    startAnswering(): void {
        this.socket.emit('startPlayerAnswering');
        this.socket.on('playerStartAnswer', (name) => {
            console.log('player answering');
            this.answering.add(name);
            console.log(this.answering);
        });
    }


}