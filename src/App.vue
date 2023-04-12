<script lang="ts">
    import Landing from './components/Landing.vue'
    export default {
        data() {
            return {
                host: false,
                roomCode: ""
            }
        },
        methods: {
            cont() {

            }
        }
    }
</script>

<template>
    <main>
        <Landing @cont="cont" />
    </main>
</template>

<style scoped>
</style>
