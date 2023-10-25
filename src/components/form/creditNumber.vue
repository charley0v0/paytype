<template>
    <input 
        type="text" 
        id="c-credit-number" 
        class="border-0 w-full focus:outline-0" 
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
    const spacePosition = reactive([4,9,14]);
    const setNumber = () => {
        inputNumber.value = inputNumber.value.replace(/[^0-9\s]/g, '');
        if (spacePosition.indexOf(inputNumber.value.length) > -1  && oldNumber.value.length < inputNumber.value.length){
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

</style>
