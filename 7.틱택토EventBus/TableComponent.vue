<template>
    <table>
        <slot></slot>
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