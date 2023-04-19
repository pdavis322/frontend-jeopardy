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
            startAnswer() {
                this.client.startAnswer();
            }
            // submit() {
                // this.client.submit(this.answer);
            // }
        }
    }
</script>

<template>
    <h1 v-if="!client.answering">
        Waiting...
    </h1>
    <template v-else>
        <button @click="startAnswer">Answer</button>
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
