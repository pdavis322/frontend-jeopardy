<script setup lang="ts">
    import { Host } from "@/socket/host";
    function host(): void {
        const h = new Host();
        console.log(h.code);
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
