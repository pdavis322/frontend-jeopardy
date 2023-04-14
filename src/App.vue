<script lang="ts">
    import Landing from './components/Landing.vue';
    import HostPage from './components/HostPage.vue';
    import type { Host } from './socket/host';
    import type { Client } from './socket/client';
    export default {
        data() {
            return {
                roomCode: "",
                host: false
            }
        },
        methods: {
            cont(hostOrClient: Host | Client) {
                if ('name' in hostOrClient) {
                }
                else {
                    this.roomCode = hostOrClient.roomCode;
                    this.host = true;
                }
            }
        },
        components: {
            Landing,
            HostPage
        }
    }
</script>

<template>
    <main>
        <Landing v-if="!roomCode" @cont="cont" />
        <HostPage :room-code="roomCode" v-else-if="host" />
    </main>
</template>

<style scoped>
</style>
