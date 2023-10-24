<template>
    <div class="my-2 border-2 rounded-md p-2 w-300 flex justify-between">
        <input type="text" class="border-0 focus:outline-0" v-model="inputNumber" :placeholder="numberPlaceHolder" maxlength="19" @input="setNumber">
        <input type="text" class="border-0 focus:outline-0 w-50" v-model="inpuExp" :placeholder="expPlaceHolder" maxlength="5" @input="setExp">
    </div>
</template>


<script setup>
    import { ref, reactive } from 'vue';
    
    const creditNmuber = ref('');
    const creditExp = ref('');

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

.w-50{
    width:55px;
}

.w-300{
    width:300px;
}

</style>
