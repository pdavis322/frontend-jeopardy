<script setup lang="ts">
    import { Host } from "@/socket/host";
</script>

<template>
    <div id="landing">
        <h1>
            Room code: {{ roomCode }}
        </h1>
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
