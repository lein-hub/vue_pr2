<template>
<div>
    <mine-form></mine-form>
    <div>경과 시간: {{timer}} 초</div>
    <div>남은 지뢰 수: {{data.mine - markedCount}}</div>
    <table-component></table-component>
    <div>{{result}}</div>
</div>
</template>

<script>
import { mapState } from 'vuex';
import store, { INCREMENT_TIMER } from './store';
import TableComponent from './TableComponent.vue'
import MineForm from './MineForm.vue'

let interval;

export default {
    store,
    components: {
        TableComponent,
        MineForm,
    },
    computed: {
        ...mapState(['timer', 'result', 'halted', 'data', 'markedCount']),
    },
    methods: {
        
    },
    watch: {
        halted(value, oldValue) {
            if (value === false) {  // false일 때 게임시작
                interval = setInterval(() => {
                    this.$store.commit(INCREMENT_TIMER);
                }, 1000);
            } else {  // 게임중단
                clearInterval(interval);
            }
        }
    },
    mounted() {
    },
    beforeDestroy() {
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