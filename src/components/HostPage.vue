<script lang="ts">
    import { Host } from "@/socket/host";
    export default {
        props: {
            roomCode: String
        },
        data() {
            return {
                players: []
            }
        }
    }
</script>

<template>
    <div id="landing">
        <h1>
            Room code: {{ roomCode }}
        </h1>
        <h2>Players connected: <span v-for="p in players">{{ p }}</span></h2>
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
