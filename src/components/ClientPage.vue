<script lang="ts">
    const timerLength = 15;
    export default {
        props: ['client'],
        mounted() {
            this.client.waitForQuestion((val: boolean) => {if (!this.submitting) this.answering = val});
        },
        data() {
            return {
                answering: false,
                answer: "",
                submitting: false,
                timer: timerLength,
                i: 0
            }
        },
        methods: {
            submit() {
                clearInterval(this.i);
                if (this.submitting) {
                    this.client.submitAnswer(this.answer);
                    this.answer = "";
                    this.submitting = false;
                    this.answering = false;
                }
                else {
                    this.client.startAnswer();
                    this.submitting = true;
                    this.startTimer();
                }
            },
            startTimer() {
                this.timer = timerLength;
                this.i = setInterval(() => {
                    this.timer -= 1;
                    if (this.timer === 0) {
                        clearInterval(this.i);
                        this.submit();
                    }
                }, 1000);

            }
        }
    }
</script>

<template>
    <h1 v-if="!answering">
        Waiting...
    </h1>
    <template v-else>
        <template v-if="submitting">
            <h1>{{ timer }}</h1>
            <input type="text" autofocus autocomplete="off" v-model="answer" v-on:keyup.enter="submit" v-if="submitting" />
            <br />
        </template>
        <button @click="submit">Answer</button>
    </template>
</template>

<style scoped>
    button {
        margin: 2rem;
    }
    input {
        margin: 1rem;
    }
    #landing {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>
