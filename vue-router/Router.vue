<template>
<div>
    <div>
        <router-link to="/game/index">게임 매처</router-link>
        <router-link to="/game/number-baseball">숫자야구</router-link>
        <router-link to="/game/response-check">반응속도</router-link>
        <router-link to="/game/rock-scissors-paper">가위바위보</router-link>
        <router-link to="/game/lotto-generator">로또생성기</router-link>
        <router-link to="/game/tic-tac-toe">틱택토</router-link>
        <router-link to="/game/mine-sweeper">지뢰찾기</router-link>
    </div>
    <router-view></router-view>
</div>
</template>

<script>
import router from './routes';
import store from '../8. 지뢰찾기/store'
import store2 from '../7.틱택토Vuex/store'

export default {
    router, store, store2,
    data() {
        return {
            
        }
    },
};
</script>

<style>
    table {
        border-collapse: collapse;
    }
    td {
        border: 1px solid black;
        width: 40px;
        height: 40px;
        text-align: center;
    }
</style>