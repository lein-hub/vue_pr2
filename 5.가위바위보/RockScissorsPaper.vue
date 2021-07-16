<template>
<div>
    <div id="computer" :style="computedStyleObject"></div>
    <div>
        <button @click="onClickButton('rock')">바위</button>
        <button @click="onClickButton('scissors')">가위</button>
        <button @click="onClickButton('paper')">보</button>
    </div>
    <div>{{result}}</div>
    <div>현재 {{score}}점</div>
</div>
    
</template>

<script>
let interval = null;
const rspCoords = {
    rock: '0',
    scissors: '-142px',
    paper: '-280px',
};

const scores = {
    scissors: 1,
    rock: 0,
    paper: -1,
};

const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find(function(v) {
        return v[1] === imgCoord;
    })[0];
};
export default {
    data() {
        return {
            imgCoord: rspCoords.rock,
            result: '',
            score: 0,
        }
    },
    computed: {
        computedStyleObject() {
            return { background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${this.imgCoord} 0`};
        }
    },
    methods: {
        changeHand() {
            interval = setInterval(() => {
                if (this.imgCoord === rspCoords.rock) {
                    this.imgCoord = rspCoords.scissors;
                } else if (this.imgCoord === rspCoords.scissors) {
                    this.imgCoord = rspCoords.paper;
                } else {
                    this.imgCoord = rspCoords.rock;
                }
            }, 100);
        },
        onClickButton(choice) {
            clearInterval(interval);
            const myScore = scores[choice];
            const cpuScore = scores[computerChoice(this.imgCoord)];
            const diff = myScore - cpuScore;
            if (diff === 0) {
                this.result = '비겼습니다.';
            } else if ([-1, 2].includes(diff)) {
                this.result = '이겼습니다.';
                this.score++;
            } else {
                this.result = '졌습니다.';
                this.score--;
            }

            setTimeout(() => {
                this.changeHand();
            }, 2000);
        }
    },
    mounted() {
        this.changeHand();
    },
    beforeDestroy() {
        clearInterval(interval);
    },
};
</script>

<style scoped>
    #computer {
        width: 142px;
        height: 200px;
        background-position: 0 0;
    }
</style>