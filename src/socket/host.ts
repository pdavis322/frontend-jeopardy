import { io, Socket } from "socket.io-client";

export interface Player {
    score: number;
    answering: boolean;
    answer: string;
    result: number;
    correct: string;
}

export interface Question {
    [key: string]: string
}

export class Host {
    roomCode: string = '';
    socket: Socket; 
    players: Record<string, Player> = {};

    constructor() {
        this.socket = io("htps://ec2-18-118-167-100.us-east-2.compute.amazonaws.com");
    }

    async connect(): Promise<any> {
        this.roomCode = (await this.socket.emitWithAck('host')).roomCode;
    }

    waitForJoins(): void {
        this.socket.on('playerJoined', (name: string) => {
            this.players[name] = {score: 0, answering: false, correct: "", answer: "", result: 0};
        })
    }

    stopWaitForJoins(): void {
        this.socket.removeAllListeners('playerJoined');
    }

    getQuestions(): Promise<any> {
        return this.socket.emitWithAck('getQuestions'); 
    }

    startAnswering(changeAnswering: (name: string, add: boolean) => void): void {
        this.socket.emit('startPlayerAnswering');
        this.socket.on('playerStartAnswer', (name) => {
            changeAnswering(name, true);
        });
        this.socket.on('playerStopAnswer', (name) => {
            changeAnswering(name, false);
        });
    }

    stopAnswering(): void {
        this.socket.emit('stopPlayerAnswering');
    }

    async getResults(): Promise<any> {
        return (await this.socket.emitWithAck("getResults")).results;
    }

    gameOver(): void {
        this.socket.emit('gameOver');
    }


}