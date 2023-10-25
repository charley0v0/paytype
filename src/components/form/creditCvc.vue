<template>
    <input type="tel" class="border-0 w-full focus:outline-0"  v-model="inputValue" maxlength="3" @input="setCvc">
</template>


<script setup>
    import { ref } from 'vue';

    const inputValue = ref('');
    const setCvc = () => {
        inputValue.value = inputValue.value.replace(/[^0-9\s]/g, '');
    }
</script>

<style scoped>

@tailwind base;
@tailwind components;
@tailwind utilities;

</style>
