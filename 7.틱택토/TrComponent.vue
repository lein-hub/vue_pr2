<template>
    <tr>
        <td-component v-for="(cellData, i) in rowData" :key="i" :cell-data="cellData" :cell-index="i" :row-index="rowIndex"></td-component>
        <!-- <p v-for="(cellData, i) in rowData" :key="i">{{cellData}}, {{i}}</p> -->
    </tr>
</template>

<script>
import TdComponent from './TdComponent';

export default {
    components: {
        TdComponent,
    },
    props: {
        rowData: Array,
        rowIndex: Number,
    },
    data() {
        return {
            parent: '내가 니 에비다',
        }
    },
}
</script>

<style>

</style>