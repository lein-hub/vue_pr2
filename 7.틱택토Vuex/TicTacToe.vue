<template>
<div>
    <p>{{turn}}님의 턴입니다.</p>
    <table>
        <tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex">
            <td @click="onClickTd(rowIndex, cellIndex, cellData)" v-for="(cellData, cellIndex) in rowData" :key="cellIndex">{{cellData}}</td>
        </tr>
    </table>
    <p v-if="winner">{{winner}}님의 승리!</p>
</div>
</template>

<script>
import { mapState } from 'vuex';
import store, { CHANGE_TURN, CLICK_CELL, NO_WINNER, RESET_GAME, SET_WINNER } from './store';
import TableComponent from './TableComponent';

export default {
    store,
    components: { TableComponent },
    data() {
        return {
            
        }
    },
    computed: {
        ...mapState({
            tableData: state => state.tableData,
            turn: state => state.turn,
            winner: state => state.winner,
            
        })
    },
    methods: {
        onClickTd(rowIndex, cellIndex, cellData) {
            if (cellData) {
                return
            }

            // const rootData = this.$root.$data;
            const tableData = this.tableData;
            const turn = this.turn;

            // this.$set(rootData.tableData[this.rowIndex], this.cellIndex, rootData.turn);
            this.$store.commit(CLICK_CELL, {row: rowIndex, cell: cellIndex});

            if (tableData[rowIndex][0] === turn && tableData[rowIndex][1] === turn && tableData[rowIndex][2] === turn
            || tableData[0][cellIndex] === turn && tableData[1][cellIndex] === turn && tableData[2][cellIndex] === turn
            || tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn
            || tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
                // rootData.winner = rootData.turn;
                this.$store.commit(SET_WINNER, turn);
                // rootData.turn = 'O';
                // rootData.tableData = [['', '', ''], ['', '', ''], ['', '', '']];
                this.$store.commit(RESET_GAME);
            } else {
                let all = true;
                tableData.forEach(row => {
                    row.forEach(cell => {
                        if (!cell) {
                            all = false;
                        }
                    })
                });

                if (all) {
                    // rootData.winner = '';
                    // rootData.turn = 'O';
                    // rootData.tableData = [['', '', ''], ['', '', ''], ['', '', '']];
                    this.$store.commit(NO_WINNER);
                    this.$store.commit(RESET_GAME);
                } else {
                    // rootData.turn = rootData.turn === 'O' ? 'X' : 'O';
                    this.$store.commit(CHANGE_TURN);
                }
                
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