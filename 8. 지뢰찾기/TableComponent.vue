<template>
    <table>
        <tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex">
            <td 
                v-for="(colData, colIndex) in rowData" 
                :key="colIndex" 
                :style="cellDataStyle(rowIndex, colIndex)" 
                @click="onClickTd(rowIndex, colIndex)"
                @contextmenu.prevent="onRightClickTd(rowIndex, colIndex)"
                @mousedown="onMouseDown(rowIndex, colIndex)"
                @mouseup="onMouseUp(rowIndex, colIndex)"
            >
                {{cellDataText(rowIndex, colIndex)}}
            </td>
        </tr>
    </table>
</template>

<script>
import { mapState } from 'vuex';
import { CLICK_MINE, CODE,  CONFIRM_CELLS,  FLAG_CELL,  NORMALIZE_CELL,  OPEN_CELL, QUESTION_CELL } from './store';

let mouseStack = 0;

export default {
    data() {
        return {
        }
    },
    computed: {
        ...mapState(['tableData', 'halted']),
        cellDataStyle(state) {
            return (row, cell) => {
                switch (this.$store.state.tableData[row][cell]) {
                    case CODE.NORMAL:
                    case CODE.MINE: 
                        return {
                            background: '#444',
                        };
                    case CODE.CLICKED_MINE:
                    case CODE.OPENED:
                        return {
                            background: 'white'
                        };
                    case CODE.FLAG:
                        if (this.halted) {
                            return {
                                background: 'lightgreen'
                            }
                        }
                    case CODE.FLAG_MINE:
                        return {
                            background: 'red'
                        };
                    case CODE.QUESTION:
                    case CODE.QUESTION_MINE:
                        return {
                            background: 'yellow'
                        };
                    default:
                        return {};
                }
            } 
        },
        cellDataText() {
            return function(row, cell) {
                switch (this.$store.state.tableData[row][cell]) {
                    case CODE.NORMAL: return '';
                    case CODE.MINE: if (this.halted) return 'X';
                                    return '';
                    case CODE.FLAG: 
                    case CODE.FLAG_MINE: return '!';
                    case CODE.QUESTION:
                    case CODE.QUESTION_MINE: return '?';
                    case CODE.CLICKED_MINE: return '펑';
                    case CODE.OPENED:
                    default: return this.$store.state.tableData[row][cell] || '';
                }
            }
        },
    },
    methods: {
        onClickTd(row, col) {
            if (this.halted) {
                return;
            }
            switch (this.tableData[row][col]) {
                case CODE.NORMAL:
                    return this.$store.commit(OPEN_CELL, {row, col});
                case CODE.MINE:
                    return this.$store.commit(CLICK_MINE, {row, col});
                default:
                    return;
            }
        },
        onRightClickTd(row, col) {
            switch (this.tableData[row][col]) {
                case CODE.NORMAL:
                case CODE.MINE:
                    this.$store.commit(FLAG_CELL, {row, col});
                    return;
                case CODE.FLAG_MINE:
                case CODE.FLAG:
                    this.$store.commit(QUESTION_CELL, {row, col});
                    return;
                case CODE.QUESTION:
                case CODE.QUESTION_MINE:
                    this.$store.commit(NORMALIZE_CELL, {row, col});
                    return;
                default:
            }
        },
        onMouseDown(row, col) {
            mouseStack++;
            this.checkClick(row, col);
        },
        onMouseUp(row, col) {
            mouseStack--;
            this.checkClick(row, col);
        },
        checkClick(row, col) {
            if (mouseStack === 2) {
                return this.$store.commit(CONFIRM_CELLS, {row, col});
            }
        }
    },
}
</script>

<style>

</style>