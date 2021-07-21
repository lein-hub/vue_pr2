<template>
    <td @click="onClickTd">
        {{ cellData }}
    </td>
</template>

<script>
import { mapState } from 'vuex';
import { CHANGE_TURN, CLICK_CELL, NO_WINNER, RESET_GAME, SET_WINNER } from './store';

export default {
    props: {
        cellIndex: Number,
        rowIndex: Number,
    },
    data() {
        return {
        }
    },
    computed: {
        ...mapState({
            tableData: state => state.tableData,
            turn: state => state.turn,
            cellData(state) {
                return state.tableData[this.rowIndex][this.cellIndex];
            },
        }),
        // cellData() {
        //     return this.$store.state.tableData[this.rowIndex][this.cellIndex];
        // },
        // tableData() {
        //     return this.$store.state.tableData;
        // },
        // turn() {
        //     return this.$store.state.turn;
        // }
    },
    methods: {
        
    },
}
</script>

<style>

</style>