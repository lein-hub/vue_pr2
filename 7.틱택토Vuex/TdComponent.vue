<template>
    <td @click="onClickTd">
        {{ cellData }}
    </td>
</template>

<script>
import { CHANGE_TURN, CLICK_CELL, NO_WINNER, RESET_GAME, SET_WINNER } from './store';

export default {
    props: {
        cellData: String,
        cellIndex: Number,
        rowIndex: Number,
    },
    data() {
        return {
        }
    },
    computed: {
        tableData() {
            return this.$store.state.tableData;
        },
        turn() {
            return this.$store.state.turn;
        }
    },
    methods: {
        onClickTd() {
            if (this.cellData) {
                return
            }

            const rootData = this.$root.$data;

            // this.$set(rootData.tableData[this.rowIndex], this.cellIndex, rootData.turn);
            this.$store.commit(CLICK_CELL, {row: this.rowIndex, cell: this.cellIndex});

            if (rootData.tableData[this.rowIndex][0] === rootData.turn && rootData.tableData[this.rowIndex][1] === rootData.turn && rootData.tableData[this.rowIndex][2] === rootData.turn
            || rootData.tableData[0][this.cellIndex] === rootData.turn && rootData.tableData[1][this.cellIndex] === rootData.turn && rootData.tableData[2][this.cellIndex] === rootData.turn
            || rootData.tableData[0][0] === rootData.turn && rootData.tableData[1][1] === rootData.turn && rootData.tableData[2][2] === rootData.turn
            || rootData.tableData[0][2] === rootData.turn && rootData.tableData[1][1] === rootData.turn && rootData.tableData[2][0] === rootData.turn) {
                // rootData.winner = rootData.turn;
                this.$store.commit(SET_WINNER, rootData.turn);
                // rootData.turn = 'O';
                // rootData.tableData = [['', '', ''], ['', '', ''], ['', '', '']];
                this.$store.commit(RESET_GAME);
            } else {
                let all = true;
                rootData.tableData.forEach(row => {
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
}
</script>

<style>

</style>