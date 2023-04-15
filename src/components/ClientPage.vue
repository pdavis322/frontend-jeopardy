<script lang="ts">
    export default {
        props: ['client'],
        data() {
            return {
                waiting: true
            }
        }
    }
</script>

<template>
    <h1 v-if="waiting">
        Waiting...
    </h1>
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
