<script lang="ts">
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
            this.startTimer();
            this.host.getAnswering();
        },
        data() {
            return {
                starting: 0,
                questions: [["Entertainment: Film","What was Dorothy&#039;s surname in &#039;The Wizard Of Oz&#039;?","Gale"],["Geography","Which of these African countries list &quot;Spanish&quot; as an official language?","Equatorial Guinea"],["Entertainment: Japanese Anime & Manga","How many &quot;JoJos&quot; that are protagonists are there in the series &quot;Jojo&#039;s Bizarre Adventure&quot;?","8"],["Entertainment: Video Games","What is the hardest possible difficulty in &quot;Deus Ex: Mankind Divided&quot;?","I Never Asked For This"],["Sports","Who won the UEFA Champions League in 2017?","Real Madrid C.F."],["Entertainment: Video Games","Which of the following is NOT an official game in Nintendo&#039;s Super Smash Bros. series?","Super Smash Bros. Crusade"],["Entertainment: Video Games","Which Crypt of the NecroDancer (2015) character has a soundtrack by Jake &quot;Virt&quot; Kaufman?","Uncle Eli"],["Entertainment: Music","Which of these songs is NOT in The Beatles&#039; album &quot;Sgt. Pepper&#039;s Lonely Hearts Club Band&quot;?","Strawberry Fields Forever"],["Entertainment: Film","Which director directed the movie &quot;Pan&#039;s Labyrinth&quot;?","Guillermo Del Toro"],["Sports","Who was the topscorer for England national football team?","Wayne Rooney"],["Science & Nature","What is the scientific name of the knee cap?","Patella"],["Entertainment: Video Games","In &quot;Earthbound&quot;, how does one enter &quot;Master Belch&#039;s&quot; factory?","Wait 3 Minutes"],["Entertainment: Video Games","In &quot;Call Of Duty: Zombies&quot;, which map&#039;s opening cutscene shows &quot;Richtofen&quot; killing another version of himself?","The Giant"],["Entertainment: Japanese Anime & Manga","Which animation studio produced &quot;Log Horizon&quot;?","Satelite"],["Entertainment: Comics","Which of the following rings from the DC Comics&#039; &quot;Lantern Corps&quot; are classified as Parasitic?","Indigo (Compassion)"],["Sports","Which city features all of their professional sports teams&#039; jersey&#039;s with the same color scheme?","Pittsburgh"],["Entertainment: Music","Who had a 1983 hit with the song &#039;Africa&#039;?","Toto"],["Celebrities","Which celebrity announced his presidency in 2015?","Kanye West"],["Entertainment: Video Games","What year was Super Mario Bros. released?","1985"],["Entertainment: Board Games","What is the maximum level you can have in a single class in Dungeons and Dragons (5e)?","20"],["Entertainment: Music","The Rush song &quot;YYZ&quot; derives its name from the IATA aiport identification code for which city?","Toronto"],["Entertainment: Music","The song &quot;Twin Size Mattress&quot; was written by which band?","The Front Bottoms"],["Entertainment: Video Games","In Forza Motorsport 6, which of these track-exclusive cars was NOT featured in the game, either originally with the game or added as DLC?","Aston Martin Vulcan"],["Entertainment: Video Games","In which order do you need to hit some Deku Scrubs to open the first boss door in &quot;Ocarina of Time&quot;?","2, 3, 1"],["History","What year were the Marian Reforms instituted in the Roman Republic?","107 BCE"],["General Knowledge","What is the Portuguese word for &quot;Brazil&quot;?","Brasil"],["General Knowledge","According to Fair Works Australia, how long do you have to work to get Long Service Leave?","7 years"],["Vehicles","Which Audi does not use Haldex based all wheel drive system?","Audi A8"],["Entertainment: Video Games","What is the 4th boss in the 1997 video game &quot;Crash Bandicoot 2: Cortex Strikes Back&quot;?","Dr. N. Gin"],["Entertainment: Music","A Caixa Malacacheta is what kind of musical instrument which is commonly used in Latin American music?","Snare Drum"],["Entertainment: Video Games","Which of these characters from Final Fantasy VIII primarily spoke in one word sentences?","Fujin"],["Animals","To which biological phylum do all mammals, birds and reptiles belong?","Chordata"]],
                questionIndex: 0,
                timer: 10,
                // setinterval has type number apparently
                i: 0
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
        }
    }
</script>

<template>
    <template v-if="!questions.length || starting > 0">
        <h1><span v-if="starting > 0">Game starts in {{ starting }}...</span> <span v-else>Waiting for questions...</span></h1>
    </template>
    <template v-else>
        <h1 v-html="questions[questionIndex][0]"></h1>
        <h1 v-html="questions[questionIndex][1]"></h1>
        <h2><span v-for="p in host.players">{{ p.name }}: {{ p.score }}&nbsp;</span></h2>
    </template>
</template>

<style scoped>
</style>