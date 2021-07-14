<template>
<div>
    <h1>{{result}}</h1>
    <form v-on:submit="onSubmitForm">
        <input ref="answer" maxlength="4" v-model="value">
        <button type="submit"></button>
    </form>
    <div>시도:</div>
</div>
    
</template>

<script>
export default {
    data() {
        return {
            tries: [],
            value: '',
            result: '',
        }
    },
    methods: {
        onSubmitForm(e) {
            e.preventDefault();
            this.tries.push(e.target.value);
            this.$refs.answer.focus();
            this.value = '';
        }
    },
};
</script>

<style>
    
</style>