<script lang="ts">
    import { ref} from 'vue';
    export default {
        props: ['host'],
        async mounted() {
            this.host.stopWaitForJoins();
            // const inv = setInterval(() => {
            //    this.starting -= 1; 
            //    if (this.starting === 0) {
            //     clearInterval(inv);
            //    }
            // }, 1000);
            // const p: Promise<any> = this.host.getQuestions();
            // p.then((q) => {
            //     this.questions = q.questions;
            //     console.log(JSON.stringify(this.questions));
            // });
            // MOVE THIS STUFF INSIDE PROMISE.THEN
            this.startTimer();
            this.host.startAnswering();
            this.answering = ref(this.host.answering);
        },
        data() {
            return {
                starting: 0,
                questions: [{"category":"People & Places","question":"Famous Families:- Which American President Married His Cousin ","answer":"Franklin d Roosevelt"},{"category":"People & Places","question":"Where was Albert Einstein Born ","answer":"Germany"},{"category":"People & Places","question":"Which Hollywood Actress Was Convicted Of Shop Lifting In 2002? ","answer":"Winona Ryder"},{"category":"People & Places","question":"Who is David John Cornwell better known as?","answer":"John Le Carre"},{"category":"People & Places","question":"Elvis Presley:- Who said Elvis died the day he joined the army? ","answer":"John Lennon"},{"category":"Science & Nature","question":" __________ can withstand water pressure of up to 850 pounds per square inch.","answer":"Seals"},{"category":"Science & Nature","question":" The hippopotamus has skin an inch_and_a_half thick, so solid that most __________ cannot penetrate it.","answer":"Bullets"},{"category":"Science & Nature","question":"How many Astronaughs crewed the Gemini series of Spacecraft?","answer":"Two"},{"category":"Science & Nature","question":"A rhinoceros has __________ toes on each foot.","answer":"3"},{"category":"Science & Nature","question":" A snail speeding along at three inches per minute would need 15 days to travel __________","answer":"One Mile"},{"category":"Language","question":"\"Entre nous\" means __________.","answer":"Between Ourselves"},{"category":"Language","question":"What is the English word for 'fiesta'?","answer":"Festival"},{"category":"Language","question":"From what language is the term 'finito'?","answer":"Italian"},{"category":"Language","question":"From what Irish words is 'Dublin' derived?","answer":"Dubh Linn"},{"category":"Language","question":"An adjective meaning 'pertaining to the sun.'","answer":"Solar"}],
                questionIndex: 0,
                timer: 10,
                // setinterval has type number apparently
                i: 0,
                showingAnswer: false,
                answering: null
            }
        },
        methods: {
            startTimer() {
                this.timer = 10;
                this.i = setInterval(() => {
                    this.timer -= 1;
                    if (this.timer === 0) {
                        clearInterval(this.i);
                    }
                }, 1000);
            }
        },
        watch: {
            answering: function (ans) {
                console.log('im watching u boi');
                clearInterval(this.i);
            }
        }
    }
</script>

<template>
    <template v-if="!questions.length || starting > 0">
        <h1><span v-if="starting > 0">Game starts in {{ starting }}...</span> <span v-else>Waiting for questions...</span></h1>
    </template>
    <template v-else-if="!showingAnswer">
        <h1 v-html="questions[questionIndex].category"></h1>
        <h1 v-html="questions[questionIndex].question"></h1>
        <h1 v-if="i">{{ timer }}</h1>
        <h1 v-else>Waiting for {{ answering }}</h1>
        <h2><span v-for="p in host.players">{{ p.name }}: {{ p.score }}&nbsp;</span></h2>
    </template>
</template>

<style scoped>
</style>