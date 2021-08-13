<template>
    <div v-if="currentGame === 'number-baseball'">
        <number-base-ball></number-base-ball>
    </div>
    <div v-else-if="currentGame === 'response-check'">
        <response-check></response-check>
    </div>
    <div v-else-if="currentGame === 'rock-scissors-paper'">
        <rock-scissors-paper></rock-scissors-paper>
    </div>
    <div v-else-if="currentGame === 'lotto-generator'">
        <lotto-generator></lotto-generator>
    </div>
    <div v-else-if="currentGame === 'tic-tac-toe'">
        <tic-tac-toe></tic-tac-toe>
    </div>
    <div v-else-if="currentGame === 'mine-sweeper'">
        <mine-sweeper></mine-sweeper>
    </div>
    <div v-else>일치하는 게임을 찾을 수 없습니다.</div>
</template>

<script>
import NumberBaseBall from '../3.숫자야구/NumberBaseBall'
import ResponseCheck from '../4.반응속도체크/ResponseCheck'
import RockScissorsPaper from '../5.가위바위보/RockScissorsPaper'
import LottoGenerator from '../6.로또/LottoGenerator'
import TicTacToe from '../7.틱택토Vuex/TicTacToe'
import MineSweeper from '../8. 지뢰찾기/MineSweeper'

export default {
    components: {
        NumberBaseBall,
        ResponseCheck,
        RockScissorsPaper,
        LottoGenerator,
        TicTacToe,
        MineSweeper,
    },
    mounted() {
        console.log(this.$router);
        console.log(this.$route);
    },
    computed: {
        currentGame() {
            return this.$route.params.name;
        }
    }
}
</script>