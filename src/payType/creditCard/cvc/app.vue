<template>
    <input  
        type="text"
        id="c-credit-cvc" 
        class="w-100 rounded p-2 text-center focus:outline-blue-400"
        v-model="inpuExp" 
        @input="setExp"
        maxlength="3"
    >
</template>


<script setup>
    import { ref, reactive } from 'vue';

    const creditExp = ref('');

    //到期日
    const inpuExp = ref('');
    const oldExp = ref('');
    const setExp = () => {
        inpuExp.value = inpuExp.value.replace(/[^0-9\/]/g, '');
    }


    
</script>

<style scoped>

@tailwind base;
@tailwind components;
@tailwind utilities;

.w-100{
    width:100px;
    border:1px solid #e5e7eb;
}

</style>
