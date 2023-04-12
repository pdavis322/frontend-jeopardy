<script lang="ts">
    import { Host } from "@/socket/host";
    export default {
        data() {
            return {
                code: ''
            }
        },
        methods: {
            async host(): Promise<void> {
                const h = new Host();
                this.code = (await h.connect()).code;
            }
        }
    }
</script>

<template>
    <div id="landing">
        <h1>
            Jeopardy!
        </h1>
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
