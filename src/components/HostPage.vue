<script lang="ts">
    import HostGame from './HostGame.vue';
    export default {
        props: ['host'],
        data() {
            return {
                waiting: true
            }
        },
        methods: {
        },
        mounted() {
            this.host?.waitForJoins();
        },
        components: {HostGame}
    }
</script>

<template>

    <template v-if="waiting">
        <h1>
            Room code: {{ host?.roomCode }}
        </h1>
        <h2>Players connected: <br /> <span v-for="p in host.players">{{ p.name }}<br /></span></h2>
        <br />
        <button v-if="host.players.length" @click="waiting=false">Start game</button>
    </template>

    <HostGame :host="host" v-else />

</template>

<style scoped>
</style>
