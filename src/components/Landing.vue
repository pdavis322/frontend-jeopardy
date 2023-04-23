<script lang="ts">
    import { Host } from "@/socket/host";
    import { Client } from "@/socket/client";
    export default {
        data() {
            return {
                roomCode: '',
                name: '',
                joining: false
            }
        },
        methods: {
            async host(): Promise<void> {
                const h = new Host();
                await h.connect();
                this.$emit('cont', h);
            },
            async join(): Promise<void> {
                if (!this.roomCode || !this.name) {
                    alert('Please enter room code and name');
                }
                else {
                    const c = new Client();
                    let status: string = await c.connect(this.roomCode, this.name);
                    if (status === 'room') {
                        alert('Please enter valid room code');
                    }
                    else if (status === 'name') {
                        alert('Name already in use');
                    }
                    else {
                        this.$emit('cont', c);
                    }
                }
            }
        },
        emits: ['cont']
    }
</script>

<template>
    <div id="landing">
        <h1>Trivia</h1>
        <template v-if="!joining">
            <button @click="host">Host Game</button>
            <button @click="joining=true">Join Game</button>
        </template>
        <template v-else>
            <input placeholder="Room code" type="text" v-model.trim="roomCode" v-on:keyup.enter="join" />
            <br />
            <input placeholder="Name" autocomplete="off" type="text" v-model="name" v-on:keyup.enter="join" />
            <button @click="join">Join</button>
        </template>
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
    ::placeholder {
        color: white;
    }
</style>
