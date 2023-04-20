import { io, Socket } from "socket.io-client";

export interface Player {
    score: number;
    answering: boolean;
}

export class Host {
    roomCode: string = '';
    socket: Socket; 
    players: Record<string, Player> = {};

    constructor() {
        this.socket = io('localhost:3000');
    }

    async connect(): Promise<any> {
        this.roomCode = (await this.socket.emitWithAck('host')).roomCode;
    }

    waitForJoins(): void {
        this.socket.on('playerJoined', (name: string) => {
            this.players[name] = {score: 0, answering: false};
        })
    }

    stopWaitForJoins(): void {
        this.socket.removeAllListeners('playerJoined');
    }

    getQuestions(): Promise<any> {
        return this.socket.emitWithAck('getQuestions'); 
    }

    startAnswering(addAnswering: (name: string) => void): void {
        this.socket.emit('startPlayerAnswering');
        this.socket.on('playerStartAnswer', (name) => {
            addAnswering(name);
        });
    }

    stopAnswering(): void {
        this.socket.emit('stopPlayerAnswering');
    }


}