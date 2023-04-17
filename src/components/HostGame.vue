<script lang="ts">
    export default {
        props: ['host'],
        async mounted() {
            this.host.stopWaitForJoins();
            // const inv = setInterval(() => {
            //    this.starting -= 1; 
            //    if (this.starting === 0) {
            //     clearInterval(inv);
            //    }
            // }, 1000);
            const p: Promise<any> = this.host.getQuestions();
            p.then((q) => {
                this.questions = q.questions;
                console.log(this.questions);
            });
            this.startTimer();
            this.host.getAnswering();
        },
        data() {
            return {
                starting: 0,
                questions: [{category: "", question: ""}],
                questionIndex: 0,
                timer: 10,
                // setinterval has type number apparently
                i: 0
            }
        },
        methods: {
            startTimer() {
                this.timer = 10;
                this.i = setInterval(() => {
                    this.timer -= 1;
                    if (this.timer === 0) {
                        clearInterval(this.i);
                    }
                }, 1000);
            }
        }
    }
</script>

<template>
    <template v-if="!questions.length || starting > 0">
        <h1><span v-if="starting > 0">Game starts in {{ starting }}...</span> <span v-else>Waiting for questions...</span></h1>
    </template>
    <template v-else>
        <h1 v-html="questions[questionIndex].category"></h1>
        <h1 v-html="questions[questionIndex].question"></h1>
        <h2><span v-for="p in host.players">{{ p.name }}: {{ p.score }}&nbsp;</span></h2>
    </template>
</template>

<style scoped>
</style>