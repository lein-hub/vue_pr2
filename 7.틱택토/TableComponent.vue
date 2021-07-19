<template>
    <table>
        <tr-component v-for="(rowData, i) in tableData" :key="i" :row-data="rowData" :row-index="i"></tr-component>
    </table>
</template>

<script>
import TrComponent from './TrComponent';

export default {
    components: {
        TrComponent,
    },
    props: {
        tableData: Array,
    },
    data() {
        return {

        }
    }
}
</script>

<style>

</style>