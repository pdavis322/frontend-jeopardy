<script lang="ts">
    import Landing from './components/Landing.vue';
    import HostPage from './components/HostPage.vue';
    import ClientPage from './components/ClientPage.vue';
    import type { Host } from './socket/host';
    import type { Client } from './socket/client';
    export default {
        data() {
            return {
                hostOrClient: {} as Host | Client
            }
        },
        methods: {
            cont(hostOrClient: Host | Client) {
                this.hostOrClient = hostOrClient;
            }
        },
        components: {
            Landing,
            ClientPage,
            HostPage
        }
    }
</script>

<template>
    <main>
        <Landing v-if="!hostOrClient.roomCode" @cont="cont" />
        <ClientPage v-else-if="'name' in hostOrClient" />
        <HostPage v-else :host="hostOrClient" />
    </main>
</template>

<style scoped>
</style>
