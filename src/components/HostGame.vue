<script lang="ts">
    export default {
        props: ['host'],
        data() {
            return {
                starting: 5
            }
        },
        async mounted() {
            this.host.stopWaitForJoins();
            await this.host.getQuestion();
            const i = setInterval(() => {
               this.starting -= 1; 
               if (this.starting === 0) {
                clearInterval(i);
               }
            }, 1000);
        }
    }
</script>

<template>
    <template v-if="starting >= 0">
        <h1>Game starts in {{ starting }}...</h1>
    </template>
    <template v-else>
        <h2><span v-for="p in host.players">{{ p.name }}: {{ p.score }}&nbsp;</span></h2>
    </template>
</template>

<style scoped>
</style>