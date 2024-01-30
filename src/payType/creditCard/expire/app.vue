<template>
    <input  
        type="text"
        id="c-credit-expire" 
        class="w-100 rounded p-2 text-center focus:outline-blue-400"
        v-model="inpuExp" 
        :placeholder="expPlaceHolder" 
        @input="setExp"
    >
</template>


<script setup>
    import { ref, reactive } from 'vue';

    const creditExp = ref('');

    //到期日
    const inpuExp = ref('');
    const oldExp = ref('');
    const expPlaceHolder = ref('MM/YY');
    const setExp = () => {
        inpuExp.value = inpuExp.value.replace(/[^0-9\/]/g, '');
        if (inpuExp.value.length == 2  && oldExp.value.length < inpuExp.value.length){
            inpuExp.value += '/';
        }else if (inpuExp.value.substr(-1) == '/') {
            inpuExp.value = inpuExp.value.substr(0,inpuExp.value.length-1);
        }
        oldExp.value = inpuExp.value;
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
