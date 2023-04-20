<script lang="ts">
    export default {
        props: ['client'],
        mounted() {
            this.client.waitForQuestion();
        },
        data() {
            return {
                answer: ""
            }
        },
        methods: {
            submit() {
                if (this.client.submitting) {
                    this.client.submitAnswer(this.answer);
                }
                else {
                    this.client.startAnswer();
                }
            }
        }
    }
</script>

<template>
    <h1 v-if="!client.answering">
        Waiting...
    </h1>
    <template v-else>
        <input type="text" v-model="answer" v-if="client.submitting" />
        <button @click="submit">Answer</button>
    </template>
</template>

<style scoped>
    button {
        margin: 2rem;
    }
    #landing {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>
