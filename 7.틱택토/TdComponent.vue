<template>
    <td @click="onClickTd">
        {{ cellData }}
    </td>
</template>

<script>
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
    methods: {
        onClickTd() {
            const rootData = this.$root.$data;
            this.$set(rootData.tableData[this.rowIndex], this.cellIndex, rootData.turn);
            rootData.turn = rootData.turn === 'O' ? 'X' : 'O';
        }
    },
}
</script>

<style>

</style>