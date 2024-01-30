<template>
    <input 
        type="text" 
        id="c-credit-number" 
        class="w-180 rounded p-2 text-center focus:outline-blue-400"
        v-model="inputNumber" 
        :placeholder="numberPlaceHolder" 
        maxlength="19" 
        @input="setNumber"
    >
</template>


<script setup>
    import { ref, reactive } from 'vue';
    
    const creditNumber = ref('');

    //信用卡號
    const inputNumber = ref('');
    const oldNumber = ref('');
    const numberPlaceHolder = ref('**** **** **** ****');
    const spacePosition = ref([4,9,14]);
    const setNumber = () => {
        inputNumber.value = inputNumber.value.replace(/[^0-9\s]/g, '');
        if (spacePosition.value.indexOf(inputNumber.value.length) > -1  && oldNumber.value.length < inputNumber.value.length){
            inputNumber.value += ' ';
        }else if (inputNumber.value.substr(-1) == ' ') {
            inputNumber.value = inputNumber.value.substr(0,inputNumber.value.length-1);
        }
        oldNumber.value = inputNumber.value;
    }

</script>

<style scoped>

@tailwind base;
@tailwind components;
@tailwind utilities;

    .w-180{
        width:180px;
        border:1px solid #e5e7eb;
    }
</style>
