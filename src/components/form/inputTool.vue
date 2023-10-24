<template>
    <input type="tel" class="border-2 rounded-md p-2" v-model="inputValue">
</template>


<script setup>
    import { ref } from 'vue';
    
    const inputValue = ref('');
</script>

<style scoped>

@tailwind base;
@tailwind components;
@tailwind utilities;

</style>
