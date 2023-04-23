import { io, Socket } from "socket.io-client";
export class Host {
    roomCode = '';
    socket;
    players = {};
    constructor() {
        this.socket = io();
    }
    async connect() {
        this.roomCode = (await this.socket.emitWithAck('host')).roomCode;
    }
    waitForJoins() {
        this.socket.on('playerJoined', (name) => {
            this.players[name] = { score: 0, answering: false, correct: "", answer: "", result: 0 };
        });
    }
    stopWaitForJoins() {
        this.socket.removeAllListeners('playerJoined');
    }
    getQuestions() {
        return this.socket.emitWithAck('getQuestions');
    }
    startAnswering(changeAnswering) {
        this.socket.emit('startPlayerAnswering');
        this.socket.on('playerStartAnswer', (name) => {
            changeAnswering(name, true);
        });
        this.socket.on('playerStopAnswer', (name) => {
            changeAnswering(name, false);
        });
    }
    stopAnswering() {
        this.socket.emit('stopPlayerAnswering');
    }
    async getResults() {
        return (await this.socket.emitWithAck("getResults")).results;
    }
    gameOver() {
        this.socket.emit('gameOver');
    }
}
