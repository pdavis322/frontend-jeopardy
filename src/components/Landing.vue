<script lang="ts">
    import { Host } from "@/socket/host";
    export default {
        data() {
            return {
                roomCode: ''
            }
        },
        methods: {
            async host(): Promise<void> {
                const h = new Host();
                await h.connect();
                this.$emit('cont', h);
            },
            async join(): Promise<void> {

            }
        },
        emits: ['cont']
    }
</script>

<template>
    <div id="landing">
        <h1>Trivia</h1>
        <button @click="host">Host Game</button>
        <button>Join Game</button>
    </div>
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
