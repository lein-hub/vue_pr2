<template>
<div>
    <div id="screen" :class="state" @click="onClickScreen">{{message}}</div>
    <div v-show="result.length">
        <div>반응 속도: {{time}} ms</div>
        <div>평균 시간: {{average}} ms</div>
        <button @click="onReset">리셋</button>
    </div>
</div>
    
</template>

<script>
let startTime = 0;
let endTime = 0;
let timeout = null;
export default {
    data() {
        return {
            result: [],
            state: 'waiting',
            message: '클릭해서 시작하세요',
            time: '',
        }
    },
    computed: {
        average() {
            return Math.round(this.result.reduce((a, c) => a+c, 0) / this.result.length * 1000) / 1000 || 0;
        }
    },
    methods: {
        onReset() {
            this.result = [];
        },
        onClickScreen() {
            if (this.state === 'waiting') {
                this.state = 'ready';
                this.message = '초록색이 되면 클릭하세요';
                timeout = setTimeout(() => {
                    this.state = 'now';
                    this.message = '클릭하세요!';
                    startTime = new Date();
                }, Math.floor(Math.random() * 1000) + 2000); // 2~3초
            } else if (this.state === 'ready') {
                clearTimeout(timeout);
                this.state = 'waiting';
                this.message = '너무 성급하시군요! 초록색이 된 후에 클릭하세요';
            } else if (this.state === 'now') {
                endTime = new Date();
                this.state = 'waiting';
                this.message = '클릭해서 시작하세요';
                this.result.push(endTime - startTime);
                this.time = endTime - startTime
            }
        }
    },
};
</script>

<style scoped>
    #screen {
        width: 300px;
        height: 200px;
        text-align: center;
        user-select: none;
    }

    #screen.waiting {
        background-color: aqua;
    }

    #screen.ready {
        background-color: red;
        color: white;
    }

    #screen.now {
        background-color: greenyellow;
    }
</style>