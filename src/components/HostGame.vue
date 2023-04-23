<script lang="ts">
    import type { Player } from '../socket/host';
    const timerLength = 10;
    export default {
        props: ['host'],
        async mounted() {
            this.host.stopWaitForJoins();
            this.players = this.host.players;
            const inv = setInterval(() => { 
               this.starting -= 1; 
               if (this.starting === 0) {
                clearInterval(inv);
               }
            }, 1000);
            const p: Promise<any> = this.host.getQuestions();
            p.then((q) => {
                this.questions = q.questions;
                this.startTimer();
            });
        },
        data() {
            return {
                starting: 5,
                // starting: 0,
                questions: [],
                questionIndex: 0,
                timer: timerLength,
                // setinterval has type number apparently
                i: 0,
                players: {} as Record<string, Player>,
                currentlyAnswering: "",
                showingResults: false,
                gameOver: false
            }
        },
        methods: {
            startTimer(): void {
                this.host.startAnswering(this.changeAnswering);
                this.timer = timerLength;
                this.i = setInterval(() => {
                    this.timer -= 1;
                    if (this.timer === 0) {
                        clearInterval(this.i);
                        this.host.stopAnswering();
                        setTimeout(async () => {
                            this.i = 0;
                            if (!this.currentlyAnswering) {
                                await this.showResults();
                            }
                        }, 1000);
                    }
                }, 1000);
            },
            changeAnswering(name: string, add: boolean): void {
                this.players[name].answering = add;         
                this.currentlyAnswering = Object.entries(this.players).filter(p => p[1].answering).map(p => p[0]).join(', ');
            },
            async showResults(): Promise<void> {
                const r = await this.host.getResults();
                this.showingResults = true;
                for (const p of r) {
                    const { name, score, answer } = p;
                    this.players[name].result = score;
                    this.players[name].correct = score > 0 ? "correct" : "incorrect";
                    this.players[name].score += score;
                    this.players[name].answer = answer;
                }
            },
            nextQuestion(): void {
                this.questionIndex += 1;
                if (this.questionIndex === this.questions.length) {
                    this.gameOver = true;
                }
                else {
                    for (const p in this.players) {
                        this.players[p].answer = "";
                        this.players[p].correct = "";
                        this.players[p].result = 0;
                    }
                    this.showingResults = false;
                    this.startTimer();
                }
            },
            override(name: string): void {
                const p = this.players[name];
                p.score += -p.result * 2;
                p.correct = "";
            }
        },
        watch: {
            currentlyAnswering(newVal, oldVal) {
                if (oldVal !== "" && newVal === "" && this.i === 0) {
                    this.showResults();
                }
            }
        }
    }
</script>

<template>
    <template v-if="!questions.length || starting > 0">
        <h1><span v-if="starting > 0">Game starts in {{ starting }}...</span> <span v-else>Waiting for questions...</span></h1>
    </template>
    <template v-else-if="!gameOver">
        <h1 v-html="questions[questionIndex].category"></h1>
        <h1 v-html="questions[questionIndex].question"></h1>
        <h1 v-if="i != 0"><span v-if="timer != 0">{{ timer }}</span></h1>
        <h1 v-if="currentlyAnswering">Waiting for {{ currentlyAnswering }}</h1>
        <h1 v-else-if="showingResults">Answer: {{ questions[questionIndex].answer }}</h1>
        <div class="scores">
            <div v-for="p in Object.keys(players)">
                <div class="score">{{ p }}: <span :class="players[p].correct"> {{ players[p].score }}</span> &nbsp;</div><div class="score">{{ players[p].answer }}</div><button class="score" @click="override(p)" v-if="players[p].correct">Override</button>
            </div>
        </div>
        <button @click="nextQuestion" v-if="showingResults">Next</button>
    </template>
    <template v-else>
        <h1>Game Over</h1>
            <div v-for="p in Object.keys(players)">
                <h1 class="score">{{ p }}: {{ players[p].score }}&nbsp;</h1>
            </div>
    </template>
</template>

<style scoped>
.scores {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    margin: 1.5rem;
}

.score, button {
    font-size: 1.5rem;
    margin: 1rem;
    font-weight: bold;
}

.correct {
    color: green;
}

.incorrect {
    color: red;
}
</style>