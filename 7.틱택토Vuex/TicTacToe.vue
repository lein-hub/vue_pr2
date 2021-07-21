<template>
<div>
    <p>{{turn}}님의 턴입니다.</p>
    <table-component :table-data="tableData"></table-component>
    <p v-if="winner">{{winner}}님의 승리!</p>
</div>
</template>

<script>
import store from './store';
import TableComponent from './TableComponent';

export default {
    store,
    components: { TableComponent },
    data() {
        return {
            tableData: [
                ['', '', ''], 
                ['', '', ''], 
                ['', '', ''],
            ],
            turn: 'O',
            winner: '',
        }
    },
    computed: {
        
    },
    methods: {
        
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